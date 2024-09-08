export interface IRawOnlineFriends {
   userId: string
   socketId?: string
   isActive: string
   lastSeen: string
}

export interface IOnlineFriendsRedis {
   userId: string
   socketId?: string
   isActive: boolean
   lastSeen: number
}
export interface IIndexedOnlineFriendsRedis {
   [x: string]: IOnlineFriendsRedis
}
