import Link from 'next/link'
import { useAppDispatch } from '@/reduxStore/store'
import { setChatModalOpen } from '@/reduxStore/slices/ChatSlice'

import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

const NameLink: React.FC<{ fullName: string; chatFirendId: string }> = ({ chatFirendId, fullName }) => {
   const dispatch = useAppDispatch()
   return (
      <Tooltip arrow title={`Ugrás ${fullName} profil oldalára`}>
         <Link onClick={() => dispatch(setChatModalOpen(false))} href={`/${chatFirendId}`}>
            <Typography variant='h6'>{fullName}</Typography>
         </Link>
      </Tooltip>
   )
}

export default NameLink
