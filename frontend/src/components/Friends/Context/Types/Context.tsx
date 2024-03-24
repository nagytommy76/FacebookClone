import type { Dispatch, SetStateAction } from 'react'
import type { FriendButtonType } from '../../Types'
import type { FriendStateType, IFriendAction } from './ActionReducerTypes'

export interface IFriendContext {
   loading: boolean
   setLoading: Dispatch<SetStateAction<boolean>>
   cardButtonType: FriendButtonType
   setCardButtonType: Dispatch<SetStateAction<FriendButtonType>>
   friendReducer: FriendStateType
   friendDispatch: React.Dispatch<IFriendAction>
}
