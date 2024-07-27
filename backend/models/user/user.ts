import { Schema, model, Types } from 'mongoose'
import type { UserModel, IUserTypes } from '../../controllers/users/types/ModelTypes'
import { UserStatics } from './statics'

const UserSchema = new Schema<IUserTypes, UserModel>(
   {
      firstName: String,
      sureName: String,
      isEmailConfirmed: {
         type: Boolean,
         default: false,
      },
      email: {
         type: String,
         required: [true, 'Kérek egy email címet!'],
         unique: true,
      },
      password: {
         type: String,
         required: [true, 'Adjon meg egy jelszót!'],
         minlength: [4, 'a jelszó min. 4 karakter legyen!'],
      },
      friends: {
         // type: [
         //    {
         //       friendsId: { type: Types.ObjectId, ref: 'Friends', unique: true },
         //       friend: { type: Types.ObjectId, ref: 'User', unique: true },
         //    },
         // ],
         type: [
            {
               friend: { type: Types.ObjectId, ref: 'User', unique: true },
               status: {
                  type: String,
                  enum: ['pending', 'friends'],
                  default: 'pending',
               },
            },
         ],
      },
      userDetails: {
         profilePicturePath: {
            type: [
               {
                  path: String,
                  isSelected: Boolean,
               },
            ],
            default: {
               path: 'https://firebasestorage.googleapis.com/v0/b/facebookimagestorage.appspot.com/o/facebook-profile.jpg?alt=media&token=654bab74-a4a3-4eab-8fdb-e7e22f116c9a',
               isSelected: true,
            },
         },
         birthTown: String,
         homeTown: String,
         relationShip: { type: { isAlone: Boolean, inRelation: Boolean }, required: false },
         studies: {
            elementary: {
               from: Number,
               to: Number,
               name: String,
            },
            highSchool: {
               from: Number,
               to: Number,
               name: String,
            },
            university: {
               from: Number,
               to: Number,
               name: String,
            },
         },
         gender: {
            type: String,
            required: true,
         },
         dateOfBirth: {
            type: Date,
            required: true,
         },
         workPlaces: [
            {
               companyName: String,
               position: String,
               city: String,
               description: String,
               startDate: String,
               endDate: { type: String, default: null, required: false },
            },
         ],
      },
   },
   { timestamps: true }
)
UserSchema.add({
   notifications: [
      {
         notificationType: String,
         isRead: Boolean,
         createdAt: Date,
         postData: {
            description: String,
            postId: String,
         },
         userDetails: {
            // type: Types.ObjectId, ref: 'Users'
            userId: String,
            firstName: String,
            sureName: String,
            profilePicture: String,
         },
      },
   ],
})

UserStatics(UserSchema)

export const User = model<IUserTypes, UserModel>('User', UserSchema)
