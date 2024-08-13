import type { HydratedDocument, QueryWithHelpers } from 'mongoose'
import type { IPostTypes } from './postModelType'

export interface IPostQueryHelper {
   selectAndPopulateUserPicure(
      selectField: string,
      path: string,
      selectArray?: string[]
   ): QueryWithHelpers<HydratedDocument<IPostTypes>, HydratedDocument<IPostTypes>, IPostQueryHelper>
   populateUserIdWithProfilePicture(
      path: string,
      selectArray?: string[]
   ): QueryWithHelpers<HydratedDocument<IPostTypes>, HydratedDocument<IPostTypes>, IPostQueryHelper>
}
