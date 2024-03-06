import { Response, Request } from 'express'
import { User as UserModel } from '../../models/user/user'

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
