import Skeleton from '@mui/material/Skeleton'

const FooterSkeleton = () => {
   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '180px',
            marginTop: 7,
            marginLeft: 8,
         }}
      >
         <Skeleton variant='text' width={50} height={20} />
         <Skeleton variant='text' width={50} height={20} />
         <Skeleton variant='text' width={50} height={20} />
      </div>
   )
}

export default FooterSkeleton
