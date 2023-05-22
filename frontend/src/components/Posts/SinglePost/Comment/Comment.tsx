import React from 'react'

import Collapse from '@mui/material/Collapse'

const Comment: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
   return (
      <>
         <Collapse orientation='vertical' in={isCollapsed}>
            <h1>Komment hozzáadása for jön ide</h1>
         </Collapse>
      </>
   )
}

export default Comment
