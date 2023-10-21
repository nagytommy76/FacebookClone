import Skeleton from '@mui/material/Skeleton'
import { StyledPostHeadSkeleton, StyledFlexContainer } from './Style'

const PostHeader: React.FC<{ asStandalone?: boolean }> = ({ asStandalone = false }) => {
   return (
      <StyledPostHeadSkeleton
         sx={{ margin: `${asStandalone ? '1rem 0' : '0'}`, p: `${asStandalone ? '1rem' : '0'}` }}
      >
         <StyledFlexContainer>
            <Skeleton variant='circular' width={50} height={50} />
            <span>
               <Skeleton animation='wave' height={20} width={180} />
               <Skeleton animation='wave' height={20} width={180} />
            </span>
         </StyledFlexContainer>
      </StyledPostHeadSkeleton>
   )
}

export default PostHeader
