import { Response, Request } from 'express'
import { Types } from 'mongoose'
import { User as UserModel } from '../../models/user/user'
import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

// https://www.mongodb.com/docs/manual/reference/operator/aggregation/filter/
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/
export const getUsers = async (request: Request, response: Response) => {
   try {
      const users = await UserModel.aggregate([
         {
            $addFields: {
               dateOfBirth: { $add: ['$userDetails.dateOfBirth'] },
            },
         },
         {
            $project: {
               firstName: 1,
               sureName: 1,
               email: 1,
               createdAt: 1,
               friends: 1,
               dateOfBirth: 1,
               selectedProfilePicture: {
                  $filter: {
                     input: '$userDetails.profilePicturePath',
                     as: 'profilePic',
                     cond: { $eq: ['$$profilePic.isSelected', true] },
                  },
               },
               lastWorkPlace: {
                  $filter: {
                     input: '$userDetails.workPlaces',
                     as: 'workPlace',
                     cond: { $eq: ['$$workPlace.endDate', null] },
                  },
               },
            },
         },
         {
            $lookup: {
               from: 'friends',
               localField: 'friends',
               foreignField: '_id',
               as: 'connectedFriends',
            },
         },
      ])

      return response.status(200).json(users)
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}

// https://stackoverflow.com/questions/50363220/modelling-for-friends-schema-in-mongoose

export const getAcceptedUsers = async (request: IJWTUserType, response: Response) => {
   const userId = new Types.ObjectId(request.user?.userId)
   try {
      const acceptedFriends = await UserModel.aggregate([
         {
            $match: { _id: userId },
         },
         {
            $project: {
               friends: {
                  $filter: {
                     input: '$friends',
                     as: 'acceptedFriends',
                     cond: { $eq: ['$$acceptedFriends.isAccepted', true] },
                  },
               },
            },
         },
      ])

      return response.status(200).json(acceptedFriends)
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}
