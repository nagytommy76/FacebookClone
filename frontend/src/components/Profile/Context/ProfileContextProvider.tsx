import React, { createContext, useState, useEffect } from 'react'
import { IUserPopulatedPosts } from '../../Auth/AuthTypes'
import useGetUserData from '../Hooks/useGetUserData'

interface IProfileContext {
   tabValue: number
   handleTabChange: (event: React.SyntheticEvent, newValue: number) => void
   userData: IUserPopulatedPosts
   setUserData: React.Dispatch<React.SetStateAction<IUserPopulatedPosts>>
   isDataLoading: boolean
   getSelectedProfilePicture: () =>
      | {
           path: string
           isSelected: boolean
        }
      | undefined
}

const userDataObject: IUserPopulatedPosts = {
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
      profilePicturePath: [{ isSelected: false, path: '' }],
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
   getSelectedProfilePicture: () => {
      return { isSelected: false, path: '' }
   },
})

const ProfileContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [tabValue, setTabValue] = useState<number>(0)
   const [userData, setUserData] = useState<IUserPopulatedPosts>(userDataObject)
   const { data, isLoading } = useGetUserData()

   const getSelectedProfilePicture = () => {
      return userData.userDetails.profilePicturePath.find((image) => image.isSelected)
   }
   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
   }
   useEffect(() => {
      if (data) setUserData(data)
   }, [data])

   return (
      <ProfileContext.Provider
         value={{
            userData,
            setUserData,
            handleTabChange,
            tabValue,
            isDataLoading: isLoading,
            getSelectedProfilePicture,
         }}>
         {children}
      </ProfileContext.Provider>
   )
}

export default ProfileContextProvider
