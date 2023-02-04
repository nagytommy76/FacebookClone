import { useState, ChangeEvent } from 'react'
import { GenderTypes, IDateOfBirth, IInputValues, InputValues } from '../Includes/Types'

const useRegisterState = () => {
   const [sureName, setSureName] = useState<IInputValues>(InputValues)
   const [firstName, setFirstName] = useState<IInputValues>(InputValues)
   const [email, setEmail] = useState<IInputValues>(InputValues)
   const [password, setPassword] = useState<IInputValues>(InputValues)
   const [dateOfBirth, setDateOfBirth] = useState<IDateOfBirth>({
      day: '',
      month: '',
      year: '',
   })
   const [gender, setGender] = useState<GenderTypes>('male')

   const setAnyTextStateValues = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setStateName: 'surename' | 'firstname' | 'email' | 'password'
   ) => {
      switch (setStateName) {
         case 'surename':
            setSureName((prevValue) => {
               return { ...prevValue, value: event.target.value }
            })
            break
         case 'firstname':
            setFirstName((prevValue) => {
               return { ...prevValue, value: event.target.value }
            })
            break
         case 'email':
            setEmail((prevValue) => {
               return { ...prevValue, value: event.target.value }
            })
            break
         case 'password':
            setPassword((prevValue) => {
               return { ...prevValue, value: event.target.value }
            })
            break
      }
   }

   return {
      setAnyTextStateValues,
      sureName,
      firstName,
      email,
      password,
      dateOfBirth,
      gender,
      setDateOfBirth,
      setGender,
   }
}

export default useRegisterState
