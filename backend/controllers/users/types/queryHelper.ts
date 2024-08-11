import { HydratedDocument, QueryWithHelpers } from 'mongoose'
import type { IUserTypes } from './ModelTypes'

// https://mongoosejs.com/docs/typescript/query-helpers.html
export interface UserQueryHelpers {
   byGetSelectedProfilePicture(): QueryWithHelpers<
      HydratedDocument<IUserTypes>,
      HydratedDocument<IUserTypes>,
      UserQueryHelpers
   >
}
