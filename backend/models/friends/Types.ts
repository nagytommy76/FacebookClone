import { Model, ObjectId, Document } from 'mongoose'

// export interface IFriendsSchema {
//    senderUser: { userId: ObjectId | string; status: 'pending' | 'friends' }
//    receiverUser: { userId: ObjectId | string; status: 'pending' | 'friends' }
//    createdAt: string
//    updatedAt: string
// }
export interface IFriendsSchema {
   senderUser: ObjectId | string
   receiverUser: ObjectId | string
   status: 'pending' | 'friends'
   createdAt: string
   updatedAt: string
}

export interface IFriendsModel extends Model<IFriendsSchema> {}
