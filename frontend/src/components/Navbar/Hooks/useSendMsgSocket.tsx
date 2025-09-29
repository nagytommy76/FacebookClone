import { useEffect, Dispatch, SetStateAction, useState } from 'react'
import { socket } from '@/src/utils/socketIo'
import useSetInfoSnack from '@/Base/InfoSnackbar/useSetInfoSnack'

import { useAppDispatch, useAppSelector } from '@/reduxStore/store'
import { setChatMessage, incrementTotalUnreadMsgCount } from '@/reduxStore/slices/ChatSlice'

import useNotification from './useNotification'
import type { IMessages } from '@/Chat/Types'

interface IChatArgs {
   addedMessage: IMessages
   foundChatId: string
   profileImage: string
   fullName: string
   socketId?: string
}

const useSendMsgSocket = (setTypingStatus?: Dispatch<SetStateAction<boolean>>) => {
   const dispatch = useAppDispatch()
   const [chatAudio, setChatAudio] = useState<HTMLAudioElement | null>(null)
   const isChatModalOpen = useAppSelector((state) => state.chat.isChatModalOpen)
   const setInfoSnackbar = useSetInfoSnack()
   const notification = useNotification()

   useEffect(() => {
      const audio = new Audio('/sounds/facebook_messenger.mp3')
      setChatAudio(audio)
   }, [])

   useEffect(() => {
      const sendChatMsg = (args: IChatArgs) => {
         notification(args.addedMessage.message, args.profileImage, args.fullName)
         if (setTypingStatus) setTypingStatus(false)
         dispatch(setChatMessage({ addedMessage: args.addedMessage, foundChatId: args.foundChatId }))
         dispatch(incrementTotalUnreadMsgCount({ count: 1, currentChatId: args.foundChatId }))
         if (isChatModalOpen === false) {
            setInfoSnackbar(
               args.addedMessage.message,
               `${args.fullName} Üzenetet küldött neked!`,
               args.profileImage
            )
         }
         if (chatAudio) chatAudio.play()
      }

      socket.on('chat:sendMsgResponse', sendChatMsg)

      return () => {
         socket.off('chat:sendMsgResponse', sendChatMsg)
      }
   }, [dispatch, setTypingStatus, chatAudio, isChatModalOpen, notification, setInfoSnackbar])

   return null
}

export default useSendMsgSocket
