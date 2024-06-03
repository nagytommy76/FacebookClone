import { useAppSelector, useAppDispatch } from '@/reduxStore/store'
import { addNewReactionsToMessage } from '@/reduxStore/slices/ChatSlice'
import { socket } from '@/src/utils/socketIo'

import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import type { ILike, LikeTypes } from '@/src/types/LikeTypes'

const useDeleteLike = () => {
   return null
}

export default useDeleteLike
