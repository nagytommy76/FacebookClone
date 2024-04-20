export interface IChat {
   _id: string
   participants: { participant: string; _id: string }[]
   createdAt: string
   updatedAt: string
   messages: IMessages[]
}

export interface IMessages {
   _id: string
   createdAt?: string
   updatedAt?: string
   userId: string
   isRead?: boolean
   message: string
   image: string
}
