import React from 'react'

const Register = React.lazy(() => import('../../src/components/Auth/Register/Register'))

const index = () => {
   return <Register />
}

export default index
