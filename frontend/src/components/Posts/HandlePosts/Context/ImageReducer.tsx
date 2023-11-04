import { produce } from 'immer'

export type ImageAction =
   | 'SET_IMAGES'
   | 'SET_UPLOADED_IMAGES'
   | 'REMOVE_SINGLE_IMAGE'
   | 'REMOVE_NEW_SINGLE_IMAGE'

export interface IImageAction {
   type: ImageAction
   payload: string[] | File[] | string
}

export interface InitialImageState {
   newUploadedImages: File[] | null
   uploadedImages: string[] | null
}

export const initialSinglePostData = {}

export const initialImageState: InitialImageState = {
   newUploadedImages: null,
   uploadedImages: null,
}

export default function PostsReducer(state: InitialImageState, action: IImageAction): InitialImageState {
   switch (action.type) {
      case 'SET_IMAGES':
         const newImages = produce(state, (draft) => {
            draft.newUploadedImages = action.payload as File[]
         })
         return newImages
      case 'SET_UPLOADED_IMAGES':
         const uploaded = produce(state, (draft) => {
            draft.uploadedImages = action.payload as string[]
         })
         return uploaded
      case 'REMOVE_SINGLE_IMAGE':
         const remove = produce(state, (draft) => {
            if (!draft.uploadedImages) return draft
            const mod = draft.uploadedImages.filter((image) => image != action.payload)
            draft.uploadedImages = mod
         })
         return remove
      case 'REMOVE_NEW_SINGLE_IMAGE':
         const removedImage = produce(state, (draft) => {
            if (!draft.newUploadedImages) return draft
            const file = draft.newUploadedImages.filter((image) => image.name != action.payload)
            draft.newUploadedImages = file
         })
         return removedImage
      default:
         return state
   }
}
