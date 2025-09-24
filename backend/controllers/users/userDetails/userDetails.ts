/// <reference path="../../../src/@types/index.d.ts" />
import { Response, Request } from 'express'
import { User as UserModel } from '../../../models/user/user'
import type { IGetUserDetailsRequest } from '../types/requestTypes'

export const getUserDetailsWithOwnPosts = async (request: IGetUserDetailsRequest, response: Response) => {
   const userId = request.query.userId
   if (!userId) return response.status(404).json({ msg: 'user not found' })
   try {
      const foundUserWithPosts = await UserModel.findById(userId).select([
         'userDetails',
         'sureName',
         'firstName',
         'email',
         'posts',
         'friends',
      ])
      return response.status(200).json(foundUserWithPosts)
   } catch (error) {
      console.log(error)
      response.status(500).json({ error, msg: 'internal server error' })
   }
}

export const getCurrentProfilePictures = async (request: Request, response: Response) => {
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
   const userId = request.user.userId
   const profilePicturePath = request.body.profilePicturePath
   if (!userId) return response.status(404).json({ msg: 'user not found' })
   try {
      const foundUser = await UserModel.findById(userId).select('userDetails.profilePicturePath')
      if (!foundUser) return response.status(404).json({ msg: 'user not found' })
      // Végigmenni mindegyik képen és a selected mezőt false-ra állítani
      foundUser.userDetails.profilePicturePath.map((image) => (image.isSelected = false))
      foundUser.userDetails.profilePicturePath.push({ isSelected: true, path: profilePicturePath })

      await foundUser.save()
      return response.status(200).json({ profilePicturePath: foundUser.userDetails.profilePicturePath })
   } catch (error) {
      response.status(500).json({ error })
   }
}

export const editSelectedProfilePicture = async (request: ISelectedProfilePicRequest, response: Response) => {
   // Ezeket majd egyszerürsíteni kéne
   const userId = request.user.userId
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

export const getCurrentSelectedProfileImage = async (request: Request, response: Response) => {
   // Ezeket majd egyszerürsíteni kéne
   const userId = request.user.userId
   if (!userId) return response.status(404).json({ msg: 'user not found' })
   try {
      const foundUser = await UserModel.findById(userId).select('userDetails.profilePicturePath')
      if (!foundUser) return response.status(404).json({ msg: 'user not found' })
      const selectedProfilePic = foundUser.userDetails.profilePicturePath.find(
         (image) => image.isSelected === true
      )
      response.status(200).json({ currentImage: selectedProfilePic })
   } catch (error) {
      response.status(500).json({ error })
   }
}

interface ISelectedProfilePicRequest extends Request {
   body: {
      modifyId: string
   }
}

interface IProfilePictureRequest extends Request {
   body: {
      profilePicturePath: string
   }
}
