import { produce } from 'immer'
import type { FriendStateType, IFriendAction } from './Types/ActionReducerTypes'

export default function FriendReducer(state: FriendStateType, { payload, type }: IFriendAction) {
   switch (type) {
      case 'SET_FRIENDID':
         return {
            ...state,
            friendId: payload,
         }
      case 'SET_FRIEND':
         const friend = produce(state, (draft) => {
            draft.friend = payload
         })
         return friend
      case 'SET_CONNECTED_FRIENDS':
         const connected = produce(state, (draft) => {
            draft.connectedFriends = payload
         })
         return connected
      default:
         return state
   }
}
