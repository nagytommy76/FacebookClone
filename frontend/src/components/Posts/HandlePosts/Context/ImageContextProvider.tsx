import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import ImageReducer, { IImageAction, InitialImageState, initialImageState } from './ImageReducer'

interface IImageContext {
   imageDispatch: React.Dispatch<IImageAction>
   imageReducer: InitialImageState
}

export const ImageContext = createContext<IImageContext>({
   imageDispatch: () => {},
   imageReducer: {
      newUploadedImages: initialImageState.newUploadedImages,
      uploadedImages: initialImageState.uploadedImages,
   },
})

const ImageContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const {
      postsReducer: {
         singlePost: { postedPicturesPath },
      },
   } = useContext(PostContext)
   const [imageReducer, imageDispatch] = useReducer(ImageReducer, initialImageState)

   useEffect(() => {
      if (postedPicturesPath) imageDispatch({ type: 'SET_UPLOADED_IMAGES', payload: postedPicturesPath })
   }, [postedPicturesPath])

   return (
      <ImageContext.Provider
         value={{
            imageDispatch,
            imageReducer,
         }}
      >
         {children}
      </ImageContext.Provider>
   )
}

export default ImageContextProvider
