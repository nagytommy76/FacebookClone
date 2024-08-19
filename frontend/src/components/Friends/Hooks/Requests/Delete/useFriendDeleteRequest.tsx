import { useContext } from 'react'
import { FriendContext } from '../../../Context/FriendContext'
import { useAppSelector } from '@/reduxStore/store'
import { useMutation } from '@tanstack/react-query'
import { socket } from '@/src/utils/socketIo'

import useRemoveMutation from './useRemoveMutation'

const useFriendDeleteRequest = () => {
   const removeFriendMutation = useRemoveMutation()
   const { userId, userName, currentImage } = useAppSelector((state) => state.auth)
   const {
      setLoading,
      setCardButtonType,
      friendDispatch,
      friendReducer: { friendId },
   } = useContext(FriendContext)

   // Ide kéne 3 mutation ->
   // - Amikor törlöm a már meglévő friendet
   //  - Amikor elutasítom
   //  - És amikor visszavonom a jelölésem

   // Ha már barátok vagyunk akkor ->
   const { mutate } = useMutation({
      mutationKey: ['removeFriend'],
      mutationFn: removeFriendMutation,
      onMutate: () => {
         setLoading(true)
      },
      onSuccess(data, variables, context) {
         setLoading(false)
         friendDispatch({ type: 'REMOVE_SINGLE_FRIEND', payload: userId as string })
         socket.emit('friend:rejectFriend', {
            friend: { userName, currentImage: currentImage.path },
            friendId: userId,
            roomId: friendId,
         })
         setCardButtonType('makeFriend')
      },
   })

   const deleteFriendMutate = () => mutate()

   return {
      deleteFriendMutate,
   }
}

export default useFriendDeleteRequest
