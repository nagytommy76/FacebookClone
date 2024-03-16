import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IRemoveFriend } from './Types'

export const removeFriendController = async (request: IRemoveFriend, response: Response) => {
   const friendId = request.body.friendId
   const isFriendRequestWithdraw = request.body.isFriendRequestWithdraw
   const loggedInUserId = request.user?.userId
   try {
      const foundUserToDelete = await UserModel.findOne({ _id: friendId }).select('friends')
      const foundUser = await UserModel.findOne({ _id: loggedInUserId }).select('friends')
      if (foundUser === null || foundUserToDelete === null) return response.status(404)

      if (!isFriendRequestWithdraw) {
         foundUserToDelete.friends = foundUserToDelete.friends.filter(
            (friend) => friend.senderUserId !== friendId || friend.receiverUserId !== loggedInUserId
         )
         foundUser.friends = foundUser.friends.filter(
            (friend) => friend.senderUserId !== friendId || friend.receiverUserId !== loggedInUserId
         )
      } else {
         foundUserToDelete.friends = foundUserToDelete.friends.filter(
            (friend) => friend.receiverUserId !== friendId || friend.senderUserId !== loggedInUserId
         )
         foundUser.friends = foundUser.friends.filter(
            (friend) => friend.receiverUserId !== friendId || friend.senderUserId !== loggedInUserId
         )
      }

      await foundUser.save()
      await foundUserToDelete.save()

      response
         .status(200)
         .json({ toDeleteFriendUser: foundUserToDelete.friends, loggedInUserFriends: foundUser.friends })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
