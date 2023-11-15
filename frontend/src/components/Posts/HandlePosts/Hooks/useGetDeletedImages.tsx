const useGetDeletedImages = () => {
   // A meglévő képekből kell "kivonnom a törölt képeket. HA null ->return"
   const returnDeletedImages = (
      postedPicturesPath: string[] | null,
      uploadedImages: string[] | null
   ): string[] | null => {
      // Ezzel megvannak a kitörölt elemek amiket a firebase-en törölnöm kell az onSucecss-ben
      // Ha NULL akkkor simán nem hívom meg ezt a hookot
      if (postedPicturesPath === null || uploadedImages === null) return null
      let deletedImages: string[] = []
      for (const postedImage of postedPicturesPath as string[]) {
         if (!uploadedImages.includes(postedImage)) {
            deletedImages.push(postedImage)
         }
      }
      return deletedImages
   }
   return returnDeletedImages
}

export default useGetDeletedImages
