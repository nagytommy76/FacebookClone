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

   const setValueCallback = (prevValue: IInputValues, value: string) => {
      return { ...prevValue, value }
   }

   const setErrorValueCallback = (prevValue: IInputValues, isError: boolean, param: string, msg: string) => {
      return { ...prevValue, isError, msg, param }
   }

   const setAnyTextStateValues = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setStateName: ParameterType
   ) => {
      switch (setStateName) {
         case 'surename':
            setSureName((prevValue) => setValueCallback(prevValue, event.target.value))
            break
         case 'firstname':
            setFirstName((prevValue) => setValueCallback(prevValue, event.target.value))
            break
         case 'email':
            setEmail((prevValue) => setValueCallback(prevValue, event.target.value))
            break
         case 'password':
            setPassword((prevValue) => setValueCallback(prevValue, event.target.value))
            break
      }
   }

   const setAnyErrorMsg = (value: IInputValues, isError: boolean = true) => {
      switch (value.param) {
         case 'email':
            setEmail((prevValue) => setErrorValueCallback(prevValue, isError, value.param, value.msg))
            break
         case 'firstName':
            setFirstName((prevValue) => setErrorValueCallback(prevValue, isError, value.param, value.msg))
            break
         case 'sureName':
            setSureName((prevValue) => setErrorValueCallback(prevValue, isError, value.param, value.msg))
            break
         case 'password':
            setPassword((prevValue) => setErrorValueCallback(prevValue, isError, value.param, value.msg))
            break
         case 'dateOfBirth':
            setDateOfBirth((prevValue) => {
               return { ...prevValue, isError, msg: value.msg, param: value.param }
            })
            break
      }
   }

   const resetAllErrors = () => {
      const params = ['email', 'firstName', 'sureName', 'password', 'dateOfBirth']
      params.map((param) => {
         setAnyErrorMsg({ msg: '', isError: false, param, value: '' }, false)
      })
      setDateOfBirth((prevValue) => {
         return { ...prevValue, isError: false, msg: '', param: '' }
      })
   }

   return {
      setAnyTextStateValues,
      setAnyErrorMsg,
      resetAllErrors,
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
