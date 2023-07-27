import React, { useState } from 'react'
import type { IReactionCount, LikeTypes } from '@/src/types/LikeTypes'
import useIcon from './Hooks/useIcon'

import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { StyledModalPaper, ModalHeader } from './Style'

const LikeModal: React.FC<{
   isModalOpen: boolean
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
   likeCount: IReactionCount | undefined
}> = ({ isModalOpen, setIsModalOpen, likeCount }) => {
   const [tabValue, setTabValue] = React.useState(0)
   const handleCloseModal = () => setIsModalOpen(false)
   const returnImage = useIcon()

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
   }

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
                     <Tabs value={tabValue} onChange={handleChange} aria-label='icon tabs example'>
                        {Object.entries(likeCount.reactionTypes).map((key, index) => (
                           <Tab key={index} icon={returnImage(key[0] as LikeTypes)} aria-label='phone' />
                        ))}
                     </Tabs>
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
