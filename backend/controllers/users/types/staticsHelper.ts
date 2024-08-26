import { Model, ObjectId, Document } from 'mongoose'
import type { NotificationType } from '../../notifications/types/notificationTypes'
import type { SelectUserByIdType } from './requestTypes'
import type { UserQueryHelpers } from './queryHelper'
import type { IUserTypes } from './ModelTypes'

export interface UserModel extends Model<IUserTypes, UserQueryHelpers> {
   getUserByUserIdAndSelect: (userId: string | ObjectId) => Promise<
      Document<unknown, any, SelectUserByIdType[]> &
         Omit<
            SelectUserByIdType[] &
               Required<{
                  _id: ObjectId
               }>,
            never
         >
   >
   getSaveNotification: (
      foundPostId: string | ObjectId,
      foundPostUserId: string | ObjectId,
      foundPostDescription: string,
      firstName: string,
      sureName: string,
      likedUserId: string | ObjectId,
      profilePicture: string,
      notificationType: NotificationType
   ) => Promise<
      Document<unknown, any, IUserTypes> &
         Omit<
            IUserTypes &
               Required<{
                  _id: ObjectId
               }>,
            never
         >
   >
   checkRegisterEmail(email: string): Promise<void>
   encryptPassword(nativePass: string): Promise<string>
   comparePassword(
      email: string,
      plainPass: string
   ): Promise<{ isPasswordCorrect: boolean; foundUser: IUserTypes }>
   jwtAccessTokenSign(
      userId: string | ObjectId,
      email: string,
      ACCESS_TOKEN_SECRET: string,
      expiresIn?: string
   ): string
   jwtRefreshTokenSign(
      userId: string | ObjectId,
      email: string,
      REFRESH_TOKEN_SECRET: string,
      expiresIn?: string
   ): string
}
