import { Response } from 'express'
import { User as UserModel } from '../../models/user/user'
import { IJWTUserType } from '../../middlewares/accessTokenRefresh'

export const getUserDetailsWithOwnPosts = async (request: IJWTUserType, response: Response) => {
   const userId = request.user?.userId
   if (!userId) return response.status(404).json({ msg: 'user not found' })
   try {
      const foundUserWithPosts = await UserModel.findById(userId).populate({
         path: 'posts',
         populate: { path: 'userId' },
      })
      return response.status(200).json(foundUserWithPosts)
   } catch (error) {
      response.status(500).json({ error, msg: 'internal server error' })
   }
}

export const getCurrentProfilePictures = async (request: IJWTUserType, response: Response) => {
   const userId = request.user?.userId
   if (!userId) return response.status(404).json({ msg: 'user not found' })
   try {
      const foundUser = await UserModel.findById(userId).select('userDetails.profilePicturePath').lean()
      if (!foundUser) return response.status(404).json({ msg: 'user not found' })
      return response.status(200).json(foundUser.userDetails.profilePicturePath)
   } catch (error) {
      response.status(500).json({ error })
   }
}

export const saveUserProfilePicture = async (request: IProfilePictureRequest, response: Response) => {
   const userId = request.user?.userId
   const profilePicturePath = request.body.profilePicturePath
   if (!userId) return response.status(404).json({ msg: 'user not found' })
   try {
      const foundUser = await UserModel.findById(userId).select('userDetails.profilePicturePath')
      if (!foundUser) return response.status(404).json({ msg: 'user not found' })
      // Végigmenni mindegyik képen és a selected mezőt false-ra állítani
      foundUser.userDetails.profilePicturePath.map((image) => (image.isSelected = false))
      foundUser.userDetails.profilePicturePath.push({ isSelected: true, path: profilePicturePath })

      await foundUser.save()
      return response.status(200).json({ foundUser })
   } catch (error) {
      response.status(500).json({ error })
   }
}

export const editSelectedProfilePicture = async (request: ISelectedProfilePicRequest, response: Response) => {
   // Ezeket majd egyszerürsíteni kéne
   const userId = request.user?.userId
   const modifyId = request.body.modifyId
   if (!userId) return response.status(404).json({ msg: 'user not found' })
   try {
      const foundUser = await UserModel.findById(userId).select('userDetails.profilePicturePath')
      if (!foundUser) return response.status(404).json({ msg: 'user not found' })
      foundUser.userDetails.profilePicturePath.map((image) => {
         if (image._id == modifyId) image.isSelected = true
         else image.isSelected = false
      })
      await foundUser.save()
      response.status(200).json({ profilePicturePath: foundUser.userDetails.profilePicturePath })
   } catch (error) {
      response.status(500).json({ error })
   }
}

interface ISelectedProfilePicRequest extends IJWTUserType {
   body: {
      modifyId: string
   }
}

interface IProfilePictureRequest extends IJWTUserType {
   body: {
      profilePicturePath: string
   }
}
