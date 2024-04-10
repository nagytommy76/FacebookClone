import dynamic from 'next/dynamic'
import useSendMsgMutation from '../Hooks/useSendMsgMutation'
import { useAppSelector } from '@/src/utils/redux/store'

import { StyledMessageBoxContainer, ProfileSection, StyledMessageBox } from './Styles'
import Typography from '@mui/material/Typography'

const AddTextBase = dynamic(() => import('@/Base/AddTextBase/AddTextBase'))
const ChatAvatar = dynamic(() => import('@/Base/ChatAvatar/ChatAvatar'))
const MessageItem = dynamic(() => import('./MessageItem/MessageItem'))

const TestMessageData = [
   {
      _id: '1',
      createdAt: '2024-04-07T09:31:36.758Z',
      updatedAt: '2024-04-07T09:32:36.758Z',
      isRead: true,
      userId: '64777ef1c3038faf5e1a41c6',
      message:
         'Donec sagittis tempor orci, eget efficitur ipsum viverra at. Quisque eget odio ipsum. Aliquam non leo id est vehicula hendrerit. Mauris et ligula congue, mattis diam ut, vestibulum mi.',
      image: 'https://firebasestorage.googleapis.com/v0/b/facebookimagestorage.appspot.com/o/64777ef1c3038faf5e1a41c6%2FprofilePicture%2F01dfaecd-b1af-4062-b4e7-1b4c3cfd9c5f_wallpaper-554967.jpg?alt=media&token=76645ba1-4b35-4ccc-8cea-92c98f3185d2',
   },
   {
      _id: '2',
      createdAt: '2024-04-07T09:35:36.758Z',
      updatedAt: '2024-04-07T09:35:10.758Z',
      isRead: true,
      userId: '64777ef1c3038faf5e1a41c6',
      message:
         'Ut ut eros dui. Suspendisse id felis sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat augue eu est ullamcorper aliquam. Mauris ante nisl, elementum in nisl eu, ultrices pulvinar orci. Mauris eget turpis at quam scelerisque scelerisque quis at ipsum. Proin dictum pellentesque enim, eget lacinia est condimentum in',
      image: 'https://firebasestorage.googleapis.com/v0/b/facebookimagestorage.appspot.com/o/658569424d27aad220f6e887%2FprofilePicture%2F966f1605-7f36-49d5-ab2e-39b487d192c5_1954%20Chevrolet%20Bel%20Air%20side.JPG?alt=media&token=007d0df3-2942-49f2-8474-684073f787c5',
   },
   {
      _id: '3',
      createdAt: '2024-04-07T09:37:36.758Z',
      updatedAt: '2024-04-07T09:35:10.758Z',
      isRead: true,
      userId: '644f734537ed89ada3b443c3',
      message:
         'Ut ut eros dui. Suspendisse id feiscing elit. Cras feugiat augue eu est ullamcorper aliquam. Mauris ante nisl, elementum in nisl eu, ultrices pulvinar orci. Mauris eget turpis at quam scelerisque scelerisque quis at ipsum. Proin dictum pellentesque enim, eget lacinia est condimentum in',
      image: 'https://firebasestorage.googleapis.com/v0/b/facebookimagestorage.appspot.com/o/658569424d27aad220f6e887%2FprofilePicture%2F966f1605-7f36-49d5-ab2e-39b487d192c5_1954%20Chevrolet%20Bel%20Air%20side.JPG?alt=media&token=007d0df3-2942-49f2-8474-684073f787c5',
   },
]

const MessgageBox: React.FC<{
   userData: { _id: string; fullName: string; selectedProfilePicturePath: string }
}> = ({ userData }) => {
   const {
      chatRef,
      chatMsg,
      chatImagePath,
      handleChangeTextWithEmoji,
      handleChatMsg,
      setChatImagePath,
      handleAddChatMutate,
   } = useSendMsgMutation()
   const loggedInUserId = useAppSelector((state) => state.auth.userId)

   return (
      <StyledMessageBoxContainer>
         <ProfileSection>
            <ChatAvatar
               width={60}
               height={60}
               fullName={userData.fullName}
               selectedProfilePicturePath={userData.selectedProfilePicturePath}
            />
            <Typography variant='body1'>{userData.fullName}</Typography>
         </ProfileSection>
         <StyledMessageBox>
            {TestMessageData.map((message) => (
               <MessageItem
                  key={message._id}
                  isRightContent={loggedInUserId == message.userId}
                  message={message}
               />
            ))}
         </StyledMessageBox>
         <AddTextBase
            reference={chatRef}
            multiline={false}
            value={chatMsg}
            placeholderText='...'
            setImagePath={setChatImagePath}
            onClickFunction={handleAddChatMutate}
            handleChangeValue={handleChatMsg}
            handleChangeValueWithEmoji={handleChangeTextWithEmoji}
         />
      </StyledMessageBoxContainer>
   )
}

export default MessgageBox
