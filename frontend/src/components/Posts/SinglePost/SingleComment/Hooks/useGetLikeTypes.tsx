import { useEffect, useState } from 'react'
import type { IPostLike, IOrderedLikesCount } from '../../Like/Types'

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

const useGetLikeTypes = (commentLikes: IPostLike[]) => {
   const [orderedCountedLike, setOrderedCountedLike] = useState<IOrderedLikesCount | null>(null)
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
      if (commentLikes.length > 0) {
         commentLikes.map((like) => {
            Object.entries(like.reactionType).map((item) => {
               if (item[1]) collectObject[item[0]]++
            })
         })
         const requiredObj = pickHighest(collectObject)
         setOrderedCountedLike(requiredObj)
      }
   }, [commentLikes])

   return orderedCountedLike
}

export default useGetLikeTypes
