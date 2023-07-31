import React, { useState } from 'react'
import type { IReactionCount, LikeTypes } from '@/src/types/LikeTypes'

import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

import TabHeader from './TabHeader/TabHeader'
import TabBody from './TabBody/TabBody'
import TabContext from '@mui/lab/TabContext'

import { StyledModalPaper } from './Style'

const LikeModal: React.FC<{
   isModalOpen: boolean
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
   likeCount: IReactionCount | undefined
}> = ({ isModalOpen, setIsModalOpen, likeCount }) => {
   const handleCloseModal = () => setIsModalOpen(false)
   const [tabValue, setTabValue] = useState<LikeTypes>('isLove')

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
                  <IconButton onClick={handleCloseModal}>
                     <CloseIcon />
                  </IconButton>
                  <TabContext value={tabValue}>
                     <TabHeader
                        reactionTypes={likeCount.reactionTypes}
                        setTabValue={setTabValue}
                        tabValue={tabValue}
                     />
                     <TabBody tabValue={tabValue} reactionTypes={likeCount.reactionTypes} />
                  </TabContext>
               </StyledModalPaper>
            </Fade>
         ) : (
            <>töltés</>
         )}
      </Modal>
   )
}

export default LikeModal
