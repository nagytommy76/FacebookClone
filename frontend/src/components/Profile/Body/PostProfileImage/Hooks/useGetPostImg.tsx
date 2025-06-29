import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

export default function useGetPostImg() {
   const postImgQuery = async () => {
      const result = axios.get('/user/get-post-images') as Promise<
         AxiosResponse<{
            posts: [
               {
                  _id: string
                  postedPicturesPath: string[]
                  createdAt: string
               }
            ]
         }>
      >
      return (await result).data
   }
   const { data } = useQuery({ queryKey: ['user-post-images'], queryFn: postImgQuery })

   return data?.posts
}
