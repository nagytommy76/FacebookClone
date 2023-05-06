import { Schema, model } from 'mongoose'
import type { UserModel, IUserTypes } from '../../controllers/users/Types'
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
      friends: { type: [{ userId: Schema.Types.ObjectId }] },
      userDetails: {
         profilePicturePath: String,
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
      },
      posts: { type: Schema.Types.ObjectId, ref: 'Posts' },
   },
   { timestamps: true }
)

UserStatics(UserSchema)

export const User = model<IUserTypes, UserModel>('User', UserSchema)
