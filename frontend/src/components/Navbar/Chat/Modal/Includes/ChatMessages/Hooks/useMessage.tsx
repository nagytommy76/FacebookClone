import { useState } from 'react'

const useMessage = () => {
   const [chatMsg, setChatMsg] = useState<string>('')
   const [chatImagePath, setChatImagePath] = useState<FileList | null>(null)

   const handleChatMsg = (event: React.ChangeEvent<HTMLInputElement>) => setChatMsg(event.target.value)

   return { chatMsg, chatImagePath, setChatImagePath, handleChatMsg }
}

export default useMessage
