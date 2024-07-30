import type { IFriendsResponse, IFriends } from '../../Types'

type SetFriendsAction = {
   type: 'SET_FRIEND'
   payload: IFriendsResponse
}
type SetFriendsArrayAction = {
   type: 'SET_FRIENDS_ARRAY'
   payload: IFriends[]
}

type setSenderFriendsAction = {
   type: 'SET_SENDER_FRIENDS'
   payload: { receiverFriends: IFriends; receiverFriendId: string }
}

type SetFriendIdAction = {
   type: 'SET_FRIENDID'
   payload: string
}

export type IFriendAction =
   | SetFriendsAction
   | SetFriendsArrayAction
   | SetFriendIdAction
   | setSenderFriendsAction

export type FriendStateType = {
   friendId: string
   friend: IFriendsResponse
}

export const friendsData: FriendStateType = {
   friendId: '',
   friend: {
      _id: '',
      createdAt: '',
      dateOfBirth: '',
      email: '',
      firstName: '',
      sureName: '',
      friends: [],
      lastWorkPlace: [],
      notification: [],
      selectedProfilePicture: [],
   },
}
