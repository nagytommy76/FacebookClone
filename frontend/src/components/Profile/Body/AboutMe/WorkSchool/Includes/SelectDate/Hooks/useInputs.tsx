import { ChangeEvent, useState } from 'react'

const useInputs = () => {
   const [company, setCompany] = useState<string>('')
   const [post, setPost] = useState<string>('')
   const [city, setCity] = useState<string>('')
   const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
   const [toDate, setToDate] = useState<Date | undefined>(undefined)

   const handleChangeCompany = (event: ChangeEvent<HTMLInputElement>) => {
      setCompany(event.target.value)
   }
   const handleChangePost = (event: ChangeEvent<HTMLInputElement>) => {
      setPost(event.target.value)
   }
   const handleChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
      setCity(event.target.value)
   }

   return {
      setCity,
      setCompany,
      setPost,
      setFromDate,
      setToDate,
      handleChangeCompany,
      handleChangeCity,
      handleChangePost,
   }
}

export default useInputs
