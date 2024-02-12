import { ChangeEvent, useState } from 'react'
import useAddWork from './useAddWork'
import type { Error, DateError } from '../SelectDate/Types'
import type { ErrorResponse } from '@/types/AuthTypes'

const textWithError: Error = {
   value: '',
   error: false,
   errorMsg: '',
}

const dateWithError: DateError = {
   error: false,
   errorMsg: '',
   value: undefined,
}

const useInputs = () => {
   const [company, setCompany] = useState<Error>(textWithError)
   const [post, setPost] = useState<Error>(textWithError)
   const [city, setCity] = useState<Error>(textWithError)
   const [description, setDescription] = useState<string>('')
   const [fromDate, setFromDate] = useState<DateError>(dateWithError)
   const [toDate, setToDate] = useState<DateError>(dateWithError)
   const [endDateChecked, setEndDateChecked] = useState<boolean>(true)

   const setToDefault = () => {
      setCompany(textWithError)
      setPost(textWithError)
      setCity(textWithError)
      setDescription('')
      setFromDate(dateWithError)
      setToDate(dateWithError)
      setEndDateChecked(true)
   }

   const handleChangeErrors = (errorResponseArray: ErrorResponse) => {
      errorResponseArray.map((errorResponse) => {
         switch (errorResponse.path) {
            case 'city':
               setCity({ ...city, error: true, errorMsg: errorResponse.msg })
               break
            case 'company':
               setCompany({ ...company, error: true, errorMsg: errorResponse.msg })
               break
            case 'post':
               setPost({ ...post, error: true, errorMsg: errorResponse.msg })
               break
            case 'fromDate':
               setFromDate({ ...fromDate, error: true, errorMsg: errorResponse.msg })
               break
         }
      })
   }
   const addWorkMutation = useAddWork(
      company,
      post,
      city,
      description,
      fromDate,
      toDate,
      endDateChecked,
      setToDefault,
      handleChangeErrors
   )

   const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndDateChecked(event.target.checked)
   }

   const handleSetDescription = (event: ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value)
   }

   const handleChangeCompanyValue = (event: ChangeEvent<HTMLInputElement>) => {
      setCompany({ ...company, value: event.target.value })
      if (event.target.value.length >= 3)
         setCompany({ error: false, errorMsg: '', value: event.target.value })
   }
   const handleChangePostValue = (event: ChangeEvent<HTMLInputElement>) => {
      setPost({ ...post, value: event.target.value })
      if (event.target.value.length >= 3) setPost({ error: false, errorMsg: '', value: event.target.value })
   }
   const handleChangeCityValue = (event: ChangeEvent<HTMLInputElement>) => {
      setCity({ ...city, value: event.target.value })
      if (event.target.value.length >= 2) setCity({ error: false, errorMsg: '', value: event.target.value })
   }

   return {
      company,
      post,
      city,
      description,
      endDateChecked,
      fromDate,
      toDate,
      setFromDate,
      setToDate,
      handleSetDescription,
      handleChangeChecked,
      handleChangeCompanyValue,
      handleChangeCityValue,
      handleChangePostValue,
      addWorkMutation,
   }
}

export default useInputs
