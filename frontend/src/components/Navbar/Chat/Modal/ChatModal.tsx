import React from 'react'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

const ChatModal = () => {
   return (
      <Modal
         open={true}
         onClose={() => {}}
         aria-labelledby='modal-modal-title'
         aria-describedby='modal-modal-description'
      >
         <Paper sx={{ width: '50%', height: '500px' }}>
            <h1>dsfsdjfsdkjfdksl klsd fksd fhfsd h</h1>
         </Paper>
      </Modal>
   )
}

export default ChatModal
