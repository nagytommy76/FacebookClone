import React, { createContext, useState, useEffect } from 'react'
import { IUserPopulatedPosts } from '../../Auth/AuthTypes'
import useGetUserData from '../Hooks/useGetUserData'

interface IProfileContext {
   userData: IUserPopulatedPosts
   setUserData: React.Dispatch<React.SetStateAction<IUserPopulatedPosts>>
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
})

const ProfileContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [userData, setUserData] = useState<IUserPopulatedPosts>(userDataObject)
   const { data, isError } = useGetUserData()

   useEffect(() => {
      if (data) setUserData(data)
      console.log(data)
   }, [data])

   return <ProfileContext.Provider value={{ userData, setUserData }}>{children}</ProfileContext.Provider>
}

export default ProfileContextProvider
