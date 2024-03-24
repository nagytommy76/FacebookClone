import { createContext, useReducer, useEffect, SetStateAction } from 'react'
import FriendReducer from './FriendReducer'
import useStates from '../Hooks/useStates'

import { friendsData } from './Types/ActionReducerTypes'
import type { IFriendContext } from './Types/Context'
import type { IFriendsResponse, FriendButtonType } from '../Types'

export const FriendContext = createContext<IFriendContext>({
   loading: false,
   setLoading: function (value: SetStateAction<boolean>): void {
      throw new Error('Function not implemented.')
   },
   cardButtonType: 'isFriend',
   setCardButtonType: function (value: SetStateAction<FriendButtonType>): void {
      throw new Error('Function not implemented.')
   },
   friendReducer: friendsData,
   friendDispatch: function (): void {
      throw new Error('Function not implemented.')
   },
})

const FriendsContextProvider: React.FC<{
   friend: IFriendsResponse
   children: React.ReactNode
}> = ({ friend, children }) => {
   const { cardButtonType, loading, setCardButtonType, setLoading } = useStates()
   const [friendReducer, friendDispatch] = useReducer(FriendReducer, friendsData)

   useEffect(() => {
      friendDispatch({ type: 'SET_FRIEND', payload: friend })
      friendDispatch({ type: 'SET_FRIENDID', payload: friend._id })
   }, [friend])

   return (
      <FriendContext.Provider
         value={{ friendReducer, cardButtonType, loading, friendDispatch, setCardButtonType, setLoading }}
      >
         {children}
      </FriendContext.Provider>
   )
}

export default FriendsContextProvider
