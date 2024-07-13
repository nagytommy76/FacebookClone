import { useAppSelector } from '@/reduxStore/store'
import { socket } from '@/src/utils/socketIo'

import type { IMessages } from '@/src/components/Navbar/Chat/Types'

const useMsgSocket = () => {
   const { currentImage, userName } = useAppSelector((state) => state.auth)
   return (addedMessages: IMessages, foundChatId: string) =>
      socket.emit('chat:sendMsg', {
         addedMessage: addedMessages,
         foundChatId: foundChatId,
         profileImage: currentImage.path,
         fullName: userName,
      })
}

export default useMsgSocket
