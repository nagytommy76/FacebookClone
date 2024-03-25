import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { FriendsModel } from '../../models/friends/friends'
import { IRemoveFriend } from './Types'

export const removeFriendController = async (request: IRemoveFriend, response: Response) => {
   const loggedInUserId = request.user?.userId
   const toDeleteFriendId = request.body.friendId
   const connectedFriendId = request.body.connectedFriendId

   try {
      const friends = await FriendsModel.deleteOne({ _id: connectedFriendId })
      const foundUserToDelete = await UserModel.findOne({ _id: toDeleteFriendId }).select('friends')
      const foundUser = await UserModel.findOne({ _id: loggedInUserId }).select('friends')
      if (foundUser === null || foundUserToDelete === null) return response.status(404)

      foundUserToDelete.friends = foundUserToDelete.friends.filter(
         (friend) => friend.toString() != connectedFriendId
      )
      foundUser.friends = foundUser.friends.filter((friend) => friend.toString() != connectedFriendId)

      await foundUser.save()
      await foundUserToDelete.save()

      response.status(200).json({
         toDeleteFriendUser: foundUserToDelete.friends,
         loggedInUserFriends: foundUser.friends,
         deletedFriendsCount: friends.deletedCount,
      })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
