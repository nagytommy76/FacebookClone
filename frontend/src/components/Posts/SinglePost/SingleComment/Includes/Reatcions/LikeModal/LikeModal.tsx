import React from 'react'

import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'

import { StyledModalPaper } from './Style'

const LikeModal: React.FC<{
   isModalOpen: boolean
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isModalOpen, setIsModalOpen }) => {
   const handleCloseModal = () => setIsModalOpen(false)

   return (
      <Modal
         aria-labelledby='like-modal-title'
         aria-describedby='like-modal-description'
         open={isModalOpen}
         onClose={handleCloseModal}
         closeAfterTransition
         slotProps={{
            backdrop: {
               timeout: 300,
            },
         }}
      >
         <Fade in={isModalOpen}>
            <StyledModalPaper>
               <h1>semmi</h1>
            </StyledModalPaper>
         </Fade>
      </Modal>
   )
}

export default LikeModal
