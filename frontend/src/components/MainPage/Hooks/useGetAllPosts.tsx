import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/utils/axiosSetup/AxiosInstance'
import type { IPost } from '@/src/types/PostTypes'
import useHandlePosts from '@/Base/PostsBase/Hooks/useHandlePosts'

export default function useGetAllPosts() {
   const { addNewPost, allPosts, removeSinglePostById, setAllPosts } = useHandlePosts()
   const getAllPosts = async () => {
      try {
         const response = await axios.get('/post/get-posts')
         return response as AxiosResponse<{ allPosts: IPost[] }>
      } catch (error) {
         console.log(error)
      }
   }

   const { isLoading, data } = useQuery({
      queryKey: ['get-all-posts'],
      queryFn: getAllPosts,
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
