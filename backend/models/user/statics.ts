import jwt from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'

import { DefaultSchemaOptions, ObjectId, Schema, Types } from 'mongoose'
import type { IUserTypes, UserModel } from '../../controllers/users/types/ModelTypes'
import type { NotificationType } from '../../controllers/notifications/types/notificationTypes'

export function UserStatics(
   UserSchema: Schema<IUserTypes, UserModel, {}, {}, {}, {}, DefaultSchemaOptions, IUserTypes>
) {
   UserSchema.statics.encryptPassword = async function (nativePass: string) {
      return await hash(nativePass, 10)
   }
   UserSchema.statics.comparePassword = async function (email: string, plainPass: string) {
      const foundUser = await this.findOne({ email })
      if (!foundUser) throw new Error('Nincs regisztrálva felhasználó ilyen email címmel!')
      const isPasswordCorrect = await compare(plainPass, foundUser.password)
      return { isPasswordCorrect, foundUser }
   }

   UserSchema.statics.jwtAccessTokenSign = function (
      userId: string | ObjectId,
      email: string,
      ACCESS_TOKEN_SECRET: string,
      expiresIn: string = '15min'
   ) {
      return jwt.sign({ userId, email }, ACCESS_TOKEN_SECRET, { expiresIn })
   }

   UserSchema.statics.jwtRefreshTokenSign = function (
      userId: string | ObjectId,
      email: string,
      REFRESH_TOKEN_SECRET: string,
      expiresIn: string = '1day'
   ) {
      return jwt.sign({ userId, email }, REFRESH_TOKEN_SECRET, { expiresIn })
   }

   UserSchema.statics.getUserByUserIdAndSelect = async function (userId: string) {
      return await this.aggregate([
         { $match: { _id: new Types.ObjectId(userId) } },
         {
            $project: {
               firstName: 1,
               sureName: 1,
               email: 1,
               friends: 1,
               selectedProfilePicturePath: {
                  $filter: {
                     input: '$userDetails.profilePicturePath',
                     as: 'profilePic',
                     cond: { $eq: ['$$profilePic.isSelected', true] },
                  },
               },
            },
         },
      ])
   }

   UserSchema.statics.getSaveNotification = async function (
      foundPostUserId: string,
      foundPostDescription: string,
      firstName: string,
      sureName: string,
      likedUserId: string,
      profilePicture: string,
      notificationType: NotificationType = 'isPostLike'
   ) {
      const toSaveNotification = await this.findById(foundPostUserId).select(['notifications'])

      if (toSaveNotification) {
         toSaveNotification.notifications.push({
            isRead: false,
            notificationType,
            createdAt: new Date(),
            data: {
               postId: foundPostUserId,
               description: foundPostDescription,
            },
            userDetails: {
               firstName: firstName,
               sureName: sureName,
               userId: likedUserId,
               profilePicture,
            },
         })
         await toSaveNotification.save()
      }

      return toSaveNotification
   }
}
