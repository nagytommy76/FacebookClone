import React from 'react'

import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: '20px',
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginLeft: 0,
   width: '100%',
   [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
   },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('lg')]: {
         width: '21ch',
      },
   },
}))

const SearchBar = () => {
   return (
      <Search>
         <SearchIconWrapper>
            <SearchIcon />
         </SearchIconWrapper>
         <StyledInputBase placeholder='Keresés a Facebookon...' inputProps={{ 'aria-label': 'search' }} />
      </Search>
   )
}

export default SearchBar
