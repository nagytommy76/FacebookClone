import React from 'react'
import { axiosInstance as axios } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'

const useFriendRequest = (friendId: string) => {
   const mutationFunction = async () => {
      return await axios.post('/friends/make-friendship', { friendId })
   }

   const { mutate } = useMutation({
      mutationKey: ['makeFriendship'],
      mutationFn: mutationFunction,
      onSuccess(data, variables, context) {
         console.log(data.data)
      },
   })
   return mutate
}

export default useFriendRequest
