'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

const LoginSnackbar = () => {
   const params = useSearchParams()
   const [isRegister, setIsRegister] = useState<{ isSuccess: boolean; msg: string | string[] }>({
      isSuccess: false,
      msg: '',
   })

   useEffect(() => {
      const isSearchSuccess = params.get('isRegisterSuccess')
      if (isSearchSuccess)
         setIsRegister({
            isSuccess: Boolean(isSearchSuccess),
            msg: 'A regisztráció sikeres volt, kérlek jelentkezz be',
         })
   }, [params])

   return (
      <Snackbar
         open={isRegister.isSuccess}
         onClose={() => setIsRegister({ isSuccess: false, msg: '' })}
         autoHideDuration={60000}
         message={isRegister.msg}
         TransitionComponent={Slide}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
   )
}

export default LoginSnackbar
