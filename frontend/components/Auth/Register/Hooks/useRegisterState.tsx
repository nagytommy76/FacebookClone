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
      isError: false,
      msg: '',
   })
   const [gender, setGender] = useState<GenderTypes>('male')

   const setAnyTextStateValues = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setStateName: ParameterType
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

   const setAnyErrorMsg = (value: IInputValues) => {
      switch (value.param) {
         case 'email':
            setEmail((prevValue) => {
               return { ...prevValue, isError: true, msg: value.msg, param: value.param }
            })
            break
         case 'firstName':
            setFirstName((prevValue) => {
               return { ...prevValue, isError: true, msg: value.msg, param: value.param }
            })
            break
         case 'sureName':
            setSureName((prevValue) => {
               return { ...prevValue, isError: true, msg: value.msg, param: value.param }
            })
            break
         case 'password':
            setPassword((prevValue) => {
               return { ...prevValue, isError: true, msg: value.msg, param: value.param }
            })
            break
         case 'dateOfBirth':
            setDateOfBirth((prevValue) => {
               return { ...prevValue, isError: true, msg: value.msg, param: value.param }
            })
            break
      }
   }

   return {
      setAnyTextStateValues,
      setAnyErrorMsg,
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

type ParameterType = 'surename' | 'firstname' | 'email' | 'password'
