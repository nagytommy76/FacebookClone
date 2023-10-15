import React from 'react'

import LeftSideSkeleton from './Includes/LeftSideSkeleton'
import BodySkeleton from './Includes/BodySkeleton'
import FooterSkeleton from './Includes/FooterSkeleton'

const SingleComment = () => {
   return (
      <>
         <div style={{ display: 'flex', width: '100%', marginTop: 15, marginBottom: 15 }}>
            <LeftSideSkeleton />
            <div style={{ width: '100%' }}>
               <BodySkeleton />
               <FooterSkeleton />
            </div>
         </div>
      </>
   )
}

export default SingleComment
