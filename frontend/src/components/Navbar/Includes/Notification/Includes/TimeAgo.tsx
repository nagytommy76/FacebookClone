import Typography from '@mui/material/Typography'
import useMoment from '@/src/hooks/useMoment'

const TimeAgo: React.FC<{ createdAt: string }> = ({ createdAt }) => {
   const currentTime = useMoment(createdAt)

   return (
      <Typography variant='body1' sx={{ color: '#719aeb' }}>
         {currentTime}
      </Typography>
   )
}

export default TimeAgo
