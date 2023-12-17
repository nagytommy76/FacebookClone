import React, { createContext, useState, useEffect, useReducer } from 'react'
import useGetUserData from '../Hooks/useGetUserData'

import UserDetailsReducer, { initialProfileState, InitialState, IBaseListAction } from './ProfileReducer'
import type { IProfilePicture } from '@/types/PostTypes'

interface IProfileContext {
   profileReducer: InitialState
   profileDispatch: React.Dispatch<IBaseListAction>
   tabValue: number
   handleTabChange: (event: React.SyntheticEvent, newValue: number) => void
   isDataLoading: boolean
   selectSelectedProfilePicture: () => IProfilePicture | undefined
}

export const ProfileContext = createContext<IProfileContext>({
   profileReducer: initialProfileState,
   profileDispatch: () => {},
   handleTabChange: () => {},
   selectSelectedProfilePicture: () => undefined,
   tabValue: 0,
   isDataLoading: true,
})

const ProfileContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [profileReducer, profileDispatch] = useReducer(UserDetailsReducer, initialProfileState)
   const [tabValue, setTabValue] = useState<number>(0)
   const { data, isLoading } = useGetUserData()

   const selectSelectedProfilePicture = (): IProfilePicture | undefined => {
      return profileReducer.initialUserDataState.userDetails?.profilePicturePath.find(
         (image) => image.isSelected
      )
   }

   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
   }

   useEffect(() => {
      if (data) {
         profileDispatch({ payload: data, type: 'SET_INITIAL_USER_DATA' })
      }
   }, [data])

   return (
      <ProfileContext.Provider
         value={{
            profileDispatch,
            profileReducer,
            selectSelectedProfilePicture,
            handleTabChange,
            tabValue,
            isDataLoading: isLoading,
         }}
      >
         {children}
      </ProfileContext.Provider>
   )
}

export default ProfileContextProvider
