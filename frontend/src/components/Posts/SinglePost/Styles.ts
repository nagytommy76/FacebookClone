import { styled } from '@mui/material'
import Image from 'next/image'

export const StyledImageGridContainer = styled('section')({
   width: '100%',
   display: 'grid',
   gridTemplateColumns: 'auto auto auto',
   gap: '2px',
})

// Body section -----------------
export const BodyDescriptionSection = styled('div')({ padding: '.6rem 1rem' })

export const FirstGridImage = styled(Image)({
   objectFit: 'cover',
   gridColumnStart: 1,
   gridColumnEnd: 4,
   width: '100%',
})

export const StyledImage = styled(Image)({
   objectFit: 'cover',
   width: '100%',
   height: '250px',
})

// "Footer" section

export const FooterSectionStyle = styled('footer')({
   width: '100%',
   padding: '1rem 1rem .5rem 1rem',
})
