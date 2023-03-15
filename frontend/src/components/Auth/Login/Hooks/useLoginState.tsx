import React, { ChangeEvent, useState } from 'react'
import { IInputValues, InputValues } from '../../Register/Includes/Types'

const useLoginState = () => {
   const [email, setEmail] = useState<IInputValues>(InputValues)
   const [password, setPassword] = useState<IInputValues>(InputValues)

   const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) =>
      setEmail((prevValue) => {
         return { ...prevValue, value: event.target.value }
      })
   const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) =>
      setPassword((prevValue) => {
         return { ...prevValue, value: event.target.value }
      })
   return {
      email,
      setEmail,
      password,
      setPassword,
      handleSetEmail,
      handleSetPassword,
   }
}

export default useLoginState
