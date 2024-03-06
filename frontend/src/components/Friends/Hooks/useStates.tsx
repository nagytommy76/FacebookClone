import { useState } from 'react'
import type { FriendButtonType } from '../Types'

const useStates = () => {
   const [loading, setLoading] = useState<boolean>(false)
   const [cardButtonType, setCardButtonType] = useState<FriendButtonType>('makeFriend')

   return {
      loading,
      cardButtonType,
      setLoading,
      setCardButtonType,
   }
}

export default useStates
