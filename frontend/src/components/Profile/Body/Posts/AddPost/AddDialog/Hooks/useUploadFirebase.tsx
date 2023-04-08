import { ref, uploadBytes } from 'firebase/storage'
import { firebaseStorage } from '../../../../../../../utils/firebase/firebase'
import { v4 } from 'uuid'

import { useAppSelector } from '../../../../../../../utils/redux/store'

const useUploadFirebase = (uploadImage: FileList) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const handleImageUploadToFirebase = async () => {
      try {
         const imageReference = ref(firebaseStorage, `${userId}/${uploadImage[0].name + v4()}`)
         const imageResult = await uploadBytes(imageReference, uploadImage[0])
         console.log(imageResult)
      } catch (error) {
         console.log(error)
      }
   }
   return handleImageUploadToFirebase
}

export default useUploadFirebase
