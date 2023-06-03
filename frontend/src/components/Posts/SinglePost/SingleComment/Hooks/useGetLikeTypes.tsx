import { useEffect, useState } from 'react'
import type { IPostLike, LikeTypes, IOrderedLikesCount } from '../../Like/Types'

const pickHighest = (obj: IOrderedLikesCount, num = 7): IOrderedLikesCount => {
   const requiredObj: any = {}
   Object.entries(obj)
      .sort((prevMax, nextMax) => nextMax[1] - prevMax[1])
      .forEach((key, index) => {
         if (index < num) {
            requiredObj[key[0]] = obj[key[0]]
         }
      })
   return requiredObj
}

const useGetLikeTypes = (
   commentLikes: IPostLike[],
   setButtonColor: (currentLikeType: LikeTypes | undefined) => void
) => {
   if (commentLikes.length === 0) return null
   const [orderedCountedLike, setOrderedCountedLike] = useState<IOrderedLikesCount | null>({
      isAngry: 0,
      isCare: 0,
      isHaha: 0,
      isLike: 0,
      isLove: 0,
      isSad: 0,
      isWow: 0,
   })
   useEffect(() => {
      let collectObject: IOrderedLikesCount = {
         isAngry: 0,
         isCare: 0,
         isHaha: 0,
         isLike: 0,
         isLove: 0,
         isSad: 0,
         isWow: 0,
      }
      commentLikes.map((like) => {
         Object.entries(like.reactionType).map((item) => {
            if (item[1]) collectObject[item[0]]++
         })
      })

      const requiredObj = pickHighest(collectObject)
      setOrderedCountedLike(requiredObj)
      setButtonColor(Object.keys(requiredObj)[0] as any)
   }, [commentLikes])

   return orderedCountedLike
}

export default useGetLikeTypes
