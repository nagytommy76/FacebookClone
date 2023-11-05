import { useState } from 'react'
import ImageContextProvider from '../Context/ImageContextProvider'
import dynamic from 'next/dynamic'
import { useAppSelector } from '../../../../utils/redux/store'

import StockImage from '@/assets/facebook-profile.jpg'
import { AddPostStyle, CustomAddPostButton, CustomNextImage } from './AddPostStyle'
import type { IPost } from '@/types/PostTypes'

const AddPostDialog = dynamic(() => import('./AddDialog/AddDialog'))

const AddPost: React.FC<{
   addNewPost: (newPost: IPost) => void
}> = ({ addNewPost }) => {
   const profilePicture = useAppSelector((state) => state.auth.currentImage)
   const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false)

   return (
      <>
         <AddPostStyle>
            {profilePicture ? (
               <CustomNextImage src={profilePicture.path} width={35} height={35} alt='Sajat kép' />
            ) : (
               <CustomNextImage src={StockImage} width={35} height={35} alt='Sajat kép' />
            )}
            <CustomAddPostButton
               onClick={() => setAddDialogOpen(true)}
               disableRipple
               variant='text'
               color='primary'
            >
               Mi jár a fejedben?
            </CustomAddPostButton>
         </AddPostStyle>
         <ImageContextProvider>
            <AddPostDialog
               addNewPost={addNewPost}
               setAddDialogOpen={setAddDialogOpen}
               openAddDialog={addDialogOpen}
            />
         </ImageContextProvider>
      </>
   )
}

export default AddPost
