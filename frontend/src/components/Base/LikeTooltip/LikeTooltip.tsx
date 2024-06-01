import CustomTooltipTitle from './CustomTooltipTitle'
import Reactions from './Reactions'
import { LikeTypes } from '@/types/LikeTypes'
import { useAppSelector } from '@/reduxStore/store'

import ClickAwayListener from '@mui/material/ClickAwayListener'

const LikeTooltip: React.FC<{
   setLikeFunction: (likeType: LikeTypes) => void
   LikeCommentButtonComponent: React.ReactElement
   handleClose?: () => void
   open?: boolean
}> = ({ setLikeFunction, LikeCommentButtonComponent, open = false, handleClose = () => {} }) => {
   const isMobile = useAppSelector((state) => state.theme.isMobileView)

   return isMobile ? (
      <ClickAwayListener onClickAway={handleClose}>
         <div>
            <CustomTooltipTitle
               open={open}
               onClose={handleClose}
               disableFocusListener
               disableHoverListener
               disableTouchListener
               placement='top'
               title={<Reactions setLike={setLikeFunction} />}
            >
               {LikeCommentButtonComponent}
            </CustomTooltipTitle>
         </div>
      </ClickAwayListener>
   ) : (
      <CustomTooltipTitle placement='top' title={<Reactions setLike={setLikeFunction} />}>
         {LikeCommentButtonComponent}
      </CustomTooltipTitle>
   )
}

export default LikeTooltip
