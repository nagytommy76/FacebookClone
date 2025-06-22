/// <reference path="../../src/@types/index.d.ts" />
import { Response, Request } from 'express'
import { Types } from 'mongoose'
import { User as UserModel } from '../../models/user/user'
import redisConfig from '../../config/redis.config'

import type { IFriends } from '../users/types/ModelTypes'
import type SocketService from 'config/socketIo.config'

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
      ])

      return response.status(200).json(users)
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}

export const getUsersFriends = async (request: Request, response: Response) => {
   try {
      const queryUserId = request.query.userId as string
      const userId = new Types.ObjectId(queryUserId)
      const myFriends = await UserModel.aggregate([
         {
            $match: { _id: userId },
         },
         {
            $project: {
               friends: {
                  $filter: {
                     input: '$friends',
                     as: 'friend',
                     cond: { $eq: ['$$friend.status', 'friends'] },
                  },
               },
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
               ],
            },
         },
      ])
      return response.status(200).json(myFriends[0].myFoundFriendsData)
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}

// https://stackoverflow.com/questions/50363220/modelling-for-friends-schema-in-mongoose

export const getAcceptedFriendsModel = async (userId: Types.ObjectId) => {
   return await UserModel.aggregate<{
      myFoundFriendsData: { firstName: string; surname: string; _id: string }[]
      friends: IFriends[]
   }>([
      {
         $match: { _id: userId },
      },
      {
         $project: {
            friends: {
               $filter: {
                  input: '$friends',
                  as: 'friend',
                  cond: { $eq: ['$$friend.status', 'friends'] },
               },
            },
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
// Átalakítani mert nem kell lookup -> nincs már Friends model a DB-ben

export const getAcceptedUsers = async (request: Request, response: Response, io: SocketService) => {
   const userId = new Types.ObjectId(request.user.userId)
   try {
      const acceptedFriends = await getAcceptedFriendsModel(userId)

      const allFriendIds = acceptedFriends[0].myFoundFriendsData.map((friend) => friend._id)

      const allOnlineFriends = await redisConfig.getAllUsers(allFriendIds)

      return response
         .status(200)
         .json({ myFoundFriendsData: acceptedFriends[0].myFoundFriendsData, allOnlineFriends })
   } catch (error) {
      console.log(error)
      return response.status(500).json(error)
   }
}
