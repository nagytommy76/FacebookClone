import { useContext } from 'react'
import { FriendContext } from '../../../Context/FriendContext'
import { useMutation } from '@tanstack/react-query'
import { useAppSelector } from '@/reduxStore/store'
import useRemoveMutation from './useRemoveMutation'
import { socket } from '@/src/utils/socketIo'

const useWithdrawFriend = () => {
   const { userId, userName, currentImage } = useAppSelector((state) => state.auth)
   const removeFriendMutation = useRemoveMutation()
   const { setLoading, setCardButtonType, friendDispatch } = useContext(FriendContext)

   const { mutate } = useMutation({
      mutationKey: ['removeFriend'],
      mutationFn: removeFriendMutation,
      onMutate: () => {
         setLoading(true)
      },
      onSuccess(data, variables, context) {
         setLoading(false)
         setCardButtonType('makeFriend')
         // My userId needed -> I'm the sender -> my id is the room_id
         friendDispatch({ type: 'REMOVE_SINGLE_FRIEND', payload: userId as string })
         socket.emit('friend:withdrawFriend', {
            friend: { userName, currentImage: currentImage.path },
            friendId: userId,
         })
      },
   })
   return { withdrawFriend: () => mutate() }
}

export default useWithdrawFriend
