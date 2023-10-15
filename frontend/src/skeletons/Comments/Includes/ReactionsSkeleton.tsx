import Skeleton from '@mui/material/Skeleton'

const ReactionsSkeleton = () => {
   return (
      <Skeleton
         variant='rounded'
         width={50}
         height={18}
         sx={{ position: 'absolute', right: 0, bottom: -10 }}
      />
   )
}

export default ReactionsSkeleton
