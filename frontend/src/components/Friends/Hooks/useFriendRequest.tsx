import { useState } from 'react'
import { axiosInstance as axios } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'

const useFriendRequest = (friendId: string) => {
   const [loading, setLoading] = useState<boolean>(false)

   const mutationFunction = async () => {
      return await axios.post('/friends/make-friendship', { friendId })
   }

   const { mutate } = useMutation({
      mutationKey: ['makeFriendship'],
      mutationFn: mutationFunction,
      onMutate(variables) {
         setLoading(true)
         console.log('MUTATE INDUL')
      },
      onSuccess(data, variables, context) {
         console.log(data.data)
         setLoading(false)
      },
   })
   return { friendRequestMutate: mutate, loading }
}

export default useFriendRequest
