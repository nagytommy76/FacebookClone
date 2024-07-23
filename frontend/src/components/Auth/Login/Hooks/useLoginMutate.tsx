import { useMutation } from '@tanstack/react-query'

import useOnError from './useOnError'
import useMutationFn from './useMutationFn'
import useOnSuccess from './useOnSuccess'

import type { Dispatch, SetStateAction } from 'react'
import type { IInputValues } from '../../Register/Includes/Types'

const useLoginMutate = (
   email: string,
   password: string,
   setEmail: Dispatch<SetStateAction<IInputValues>>,
   setPassword: Dispatch<SetStateAction<IInputValues>>
) => {
   const onError = useOnError(setEmail, setPassword)
   const handleLoginSend = useMutationFn(email, password)
   const onSuccess = useOnSuccess()

   const { mutate, isLoading, data } = useMutation({
      mutationKey: ['login'],
      mutationFn: handleLoginSend,
      onMutate: () => {
         setEmail((prevValues) => ({ ...prevValues, isError: false, msg: '' }))
         setPassword((prevValues) => ({ ...prevValues, isError: false, msg: '' }))
      },
      onSuccess,
      onError,
   })

   return {
      loginMutate: mutate,
      isLoading,
      data,
   }
}

export default useLoginMutate
