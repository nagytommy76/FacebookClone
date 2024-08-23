import dynamic from 'next/dynamic'

import useSendMsgMutation from './Hooks/useSendMsgMutation'
import useMessage from './Hooks/useMessage'
import useUploadChatImg from './Hooks/useUploadChatImg'
import useSetScroll from './Hooks/useSetScroll'

import { StyledMessageBoxContainer } from './Styles'

const MessageItems = dynamic(() => import('./MessageItems/MessageItems'))
const AddTextBase = dynamic(() => import('@/Base/AddTextBase/AddTextBase'))

const MessgageBox: React.FC<{
   ProfileSection: React.ReactNode
}> = ({ ProfileSection }) => {
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
         <MessageItems messageBoxRef={messageBoxRef} typingStatus={typingStatus} />
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
