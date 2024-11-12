import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/utils/axiosSetup/AxiosInstance'
import type { IPost } from '@/src/types/PostTypes'

import useHandlePosts from '@/Base/PostsBase/Hooks/useHandlePosts'

export default function useGetUserPosts() {
   const params = useParams() as { userId: string }
   const { addNewPost, allPosts, removeSinglePostById, setAllPosts } = useHandlePosts()

   const getUserPosts = async () => {
      try {
         const response = await axios.get('/post/get-user-posts', {
            params: { userId: params.userId },
         })
         return response as AxiosResponse<{ allPosts: IPost[] }>
      } catch (error) {
         console.log(error)
         return Promise.reject(new Error())
      }
   }

   const { isLoading, data } = useQuery({
      queryKey: ['get-all-user-posts'],
      queryFn: getUserPosts,
   })

   useEffect(() => {
      if (data) setAllPosts(data.data.allPosts)
   }, [setAllPosts, data])

   return {
      isLoading,
      addNewPost,
      allPosts,
      removeSinglePostById,
   }
}
