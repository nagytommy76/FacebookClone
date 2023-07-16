import { useContext } from 'react'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import { UserDataActions } from '../../Context/ProfileReducer'
import type { IPost } from '@/types/PostTypes'

import PostsBase from '@/Base/PostsBase/PostsBase'

const Posts = () => {
   const {
      profileDispatch,
      profileReducer: { usersPosts },
   } = useContext(ProfileContext)
   const addNewPost = (newPost: IPost) => {
      profileDispatch({ type: UserDataActions.ADD_NEW_POST, payload: newPost })
   }
   return <PostsBase addNewPost={addNewPost} allPostsData={usersPosts} />
}

export default Posts
