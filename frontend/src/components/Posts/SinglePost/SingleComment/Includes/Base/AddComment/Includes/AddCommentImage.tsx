import { ChangeEvent } from 'react'
import ImageSelector from '@/Base/ImagePreview/ImageSelector/ImageSelector'

const AddCommentImage = () => {
   const addPicture = (event: ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.files)
   }

   return <ImageSelector addPictures={addPicture} maxFileCount={1} multiple={false} size='small' />
}

export default AddCommentImage
