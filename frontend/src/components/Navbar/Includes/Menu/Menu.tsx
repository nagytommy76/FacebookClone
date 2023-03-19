import Link from 'next/link'

import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import HomeIcon from '@mui/icons-material/Home'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import Diversity3Icon from '@mui/icons-material/Diversity3'

const CustomIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
   width: 100,
   borderRadius: 10,
   color: theme.palette.warning.main,
}))

const Menu = () => {
   return (
      <Stack direction='row' spacing={1}>
         <Tooltip title='Főoldal'>
            <Link href='/'>
               <CustomIconButton aria-label='home' size='large'>
                  <HomeIcon fontSize='inherit' />
               </CustomIconButton>
            </Link>
         </Tooltip>
         <Tooltip title='Ismerős'>
            <Link href='/friends'>
               <CustomIconButton aria-label='friends' size='large'>
                  <PeopleAltIcon fontSize='inherit' />
               </CustomIconButton>
            </Link>
         </Tooltip>
         <Tooltip title='Csoportok'>
            <Link href='/groups'>
               <CustomIconButton aria-label='groups' size='large'>
                  <Diversity3Icon fontSize='inherit' />
               </CustomIconButton>
            </Link>
         </Tooltip>
      </Stack>
   )
}

export default Menu
