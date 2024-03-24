import type { IFriendsResponse, IConnectedFriends } from '../../Types'

type SetFriendsAction = {
   type: 'SET_FRIEND'
   payload: IFriendsResponse
}
type SetFriendIdAction = {
   type: 'SET_FRIENDID'
   payload: string
}
type SetConnectedFriendAction = {
   type: 'SET_CONNECTED_FRIEND'
   payload: IConnectedFriends
}

export type IFriendAction = SetFriendsAction | SetFriendIdAction | SetConnectedFriendAction

export type FriendStateType = {
   friendId: string
   friend: IFriendsResponse
   selectedConnectedFriend: IConnectedFriends | null
}

export const friendsData: FriendStateType = {
   selectedConnectedFriend: null,
   friendId: '',
   friend: {
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
