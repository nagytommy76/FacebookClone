'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
/**
 * @returns isUrlChanged
 * @type boolean
 * @summary Check if the user on the main page or on its own and reloads the posts
 */
const useCheckUrl = () => {
   const router = useRouter()
   const [isUrlChanged, setIsUrlChanged] = useState<boolean>(false)

   useEffect(() => {
      setIsUrlChanged(true)
   }, [router])

   return isUrlChanged
}

export default useCheckUrl
