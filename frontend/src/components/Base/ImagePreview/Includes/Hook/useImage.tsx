import { useState, useEffect } from 'react'

interface IUrl {
   url: string
   name: string
}

const useImage = (selectedFilePreview: File[] | string[]) => {
   const [displayImages, setDisplayImages] = useState<IUrl[] | null>(null)
   const [imageUrls, setImageUrls] = useState<string[] | null>(null)

   useEffect(() => {
      // Innen tudom, hogy egy File-ról van szó és nem egy string-ről
      if (typeof selectedFilePreview[0] === 'object') {
         const filePreview: File[] = selectedFilePreview as File[]
         let objectUrl: IUrl[] = []
         for (let index = 0; index < filePreview.length; index++) {
            objectUrl.push({
               name: filePreview[index].name,
               url: URL.createObjectURL(filePreview[index] as File),
            })
         }
         setDisplayImages(objectUrl)
      } else setImageUrls(selectedFilePreview as string[])
   }, [selectedFilePreview])
   return {
      displayImages,
      imageUrls,
   }
}

export default useImage
