import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse, isAxiosError } from '../../../../axiosSetup/AxiosInstance'
import type { Dispatch, SetStateAction } from 'react'
import type { IInputValues, ILoginData } from '../../Register/Includes/Types'

const useLoginMutate = (
   email: string,
   password: string,
   setEmail: Dispatch<SetStateAction<IInputValues>>,
   setPassword: Dispatch<SetStateAction<IInputValues>>
) => {
   const handleLoginSend = async (event: React.FormEvent): Promise<AxiosResponse<ILoginData>> => {
      event.preventDefault()
      return await axios.post('/auth/login', {
         email,
         password,
      })
   }

   const onSuccessFn = (data: AxiosResponse<ILoginData>) => {
      // https://www.youtube.com/watch?v=ss-_S1Vyxa0&ab_channel=SonnySangha
   }

   const { mutate, isLoading, data } = useMutation({
      mutationKey: ['login'],
      mutationFn: handleLoginSend,
      onSuccess: onSuccessFn,
      onError: (error) => {
         if (isAxiosError(error)) {
            const errorResponse = error.response?.data.errors as IInputValues[]
            console.log(errorResponse)
            errorResponse.map((value) => {
               if (value.param === 'email') {
                  setEmail((prevValues) => {
                     return {
                        ...prevValues,
                        msg: value.msg,
                        isError: true,
                     }
                  })
               } else {
                  setPassword((prevValues) => {
                     return {
                        ...prevValues,
                        msg: value.msg,
                        isError: true,
                     }
                  })
               }
            })
         }
      },
   })

   return {
      loginMutate: mutate,
      isLoading,
      data,
   }
}

export default useLoginMutate
