import { useState } from 'react'

const useTabState = () => {
   const [value, setValue] = useState<string>('1')

   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue)
   }
   return { value, handleChange }
}

export default useTabState
