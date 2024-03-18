import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

const useGetAccepted = () => {
   const queryFn = async () => {
      return await axios.get('/friends/get-accepted-friends')
   }

   const { data } = useQuery({
      queryKey: ['getAcceptedFriends'],
      queryFn,
      onSuccess(data) {
         console.log(data.data)
      },
   })

   return null
}

export default useGetAccepted
