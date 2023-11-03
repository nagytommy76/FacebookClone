import { produce } from 'immer'

export type ImageAction =
   | 'SET_IMAGES'
   | 'SET_UPLOADED_IMAGES'
   | 'REMOVE_SINGLE_IMAGE'
   | 'REMOVE_NEW_SINGLE_IMAGE'

export interface IImageAction {
   type: ImageAction
   payload: string[] | FileList | string
}

export interface InitialImageState {
   //    newUploadedImages: FileList | null
   newUploadedImages: string[] | null
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
            if (action.payload instanceof FileList) {
               let objectUrl: string[] = []
               for (let index = 0; index < action.payload.length; index++) {
                  objectUrl.push(URL.createObjectURL(action.payload[index]))
               }
               draft.newUploadedImages = objectUrl
            } else {
               draft.newUploadedImages = action.payload as string[]
            }
            // draft.newUploadedImages = action.payload as FileList
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
            // const file = Array.from(draft.newUploadedImages).filter(function (image) {
            //    return image != action.payload
            // })
            const mod = draft.newUploadedImages.filter((image) => image != action.payload)
            draft.newUploadedImages = mod
         })
         return removedImage
      default:
         return state
   }
}
