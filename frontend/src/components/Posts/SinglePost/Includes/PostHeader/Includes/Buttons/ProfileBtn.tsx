import Link from 'next/link'
import Button from '@mui/material/Button'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const ProfileBtn: React.FC<{ userId: string }> = ({ userId }) => {
   return (
      <Button fullWidth variant='outlined' color='success' endIcon={<AccountCircleIcon />}>
         <Link href={`/${userId}`}>profilom</Link>
      </Button>
   )
}

export default ProfileBtn
