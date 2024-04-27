import dynamic from 'next/dynamic'
import useSendMsgMutation from './Hooks/useSendMsgMutation'
import { useAppSelector } from '@/reduxStore/store'
import { selectMessagesByChatId } from '@/reduxStore/slices/ChatSlice'

import { StyledMessageBoxContainer, ProfileSection, StyledMessageBox } from './Styles'
import Typography from '@mui/material/Typography'

const AddTextBase = dynamic(() => import('@/Base/AddTextBase/AddTextBase'))
const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))
const MessageItem = dynamic(() => import('../MessageItem/MessageItem'))

const MessgageBox: React.FC<{
   fullName: string
   selectedProfilePicturePath: string
}> = ({ fullName, selectedProfilePicturePath }) => {
   const {
      chatRef,
      messageBoxRef,
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
         <ProfileSection>
            <ChatAvatar
               width={60}
               height={60}
               fullName={fullName}
               selectedProfilePicturePath={selectedProfilePicturePath}
            />
            <Typography variant='body1'>{fullName}</Typography>
         </ProfileSection>
         <StyledMessageBox ref={messageBoxRef}>
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
