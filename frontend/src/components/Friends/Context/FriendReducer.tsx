import { produce } from 'immer'
import type { FriendStateType, IFriendAction } from './Types/ActionReducerTypes'

export default function FriendReducer(state: FriendStateType, { payload, type }: IFriendAction) {
   switch (type) {
      case 'SET_FRIENDID':
         return {
            ...state,
            friendId: payload,
         }
      case 'SET_CONNECTED_FRIEND':
         return produce(state, (draft) => {
            draft.selectedConnectedFriend = payload
         })
      case 'SET_FRIEND':
         const friend = produce(state, (draft) => {
            draft.friend = payload
         })
         return friend
      default:
         return state
   }
}
