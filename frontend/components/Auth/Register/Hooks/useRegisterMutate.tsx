import useRegisterState from './useRegisterState'

import { useMutation } from '@tanstack/react-query'
import { isAxiosError, axiosInstance as axios } from '../../../../axiosSetup/AxiosInstance'
import { IInputValues } from '../Includes/Types'

const useRegisterMutate = () => {
   const {
      dateOfBirth,
      email,
      firstName,
      gender,
      password,
      sureName,
      setDateOfBirth,
      setGender,
      setAnyTextStateValues,
   } = useRegisterState()

   const handleRegisterSend = async () => {
      return await axios.post('/auth/register', {
         sureName,
         firstName,
         email,
         password,
         dateOfBirth,
         gender,
      })
   }

   const { mutate } = useMutation({
      mutationKey: ['register'],
      mutationFn: handleRegisterSend,
      onError(error) {
         if (isAxiosError(error)) {
            const errorResponse = error.response?.data.errors as IInputValues[]
            console.log(errorResponse)
            errorResponse.map((value) => {
               switch (value.param) {
                  case 'email':
                  //  setEmail((prevValue) => {
                  //     return { ...prevValue, isError: true, msg: value.msg, param: value.param }
                  //  })
                  //  break
               }
            })
         }
      },
   })

   return {
      registerMutate: mutate,
      dateOfBirth,
      email,
      firstName,
      gender,
      password,
      sureName,
      setAnyTextStateValues,
      setDateOfBirth,
      setGender,
   }
}

export default useRegisterMutate
