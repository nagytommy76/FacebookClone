import { useContext } from 'react'
import { FriendContext } from '../../../Context/FriendContext'
import { useMutation } from '@tanstack/react-query'
import useRemoveMutation from './useRemoveMutation'
import { socket } from '@/src/utils/socketIo'

const useWithdrawFriend = () => {
   const removeFriendMutation = useRemoveMutation()
   const {
      setLoading,
      setCardButtonType,
      friendReducer: { friend },
   } = useContext(FriendContext)

   const { mutate } = useMutation({
      mutationKey: ['removeFriend'],
      mutationFn: removeFriendMutation,
      onMutate: () => {
         setLoading(true)
      },
      onSuccess(data, variables, context) {
         setLoading(false)
         setCardButtonType('makeFriend')
         socket.emit('friend:withdrawFriend', { friend })
      },
   })
   return { withdrawFriend: () => mutate() }
}

export default useWithdrawFriend
