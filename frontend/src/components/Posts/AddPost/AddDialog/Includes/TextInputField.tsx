import React from 'react'

import TextField from '@mui/material/TextField'

const TextInputField: React.FC<{
   textValue: string
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ textValue, onChange }) => {
   return (
      <TextField
         sx={{ mt: 1, mb: 2 }}
         id='outlined-post-input'
         value={textValue}
         onChange={onChange}
         autoFocus
         variant='standard'
         fullWidth
         multiline
         rows={6}
         placeholder='Mi jár a fejedben?'
      />
   )
}

export default TextInputField
