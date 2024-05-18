import dynamic from 'next/dynamic'
import { useAppSelector } from '@/reduxStore/store'
import { selectMessagesByChatId } from '@/reduxStore/slices/ChatSlice'

import useSendMsgMutation from './Hooks/useSendMsgMutation'
import useMessage from './Hooks/useMessage'
import useUploadChatImg from './Hooks/useUploadChatImg'
import useSetScroll from './Hooks/useSetScroll'

import { StyledMessageBoxContainer, StyledMessageBox } from './Styles'

import TypingIndicator from './TypingIndicator/TypingIndicator'
const AddTextBase = dynamic(() => import('@/Base/AddTextBase/AddTextBase'))
const MessageItem = dynamic(() => import('../MessageItem/MessageItem'))

const MessgageBox: React.FC<{
   ProfileSection: React.ReactNode
}> = ({ ProfileSection }) => {
   const loggedInUserId = useAppSelector((state) => state.auth.userId)
   const allMessages = useAppSelector(selectMessagesByChatId)
   const {
      chatRef,
      messageBoxRef,
      chatMsg,
      typingStatus,
      handleChatMsg,
      handleChangeTextWithEmoji,
      restoreTextField,
      onEnterKeyDown,
   } = useMessage()
   const handleAddChatMutate = useSendMsgMutation(chatMsg, restoreTextField)
   const handleUploadChatMsgImg = useUploadChatImg(handleAddChatMutate)
   useSetScroll(messageBoxRef)

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
            setImagePath={handleUploadChatMsgImg}
            onClickFunction={() => handleAddChatMutate()}
            onKeyEnterFunction={(event) => onEnterKeyDown(event, handleAddChatMutate)}
            handleChangeValue={handleChatMsg}
            handleChangeValueWithEmoji={handleChangeTextWithEmoji}
         />
      </StyledMessageBoxContainer>
   )
}

export default MessgageBox
