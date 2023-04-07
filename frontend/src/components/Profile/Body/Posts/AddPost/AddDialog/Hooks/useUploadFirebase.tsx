import React from 'react'
import { ref, uploadBytes } from 'firebase/storage'
import { firebaseStorage } from '../../../../../../../utils/firebase/firebase'
import { v4 } from 'uuid'

import { useAppSelector } from '../../../../../../../utils/redux/store'

const useUploadFirebase = (uploadImage: FileList) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const imageReference = ref(firebaseStorage, `${userId}/${uploadImage[0].name + v4()}`)
   return null
}

export default useUploadFirebase
