import type { IFriendsResponse, IConnectedFriends } from '../../Types'

type SetFriendsAction = {
   type: 'SET_FRIEND'
   payload: IFriendsResponse
}
type SetFriendsArrayAction = {
   type: 'SET_FRIENDS_ARRAY'
   payload: {
      friendsId: string
      friend: string
   }[]
}
type SetFriendIdAction = {
   type: 'SET_FRIENDID'
   payload: string
}
type SetConnectedFriendAction = {
   type: 'SET_SELECTED_CONNECTED_FRIEND'
   payload: IConnectedFriends
}

export type IFriendAction =
   | SetFriendsAction
   | SetFriendsArrayAction
   | SetFriendIdAction
   | SetConnectedFriendAction

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
      friends: [{ friend: '', friendsId: '' }],
      lastWorkPlace: [],
      notification: [],
      selectedProfilePicture: [],
   },
}
