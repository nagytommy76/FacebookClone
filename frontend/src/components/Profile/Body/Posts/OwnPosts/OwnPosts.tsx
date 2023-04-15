import React from 'react'
import { axiosInstance as axios } from '../../../../../utils/axiosSetup/AxiosInstance'

import { useQuery } from '@tanstack/react-query'

const OwnPosts = () => {
   const { data } = useQuery({
      queryKey: ['posts'],
      queryFn: async () => {
         return await axios.get('/post/get-own-post')
      },
   })
   return (
      <div>
         <h1>Itt lesznek az én saját posztjaim</h1>
      </div>
   )
}

export default OwnPosts
