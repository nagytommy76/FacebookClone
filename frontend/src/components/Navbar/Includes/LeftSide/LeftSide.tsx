import Image from 'next/image'
import Link from 'next/link'
import { styled } from '@mui/material'

import SearchBar from '../SearchBar/SearchBar'
import FacebookIcon from '../../../../../public/facebook-96.svg'

const StyledContainer = styled('div')({
   width: '250px',
   display: 'flex',
   alignItems: 'center',
})

const LeftSide = () => {
   return (
      <StyledContainer>
         <Link href='/'>
            <Image src={FacebookIcon} alt='facebook icon' width={50} height={50} />
         </Link>
         <SearchBar />
      </StyledContainer>
   )
}

export default LeftSide
