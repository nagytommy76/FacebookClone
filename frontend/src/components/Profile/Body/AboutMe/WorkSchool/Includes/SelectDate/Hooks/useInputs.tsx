import { ChangeEvent, useState } from 'react'
import useAddWork from './useAddWork'
import type { Error } from '../Types'

const textWithError: Error = {
   value: '',
   error: false,
   errorMsg: '',
}

const useInputs = () => {
   const [company, setCompany] = useState<Error>(textWithError)
   const [post, setPost] = useState<Error>(textWithError)
   const [city, setCity] = useState<Error>(textWithError)
   const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
   const [toDate, setToDate] = useState<Date | undefined>(undefined)
   const [endDateChecked, setEndDateChecked] = useState<boolean>(true)

   const setToDefault = () => {
      setCompany(textWithError)
      setPost(textWithError)
      setCity(textWithError)
      setFromDate(undefined)
      setToDate(undefined)
      setEndDateChecked(true)
   }
   const addWorkMutation = useAddWork(company, post, city, fromDate, toDate, endDateChecked, setToDefault)

   const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndDateChecked(event.target.checked)
   }

   const handleChangeCompanyError = () => {}
   const handleChangeCompanyValue = (event: ChangeEvent<HTMLInputElement>) => {
      setCompany({ ...company, value: event.target.value })
   }
   const handleChangePostValue = (event: ChangeEvent<HTMLInputElement>) => {
      setPost({ ...post, value: event.target.value })
   }
   const handleChangeCityValue = (event: ChangeEvent<HTMLInputElement>) => {
      setCity({ ...city, value: event.target.value })
   }

   return {
      company,
      post,
      city,
      endDateChecked,
      setFromDate,
      setToDate,
      handleChangeChecked,
      handleChangeCompanyValue,
      handleChangeCityValue,
      handleChangePostValue,
      addWorkMutation,
   }
}

export default useInputs
