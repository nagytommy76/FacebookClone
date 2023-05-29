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
]

const pickHighest = (obj: IObject, num = 1) => {
   const requiredObj: IObject = { isAngry: 0, isCare: 0, isHaha: 0, isLike: 0, isLove: 0, isSad: 0, isWow: 0 }
   // if (num > Object.keys(obj).length) {
   //    return false
   // }
   console.log(Object.entries(obj).sort((max, game) => game[1] - max[1]))
   Object.entries(obj)
      .sort((max, game) => game[1] - max[1])
      .forEach((key) => {
         // if (ind < num) {
         console.log(key[0])
         // console.log(requiredObj[key[0]])
         requiredObj[key[0]] = obj[key[0]]
         // }
      })
   return requiredObj
}

interface IObject {
   [index: string]: number
   isAngry: number
   isCare: number
   isHaha: number
   isLike: number
   isLove: number
   isSad: number
   isWow: number
}

const useGetLikeTypes = (setButtonColor: (currentLikeType: LikeTypes | undefined) => void) => {
   const [mostCountedLike, setMostCountedLike] = useState<IObject>({
      isAngry: 0,
      isCare: 0,
      isHaha: 0,
      isLike: 0,
      isLove: 0,
      isSad: 0,
      isWow: 0,
   })

   useEffect(() => {
      let theMost: LikeTypes = 'isLike'
      let collectObject: IObject = {
         isAngry: 0,
         isCare: 0,
         isHaha: 0,
         isLike: 0,
         isLove: 0,
         isSad: 0,
         isWow: 0,
      }
      testObject.map((like) => {
         Object.entries(like.reactionType).map((item) => {
            if (item[1]) collectObject[item[0]]++
         })
      })
      // console.log(Object.entries(collectObject).reduce((max, game) => (max[1] > game[1] ? max : game)))
      // console.log(Object.entries(collectObject).sort((max, game) => game[1] - max[1]))
      // console.log(Object.entries(collectObject).sort((max, game) => game[1] - max[1])[0][0])

      // const sortedLikeTypesCount = Object.entries(collectObject).sort((max, game) => game[1] - max[1])

      const sortedLikeTypesCount = pickHighest(collectObject)
      console.log(pickHighest(collectObject))
      // setButtonColor(sortedLikeTypesCount[0][0] as LikeTypes)
   }, [testObject])

   return null
}

export default useGetLikeTypes
