import React from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

const BaseButton: React.FC<{
   buttonText: string
   isLoading: boolean
   iconType?: 'addIcon' | 'removeIcon'
   color?: 'error' | 'warning' | 'info'
   onClickEvent: () => void
}> = ({ onClickEvent, buttonText = 'Jelölés', isLoading, iconType = 'addIcon', color = 'info' }) => {
   return (
      <div style={{ width: '100%' }}>
         <LoadingButton
            onClick={onClickEvent}
            endIcon={iconType === 'addIcon' ? <PersonAddAlt1Icon /> : <PersonRemoveIcon />}
            loading={isLoading}
            loadingPosition='end'
            variant='outlined'
            color={color}
            fullWidth
         >
            <span>{buttonText}</span>
         </LoadingButton>
      </div>
   )
}

export default BaseButton
