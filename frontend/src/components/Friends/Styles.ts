export const gridBoxSx = {
   display: 'grid',
   gridTemplateColumns: 'auto auto auto',
   justifyContent: 'center',
   gap: '20px',

   ['@media(max-width: 960px)']: {
      gridTemplateColumns: 'auto auto',
   },
   ['@media(max-width: 630px)']: {
      gridTemplateColumns: 'auto',
   },
}

export const containerSx = {
   minHeight: '90vh',
   maxWidth: '75%',
   margin: '2rem auto',
}
