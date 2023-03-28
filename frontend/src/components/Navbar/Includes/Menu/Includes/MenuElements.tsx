import Link from 'next/link'
import { CustomIconButton } from '../MenuStyle'

import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'

import HomeIcon from '@mui/icons-material/Home'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import Diversity3Icon from '@mui/icons-material/Diversity3'

const MenuElements: React.FC<{ stackDirection: 'column' | 'column-reverse' | 'row' | 'row-reverse' }> = ({
   stackDirection,
}) => {
   return (
      <Stack direction={stackDirection} spacing={1}>
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

export const MobileMenuElement = () => {
   return <MenuElements stackDirection='column' />
}
export const DesktomMenuElement = () => {
   return <MenuElements stackDirection='row' />
}
