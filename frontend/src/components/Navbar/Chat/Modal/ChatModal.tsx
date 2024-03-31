import React from 'react'

import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'

const ChatModal = () => {
   return (
      <Modal
         open={true}
         onClose={() => {}}
         aria-labelledby='modal-modal-title'
         aria-describedby='modal-modal-description'
      >
         <Paper
            sx={{
               width: '70%',
               minHeight: '600px',
               position: 'absolute' as 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
               boxShadow: 24,
               p: 3,
            }}
         >
            <h1>Chat felület</h1>
         </Paper>
      </Modal>
   )
}

export default ChatModal
