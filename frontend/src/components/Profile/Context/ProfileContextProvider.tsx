import React, { createContext, useState, useEffect } from 'react'
import { IUserPopulatedPosts } from '../../Auth/AuthTypes'
import useGetUserData from '../Hooks/useGetUserData'

interface IProfileContext {
   tabValue: number
   handleTabChange: (event: React.SyntheticEvent, newValue: number) => void
   userData: IUserPopulatedPosts
   setUserData: React.Dispatch<React.SetStateAction<IUserPopulatedPosts>>
   isDataLoading: boolean
}

const userDataObject = {
   _id: '',
   createdAt: 0,
   email: '',
   firstName: '',
   friends: [{ userId: '' }],
   isEmailConfirmed: false,
   password: '',
   posts: [],
   sureName: '',
   updatedAt: 0,
   userDetails: {
      birthTown: '',
      dateOfBirth: { day: 0, month: 0, year: 0 },
      gender: 'female',
      homeTown: '',
      profilePicturePath: '',
      relationShip: { inRelation: false, isAlone: true },
      studies: {
         elementary: { from: 2000, name: '', to: 2000 },
         highSchool: { from: 2000, name: '', to: 2000 },
         university: { from: 2000, name: '', to: 2000 },
      },
      workPlaces: [{ city: '', companyName: '', from: 2000, post: '', to: 2000 }],
   },
}

export const ProfileContext = createContext<IProfileContext>({
   userData: userDataObject,
   setUserData: () => {},
   handleTabChange: () => {},
   tabValue: 0,
   isDataLoading: true,
})

const ProfileContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [tabValue, setTabValue] = useState<number>(0)
   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
   }
   const [userData, setUserData] = useState<IUserPopulatedPosts>(userDataObject)
   const { data, isLoading } = useGetUserData()

   useEffect(() => {
      if (data) setUserData(data)
   }, [data])

   return (
      <ProfileContext.Provider
         value={{ userData, setUserData, handleTabChange, tabValue, isDataLoading: isLoading }}>
         {children}
      </ProfileContext.Provider>
   )
}

export default ProfileContextProvider
