import dynamic from 'next/dynamic'
import { useAppSelector } from '@/reduxStore/store'
import type { MutableRefObject } from 'react'
import moment from 'moment'

import useFormatMsg from './Hooks/useFormatMsg'

import { StyledMessageBox } from '../Styles'
import Typography from '@mui/material/Typography'
import TypingIndicator from '../TypingIndicator/TypingIndicator'
const MessageItem = dynamic(() => import('../../MessageItem/MessageItem'))

const MessageItems = ({
   messageBoxRef,
   typingStatus,
}: {
   messageBoxRef: MutableRefObject<HTMLDivElement | null>
   typingStatus: boolean
}) => {
   const loggedInUserId = useAppSelector((state) => state.auth.userId)
   const allMessages = useFormatMsg()

   return (
      <StyledMessageBox ref={messageBoxRef}>
         <>
            {allMessages ? (
               <>
                  {Object.entries(allMessages).map(([key, messages]) => (
                     <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' align='center' mb={3}>
                           {moment(key).format('YYYY MMMM Do h:mm')}
                        </Typography>
                        {messages.map((message) => (
                           <MessageItem
                              key={message._id}
                              isRightContent={loggedInUserId != message.receiverUserId}
                              message={message}
                           />
                        ))}
                     </div>
                  ))}
               </>
            ) : (
               <>
                  <p>Nincs chat</p>
               </>
            )}
            <TypingIndicator typingStatus={typingStatus} />
         </>
      </StyledMessageBox>
   )
}

export default MessageItems
