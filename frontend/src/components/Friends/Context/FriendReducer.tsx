import { produce } from 'immer'
import type { FriendStateType, IFriendAction } from './Types/ActionReducerTypes'

export default function FriendReducer(state: FriendStateType, { payload, type }: IFriendAction) {
   switch (type) {
      case 'SET_FRIENDID':
         return {
            ...state,
            friendId: payload,
         }
      case 'SET_FRIENDS_ARRAY':
         return produce(state, (draft) => {
            draft.friend.friends = payload
         })
      case 'SET_SENDER_FRIENDS':
         return produce(state, (draft) => {
            const { receiverFriendId, receiverFriends } = payload
            const foundModifyFriendIndex = draft.friend.friends.findIndex(
               (friend) => friend.friend === receiverFriendId
            )
            draft.friend.friends[foundModifyFriendIndex] = receiverFriends
         })
      case 'SET_FRIEND':
         const friend = produce(state, (draft) => {
            draft.friend = payload
         })
         return friend
      case 'REMOVE_SINGLE_FRIEND':
         return produce(state, (draft) => {
            draft.friend.friends = draft.friend.friends.filter((friend) => friend.friend !== payload)
         })
      default:
         return state
   }
}
