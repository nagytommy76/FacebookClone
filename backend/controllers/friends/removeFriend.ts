import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IRemoveFriend } from './Types'

export const removeFriendController = async (request: IRemoveFriend, response: Response) => {
   const loggedInUserId = request.user?.userId
   const friendId = request.body.friendId

   try {
      await UserModel.updateOne({ _id: friendId }, { $pull: { friends: { friend: loggedInUserId } } })
      await UserModel.updateOne({ _id: loggedInUserId }, { $pull: { friends: { friend: friendId } } })

      response.status(201).json({ msg: 'deleted' })
   } catch (error) {
      console.log(error)
      response.status(500).json(error)
   }
}
