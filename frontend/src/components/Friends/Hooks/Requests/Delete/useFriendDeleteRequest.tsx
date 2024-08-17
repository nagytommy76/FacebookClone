import { useContext } from 'react'
import { FriendContext } from '../../../Context/FriendContext'

import { useMutation } from '@tanstack/react-query'
import useRemoveMutation from './useRemoveMutation'

const useFriendDeleteRequest = () => {
   const removeFriendMutation = useRemoveMutation()
   const { setLoading, setCardButtonType } = useContext(FriendContext)

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
         setCardButtonType('makeFriend')
      },
   })

   const deleteFriendMutate = () => mutate()

   return {
      deleteFriendMutate,
   }
}

export default useFriendDeleteRequest
