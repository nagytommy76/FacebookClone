import { useEffect, Dispatch, SetStateAction, useState } from 'react'

import { useAppDispatch } from '@/reduxStore/store'
import { setSingleMessageLabel, setChatId } from '@/reduxStore/slices/ChatSlice'

import { socket } from '@/src/utils/socketIo'
import type { IChat } from '../../Types'

interface IChatArgs {
   createdChatModel: IChat
   createdChatId: string
}

const useCreateChatSocket = () => {
   const dispatch = useAppDispatch()
   useEffect(() => {
      const createChatLabel = (args: IChatArgs) => {
         dispatch(setSingleMessageLabel(args.createdChatModel))
         dispatch(setChatId(args.createdChatId))
         console.log(args)
      }

      socket.on('chat:createChatResponse', createChatLabel)

      return () => {
         socket.off('chat:createChatResponse', createChatLabel)
      }
   }, [dispatch])

   return null
}

export default useCreateChatSocket
