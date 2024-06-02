import type { LikeTypes } from '@/types/LikeTypes'
import useLikeBtnColor from '@/hooks/Like/useLikeBtnColor'

const useSetBtnColor = () => {
   const { buttonColor, likeButtonColor, setLikeButtonColor } = useLikeBtnColor()

   const setButtonColor = (likeTypes: LikeTypes | undefined) => {
      switch (likeTypes) {
         case 'isLike':
            setLikeButtonColor(buttonColor.isLike)
            break
         case 'isLove':
            setLikeButtonColor(buttonColor.isLove)
            break
         case 'isCare':
            setLikeButtonColor(buttonColor.isCare)
            break
         case 'isHaha':
            setLikeButtonColor(buttonColor.isHaha)
            break
         case 'isWow':
            setLikeButtonColor(buttonColor.isWow)
            break
         case 'isSad':
            setLikeButtonColor(buttonColor.isSad)
            break
         case 'isAngry':
            setLikeButtonColor(buttonColor.isAngry)
            break
         default:
            setLikeButtonColor('')
            break
      }
   }
   return { setButtonColor, likeButtonColor }
}

export default useSetBtnColor
