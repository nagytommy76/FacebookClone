import React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import MaterialUISwitch from './CustomSwitch'
import { useAppDispatch, useAppSelector } from '../../../utils/redux/store'
import { setTheme } from '../../../utils/redux/slices/ThemeSlice'

const ThemeSwitch = () => {
   const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme)
   const dispatch = useAppDispatch()

   const handleToggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTheme(event.target.checked))
   }

   return (
      <FormGroup>
         <FormControlLabel
            control={<MaterialUISwitch onChange={handleToggleTheme} checked={isDarkTheme} sx={{ m: 1 }} />}
            label=''
         />
      </FormGroup>
   )
}

export default ThemeSwitch
