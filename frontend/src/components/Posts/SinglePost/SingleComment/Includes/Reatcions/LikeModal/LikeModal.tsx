import React from 'react'

// import useGetComment from '../../Hooks/useGetComment'
// import useGetPostLike from '../../Hooks/useGetPostLike'

import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

import { StyledModalPaper, ModalHeader } from './Style'

const LikeModal: React.FC<{
   isModalOpen: boolean
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isModalOpen, setIsModalOpen }) => {
   const handleCloseModal = () => setIsModalOpen(false)

   // const { postLikeCount } = useGetPostLike(postId)
   // const { commentLikeCount } = useGetComment(commentId, postId)

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
               <ModalHeader>
                  <h1>Head</h1>
                  <IconButton onClick={handleCloseModal}>
                     <CloseIcon />
                  </IconButton>
               </ModalHeader>
               <p>
                  Ide szeretnék egy olyat mint a facebookon: head: csoportosítva likeok szerint, body, kik
                  adták a reakciót
               </p>
            </StyledModalPaper>
         </Fade>
      </Modal>
   )
}

export default LikeModal
