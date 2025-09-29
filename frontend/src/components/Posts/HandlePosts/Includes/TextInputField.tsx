import React, { useRef, useEffect } from 'react'

import TextField from '@mui/material/TextField'

const TextInputField: React.FC<{
   textValue: string
   textAreaRef: React.MutableRefObject<HTMLTextAreaElement | undefined>
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ textValue, textAreaRef, onChange }) => {
   useEffect(() => {
      if (textAreaRef.current) {
         textAreaRef.current.focus()
      }
   }, [textAreaRef])

   return (
      <TextField
         sx={{ mt: 1, mb: 2 }}
         inputRef={textAreaRef}
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
