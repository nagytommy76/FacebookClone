import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, axiosInstance as axios } from '../../../utils/axiosSetup/AxiosInstance'
import { IUserPopulatedPosts } from '../../Auth/AuthTypes'

const getUserData = async () => {
   try {
      const response = await axios.get('/user/get-details')
      return response.data as IUserPopulatedPosts
   } catch (error) {
      console.log(error)
   }
}

const useGetUserData = () => {
   const { data, isLoading } = useQuery({
      queryKey: ['userData'],
      queryFn: getUserData,
   })
   return { userData: data, isLoading }
}

export default useGetUserData
