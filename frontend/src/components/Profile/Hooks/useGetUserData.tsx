import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '../../../utils/axiosSetup/AxiosInstance'
import { IUserPopulatedPosts } from '../../Auth/AuthTypes'

const getUserData = async () => {
   try {
      const response = await axios.get('/user/get-details')
      return response.data as IUserPopulatedPosts
   } catch (error) {
      console.log(error)
      return Promise.reject(new Error())
   }
}

const useGetUserData = () => {
   const { data, isLoading, isError } = useQuery({
      queryKey: ['userData'],
      queryFn: getUserData,
   })
   return { data, isLoading, isError }
}

export default useGetUserData
