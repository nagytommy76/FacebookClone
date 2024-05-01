import dynamic from 'next/dynamic'
import useSendMsgMutation from './Hooks/useSendMsgMutation'
import { useAppSelector } from '@/reduxStore/store'
import { selectMessagesByChatId } from '@/reduxStore/slices/ChatSlice'

import { StyledMessageBoxContainer, StyledMessageBox } from './Styles'

import TypingIndicator from './TypingIndicator/TypingIndicator'
const AddTextBase = dynamic(() => import('@/Base/AddTextBase/AddTextBase'))
const MessageItem = dynamic(() => import('../MessageItem/MessageItem'))

const MessgageBox: React.FC<{
   ProfileSection: React.ReactNode
}> = ({ ProfileSection }) => {
   const {
      chatRef,
      messageBoxRef,
      typingStatus,
      chatMsg,
      chatImagePath,
      handleChangeTextWithEmoji,
      handleChatMsg,
      setChatImagePath,
      handleAddChatMutate,
   } = useSendMsgMutation()
   const loggedInUserId = useAppSelector((state) => state.auth.userId)
   const allMessages = useAppSelector(selectMessagesByChatId)

   return (
      <StyledMessageBoxContainer>
         {ProfileSection}
         <StyledMessageBox ref={messageBoxRef}>
            <>
               {allMessages ? (
                  allMessages.map((message) => (
                     <MessageItem
                        key={message._id}
                        isRightContent={loggedInUserId != message.receiverUserId}
                        message={message}
                     />
                  ))
               ) : (
                  <>
                     <p>Nincs chat</p>
                  </>
               )}
               <TypingIndicator typingStatus={typingStatus} />
            </>
         </StyledMessageBox>
         <AddTextBase
            reference={chatRef}
            multiline={false}
            value={chatMsg}
            isSendBtnDisabled={chatMsg.length < 1}
            placeholderText='Üzenet írása...'
            setImagePath={setChatImagePath}
            onClickFunction={handleAddChatMutate}
            handleChangeValue={handleChatMsg}
            handleChangeValueWithEmoji={handleChangeTextWithEmoji}
         />
      </StyledMessageBoxContainer>
   )
}

export default MessgageBox
