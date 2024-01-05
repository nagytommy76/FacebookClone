'use client'
import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

import Fade from '@mui/material/Fade'
import Snackbar from '@mui/material/Snackbar'

const LoginSnackbar = () => {
   const [isRegister, setIsRegister] = useState<{ isSuccess: boolean; msg: string | string[] }>({
      isSuccess: false,
      msg: '',
   })
   // const router = useRouter()

   // useEffect(() => {
   //    const { isRegisterSuccess, msg } = router.query
   //    if (isRegisterSuccess && msg) setIsRegister({ isSuccess: Boolean(isRegisterSuccess), msg })
   // }, [router.query.isRegisterSuccess])

   return (
      <Snackbar
         open={isRegister.isSuccess}
         onClose={() => {}}
         TransitionComponent={Fade}
         message={isRegister.msg}
      />
   )
}

export default LoginSnackbar
