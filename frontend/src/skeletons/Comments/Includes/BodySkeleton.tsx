import Skeleton from '@mui/material/Skeleton'

function getRandomHeight(min: number, max: number) {
   min = Math.ceil(min)
   max = Math.floor(max)
   return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

const BodySkeleton = () => {
   return (
      <Skeleton variant='rounded' width={'95%'} height={getRandomHeight(40, 150)} sx={{ marginLeft: 1 }} />
   )
}

export default BodySkeleton
