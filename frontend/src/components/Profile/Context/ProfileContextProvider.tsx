import React, { createContext, useState, useEffect, useReducer } from 'react'
import useGetUserData from '../Hooks/useGetUserData'

import UserDetailsReducer, { initialProfileState, InitialState, IBaseListAction } from './ProfileReducer'

interface IProfileContext {
   profileReducer: InitialState
   profileDispatch: React.Dispatch<IBaseListAction>
   tabValue: number
   handleTabChange: (event: React.SyntheticEvent, newValue: number) => void
   isDataLoading: boolean
}

export const ProfileContext = createContext<IProfileContext>({
   profileReducer: initialProfileState,
   profileDispatch: () => {},
   handleTabChange: () => {},
   tabValue: 0,
   isDataLoading: true,
})

const ProfileContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [profileReducer, profileDispatch] = useReducer(UserDetailsReducer, initialProfileState)
   const [tabValue, setTabValue] = useState<number>(0)
   const { data, isLoading } = useGetUserData()

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
