import { Response, Request } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export const getUsers = async (request: Request, response: Response) => {
   try {
      const users = await UserModel.find({
         'userDetails.profilePicturePath': { $elemMatch: { isSelected: { $eq: true } } },
      }).select([
         'firstName',
         'sureName',
         'email',
         'createdAt',
         'userDetails.profilePicturePath.$',
         'friends',
      ])

      return response.status(200).json(users)
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}

export const makeFriendshipController = async (request: IMakeFriends, response: Response) => {
   const loggedInUserId = request.user?.userId as string
   const friendId = request.body.friendId

   try {
      const senderUser = await UserModel.findOne({ _id: loggedInUserId }).select('friends')
      const receiverUser = await UserModel.findOne({ _id: friendId }).select('friends')

      senderUser?.friends.push({
         createdAt: new Date(),
         isAccepted: false,
         userId: receiverUser?.id,
      })
      receiverUser?.friends.push({
         createdAt: new Date(),
         isAccepted: true,
         userId: senderUser?.id,
      })

      response.status(200).json({ msg: 'makeFriendship', senderUser, receiverUser })
   } catch (error) {
      console.log(error)
      response.json(500).json(error)
   }
}

interface IMakeFriends extends IJWTUserType {
   body: {
      friendId: string
   }
}
