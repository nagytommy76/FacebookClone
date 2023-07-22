import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

import { StyledModalPaper, ModalHeader } from './Style'

const LikeModal: React.FC<{
   isModalOpen: boolean
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
   commentId?: string
   postId: string
}> = ({ isModalOpen, setIsModalOpen, commentId, postId }) => {
   const handleCloseModal = () => setIsModalOpen(false)

   const { data } = useQuery({
      queryKey: ['GetLikeTypes', postId],
      queryFn: async () => {
         return await axios.post(`/post/get-post-like-count`, { commentId, postId })
      },
   })

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
