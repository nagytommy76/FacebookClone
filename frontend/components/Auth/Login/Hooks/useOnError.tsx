import { isAxiosError } from 'axios'
import type { Dispatch, SetStateAction } from 'react'
import type { IInputValues } from '../../Register/Includes/Types'

const useOnError = (
   setEmail: Dispatch<SetStateAction<IInputValues>>,
   setPassword: Dispatch<SetStateAction<IInputValues>>
) => {
   const onErrorFn = (error: unknown) => {
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
   }

   return onErrorFn
}

export default useOnError
