import { AxiosError, isAxiosError } from 'axios'
import type { Dispatch, SetStateAction } from 'react'
import type { IInputValues } from '../../Register/Includes/Types'
import type { ErrorResponse } from '@/types/AuthTypes'

const useOnError = (
   setEmail: Dispatch<SetStateAction<IInputValues>>,
   setPassword: Dispatch<SetStateAction<IInputValues>>
) => {
   const onErrorFn = (error: AxiosError<{ errors: ErrorResponse }>) => {
      if (isAxiosError(error)) {
         const errorResponse = error.response?.data.errors
         errorResponse?.map((value) => {
            switch (value.path) {
               case 'email':
                  setEmail((prevValues) => {
                     return {
                        ...prevValues,
                        msg: value.msg,
                        isError: true,
                     }
                  })
                  break
               case 'password':
                  setPassword((prevValues) => {
                     return {
                        ...prevValues,
                        msg: value.msg,
                        isError: true,
                     }
                  })
                  break
            }
         })
      }
   }

   return onErrorFn
}

export default useOnError
