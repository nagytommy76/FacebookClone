import type { IProfilePicture } from '@/src/types/PostTypes'

const useGetSelectedPic = (profileImagePath: IProfilePicture[]) => {
   const selectedProfileImg = profileImagePath.find((image) => image.isSelected)
   return selectedProfileImg?.path
}

export default useGetSelectedPic
