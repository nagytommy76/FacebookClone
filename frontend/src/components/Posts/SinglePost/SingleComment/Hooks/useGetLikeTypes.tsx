import { useEffect, useState } from 'react'
import type { IPostLike, LikeTypes } from '../../Like/Types'

const testObject: IPostLike[] = [
   {
      userId: '644f734537ed89ada3b443c3',
      _id: '647464924bdcd72871f28cb6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: true,
         isSad: false,
         isWow: false,
      },
   },
   {
      userId: '644f734537ed89ada3b443c3',
      _id: '647464924bdcd72871f28cb6',
      reactionType: {
         isAngry: true,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      userId: '644f734537ed89ada3b443c3',
      _id: '647464924bdcd72871f28cb6',
      reactionType: {
         isAngry: true,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      userId: '644f734537ed89ada3b443c3',
      _id: '647464924bdcd72871f28cb6',
      reactionType: {
         isAngry: true,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      userId: '644f734537ed89ada3b443c3',
      _id: '647464924bdcd72871f28cb6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: false,
         isLike: true,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      userId: '644f734537ed89ada3b443c3',
      _id: '647464924bdcd72871f28cb6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: true,
         isLike: false,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
   {
      userId: '644f734537ed89ada3b443c3',
      _id: '647464924bdcd72871f28cb6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: true,
         isSad: false,
         isWow: false,
      },
   },
   {
      userId: '644f734537ed89ada3b443c3',
      _id: '647464924bdcd72871f28cb6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: false,
         isLike: false,
         isLove: true,
         isSad: false,
         isWow: false,
      },
   },
   {
      userId: '644f734537ed89ada3b443c3',
      _id: '647464924bdcd72871f28cb6',
      reactionType: {
         isAngry: false,
         isCare: false,
         isHaha: false,
         isLike: true,
         isLove: false,
         isSad: false,
         isWow: false,
      },
   },
]

const pickHighest = (obj: any, num = 1) => {
   const requiredObj: any = {}
   if (num > Object.keys(obj).length) {
      return false
   }
   Object.keys(obj)
      .sort((a, b) => obj[b] - obj[a])
      .forEach((key, ind) => {
         if (ind < num) {
            requiredObj[key] = obj[key]
         }
      })
   return requiredObj
}

const useGetLikeTypes = (setButtonColor: (currentLikeType: LikeTypes | undefined) => void) => {
   const [mostCountedLike, setMostCountedLike] = useState<{
      [index: string]: number
      isAngry: number
      isCare: number
      isHaha: number
      isLike: number
      isLove: number
      isSad: number
      isWow: number
   }>({ isAngry: 0, isCare: 0, isHaha: 0, isLike: 0, isLove: 0, isSad: 0, isWow: 0 })

   useEffect(() => {
      let theMost: LikeTypes = 'isLike'
      testObject.map((like) => {
         // console.log(like.reactionType)
         //  Object.entries(like.reactionType).map((item) => {
         //     if (item[1]) mostCounted[item[0]]++
         //  })

         Object.entries(like.reactionType).map((item) => {
            if (item[1])
               setMostCountedLike((prevState) => {
                  return {
                     ...prevState,
                     [item[0]]: mostCountedLike[item[0]]++,
                  }
               })
         })
         console.log(mostCountedLike)
         // Object.keys(mostCounted)
         //    .sort((a, b) => mostCounted[b] - mostCounted[a])
         //    .forEach((key, ind) => {
         //       // if (ind < 3) {
         //       hehe[key] = mostCounted[key]
         //       // }
         //    })

         //  console.log(pickHighest(mostCountedLike, 7))
         // Object.entries(like.reactionType).map((key) => {
         //    console.log(key)
         //    console.log(value)
         // })

         // const likeType = Object.keys(like.reactionType).filter(
         //    (key) => like.reactionType[key]
         // )[0] as LikeTypes
         // // console.count(likeType)
         // theMost = likeType
      })
      setButtonColor(theMost)
   }, [testObject])

   return null
}

export default useGetLikeTypes
