import { styled } from '@mui/material'

// Body section -----------------
export const BodyDescriptionSection = styled('div')({ padding: '.6rem 1rem' })

// "Footer" section

export const ButtonGroupStyle = styled('div')({
   display: 'flex',
   flexDirection: 'row',
   gap: '2px',
})

export const FooterSectionStyle = styled('footer')({
   width: '100%',
   padding: '1rem 1rem .5rem 1rem',
})

export const LikeAndCommentContainer = styled('div')({
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
})

export const CommentsParagraph = styled('p')({
   transition: 'all .3s ease',
   cursor: 'pointer',
   '&:hover': {
      textDecoration: 'underline',
   },
})
