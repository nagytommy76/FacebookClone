import { useEffect, useState } from 'react'
import type { IPostLike, LikeTypes } from '../../Like/Types'

interface IOreredLikes {
   [index: string]: number
   isAngry: number
   isCare: number
   isHaha: number
   isLike: number
   isLove: number
   isSad: number
   isWow: number
}

const pickHighest = (obj: IOreredLikes, num = 7): IOreredLikes => {
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
   comments: IPostLike[],
   setButtonColor: (currentLikeType: LikeTypes | undefined) => void
) => {
   if (comments.length === 0) return null
   const [orderedCountedLike, setOrderedCountedLike] = useState<IOreredLikes>({
      isAngry: 0,
      isCare: 0,
      isHaha: 0,
      isLike: 0,
      isLove: 0,
      isSad: 0,
      isWow: 0,
   })
   // const [mostLike, setMostLike] = useState<LikeTypes>('isLike')

   useEffect(() => {
      let collectObject: IOreredLikes = {
         isAngry: 0,
         isCare: 0,
         isHaha: 0,
         isLike: 0,
         isLove: 0,
         isSad: 0,
         isWow: 0,
      }
      comments.map((like) => {
         Object.entries(like.reactionType).map((item) => {
            if (item[1]) collectObject[item[0]]++
         })
      })

      const requiredObj = pickHighest(collectObject)
      setOrderedCountedLike(requiredObj)
      // setMostLike(theMostLikeType)
      setButtonColor(Object.keys(requiredObj)[0] as any)
      // console.log(requiredObj)
   }, [comments])

   return orderedCountedLike
}

export default useGetLikeTypes
