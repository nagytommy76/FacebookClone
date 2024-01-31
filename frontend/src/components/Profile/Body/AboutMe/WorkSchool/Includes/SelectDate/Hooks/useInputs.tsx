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

   const setToDefault = () => {
      setCompany(textWithError)
      setPost(textWithError)
      setCity(textWithError)
      setFromDate(undefined)
      setToDate(undefined)
   }

   const addWorkMutation = useAddWork(company, post, city, fromDate, toDate, setToDefault)

   const handleChangeCompany = (event: ChangeEvent<HTMLInputElement>) => {
      setCompany({ ...company, value: event.target.value })
   }
   const handleChangePost = (event: ChangeEvent<HTMLInputElement>) => {
      setPost({ ...post, value: event.target.value })
   }
   const handleChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
      setCity({ ...city, value: event.target.value })
   }

   return {
      company,
      post,
      city,
      setFromDate,
      setToDate,
      handleChangeCompany,
      handleChangeCity,
      handleChangePost,
      addWorkMutation,
   }
}

export default useInputs
