import React from 'react'

const Register = React.lazy(() => import('../../components/Auth/Register/Register'))

const index = () => {
   return <Register />
}

export default index
