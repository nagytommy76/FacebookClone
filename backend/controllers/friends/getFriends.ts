import { Response, Request } from 'express'
import { Types } from 'mongoose'
import { User as UserModel } from '../../models/user/user'
import { FriendsModel } from '../../models/friends/friends'
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
               localField: 'friends.friendsId',
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

export const getAcceptedFriendsModel = async (userId: Types.ObjectId) => {
   return await UserModel.aggregate<{
      myFoundFriendsData: { firstName: string; surname: string; _id: string }
   }>([
      {
         $match: { _id: userId },
      },
      {
         $project: { friends: 1 },
      },
      {
         $lookup: {
            from: 'friends',
            localField: 'friends.friendsId',
            foreignField: '_id',
            as: 'foundFriend',
            pipeline: [
               {
                  $match: {
                     status: 'friends',
                  },
               },
            ],
         },
      },
      {
         $lookup: {
            from: 'users',
            localField: 'friends.friend',
            foreignField: '_id',
            as: 'myFoundFriendsData',
            pipeline: [
               {
                  $project: {
                     firstName: 1,
                     sureName: 1,
                     selectedProfilePicture: {
                        $filter: {
                           input: '$userDetails.profilePicturePath',
                           as: 'profilePic',
                           cond: { $eq: ['$$profilePic.isSelected', true] },
                        },
                     },
                  },
               },
            ],
         },
      },
   ])
}

export const getAcceptedUsers = async (request: IJWTUserType, response: Response) => {
   const userId = new Types.ObjectId(request.user?.userId)
   try {
      // const acceptedFriends = await FriendsModel.aggregate([
      //    {
      //       $match: {
      //          status: 'friends',
      //          $or: [
      //             {
      //                senderUser: userId,
      //             },
      //             {
      //                receiverUser: userId,
      //             },
      //          ],
      //       },
      //    },
      //    {
      //       $lookup: {
      //          from: 'users',
      //          localField: 'senderUser',
      //          foreignField: '_id',
      //          as: 'foundUserData',
      //          pipeline: [
      //             {
      //                $project: {
      //                   firstName: 1,
      //                   sureName: 1,
      //                   friends: 1,
      //                   selectedProfilePicture: {
      //                      $filter: {
      //                         input: '$userDetails.profilePicturePath',
      //                         as: 'profilePic',
      //                         cond: { $eq: ['$$profilePic.isSelected', true] },
      //                      },
      //                   },
      //                },
      //             },
      //          ],
      //       },
      //    },
      // ])

      /**
       *  Meg kéne találnom azokat a barátokat akiknek a status --> friends
       */
      const acceptedFriends = await getAcceptedFriendsModel(userId)

      return response.status(200).json(acceptedFriends[0])
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}
