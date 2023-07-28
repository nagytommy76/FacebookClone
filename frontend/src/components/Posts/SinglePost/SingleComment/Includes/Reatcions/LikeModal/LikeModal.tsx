import React from 'react'
import type { IReactionCount } from '@/src/types/LikeTypes'

import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

import TabHeader from './TabHeader/TabHeader'

import { StyledModalPaper, ModalHeader } from './Style'

const LikeModal: React.FC<{
   isModalOpen: boolean
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
   likeCount: IReactionCount | undefined
}> = ({ isModalOpen, setIsModalOpen, likeCount }) => {
   const [tabValue, setTabValue] = React.useState(0)
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
         {likeCount ? (
            <Fade in={isModalOpen}>
               <StyledModalPaper>
                  <ModalHeader>
                     <TabHeader
                        reactionTypes={likeCount.reactionTypes}
                        setTabValue={setTabValue}
                        tabValue={tabValue}
                     />
                     <IconButton onClick={handleCloseModal}>
                        <CloseIcon />
                     </IconButton>
                  </ModalHeader>
                  <p>{likeCount.reactionTypes[0]}</p>
               </StyledModalPaper>
            </Fade>
         ) : (
            <>töltés</>
         )}
      </Modal>
   )
}

export default LikeModal
