import { useEffect, useState } from 'react'

import { useAppDispatch } from '@/reduxStore/store'
import { setSingleMessageLabel, setChatId, setSelectedChatWithUserId } from '@/reduxStore/slices/ChatSlice'

import { socket } from '@/src/utils/socketIo'
import type { IChat } from '../../Types'

interface IChatArgs {
   createdChatModel: IChat
   createdChatId: string
   toUserId: string
}

const useCreateChatSocket = () => {
   const dispatch = useAppDispatch()
   const [chatAudio] = useState(new Audio('/sounds/facebook_messenger.mp3'))

   const swapChatWithParticipant = (createdChatModel: IChat, toUserId: string) => {
      const modifiedChatWithParticipant = createdChatModel.populatedParticipants.find(
         (participant) => participant._id !== toUserId
      )
      if (modifiedChatWithParticipant) createdChatModel.chatWithParticipant = modifiedChatWithParticipant
   }
   useEffect(() => {
      const createChatLabel = (args: IChatArgs) => {
         swapChatWithParticipant(args.createdChatModel, args.toUserId)
         dispatch(setSelectedChatWithUserId(args.createdChatModel.chatWithParticipant._id))
         dispatch(setSingleMessageLabel(args.createdChatModel))
         dispatch(setChatId(args.createdChatId))
         chatAudio.play()
      }

      socket.on('chat:createChatResponse', createChatLabel)

      return () => {
         socket.off('chat:createChatResponse', createChatLabel)
      }
   }, [dispatch, chatAudio])

   return null
}

export default useCreateChatSocket
