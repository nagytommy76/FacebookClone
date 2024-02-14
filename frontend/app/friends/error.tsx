'use client'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
   return (
      <section
         style={{
            minHeight: '90vh',
            maxWidth: '75%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
         }}
      >
         <Typography mb={5} align='center' variant='h1'>
            Sajnos hiba történt! Próbálkozz újra!
         </Typography>
         <Typography mb={5} align='center' variant='h4'>
            {error.message}
         </Typography>
         <Button sx={{ width: '180px' }} variant='contained' color='error' onClick={() => reset()}>
            Próbáld újra
         </Button>
      </section>
   )
}
