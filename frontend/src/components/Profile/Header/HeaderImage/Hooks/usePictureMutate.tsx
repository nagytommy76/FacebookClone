import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '../../../../../utils/axiosSetup/AxiosInstance'

const usePictureMutate = () => {
   const mutation = useMutation({
      mutationFn: (profilePicturePath: string) => {
         return axios.post('/user/save-profile-picture', { profilePicturePath })
      },
   })
   return mutation.mutate
}

export default usePictureMutate
