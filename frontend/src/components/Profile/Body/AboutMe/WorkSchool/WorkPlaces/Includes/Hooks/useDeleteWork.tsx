import { useContext } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { ProfileContext } from '@/src/components/Profile/Context/ProfileContextProvider'

const useDeleteWork = (
   handleOpenDialog: () => void,
   handleClose: () => void,
   handleCloseDialog: () => void,
   workId: string
) => {
   const params = useParams() as { userId: string }
   const { profileDispatch } = useContext(ProfileContext)

   const deleteMutationFn = async () => {
      return await axios.put(
         '/user/remove-work',
         { workId },
         {
            params: {
               userToModify: params.userId,
            },
         }
      )
   }

   const { mutate } = useMutation({
      mutationKey: ['removeSingleWork'],
      mutationFn: deleteMutationFn,
      onSuccess: () => {
         handleClose()
         handleCloseDialog()
         profileDispatch({ type: 'REMOVE_SINGLEWORK', payload: workId })
      },
   })

   const handleOpenConfirm = () => {
      handleClose()
      handleOpenDialog()
   }

   const handleRemoveWorkMutate = () => {
      mutate()
   }
   return { handleRemoveWorkMutate, handleOpenConfirm }
}

export default useDeleteWork
