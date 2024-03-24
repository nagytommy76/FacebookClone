import type { IFriendsResponse, IConnectedFriends } from '../../Types'

type SetFriendsAction = {
   type: 'SET_FRIEND'
   payload: IFriendsResponse
}
type SetConnectedAction = {
   type: 'SET_CONNECTED_FRIENDS'
   payload: IConnectedFriends[]
}
type SetFriendIdAction = {
   type: 'SET_FRIENDID'
   payload: string
}

export type IFriendAction = SetFriendsAction | SetConnectedAction | SetFriendIdAction

export type FriendStateType = {
   friendId: string
   friend: IFriendsResponse
   connectedFriends: IConnectedFriends[]
}

export const friendsData: FriendStateType = {
   friendId: '',
   friend: {
      connectedFriends: [],
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
   connectedFriends: [
      {
         _id: '',
         createdAt: '',
         updatedAt: '',
         receiverUser: '',
         senderUser: '',
         status: 'pending',
      },
   ],
}
