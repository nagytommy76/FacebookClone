import { produce } from 'immer'
import type { IPostComment } from '@/types/LikeTypes'

type AllCommentsAction = 'SET_COMMENTS' | 'ADD_NEW_COMMENT' | 'REMOVE_SINGLE_COMMENT'

export interface IAllCommentsAction {
   type: AllCommentsAction
   payload: any
}

export interface InitialAllCommentsState {
   AllComments: IPostComment[]
}

export const initialAllCommentsData: IPostComment[] = [
   {
      answeredAt: '',
      comment: 'teszt',
      _id: '',
      likes: [],
      commentAnswers: [],
      commentImage: '',
      userId: {
         _id: '',
         email: '',
         firstName: '',
         sureName: '',
         userDetails: {
            profilePicturePath: [
               {
                  _id: '',
                  isSelected: true,
                  path: 'https://firebasestorage.googleapis.com/v0/b/facebookimagestorage.appspot.com/o/facebook-profile.jpg?alt=media&token=654bab74-a4a3-4eab-8fdb-e7e22f116c9a&_gl=1*55zcu2*_ga*MTIyMDgyODMyOC4xNjgwNjI4NDU2*_ga_CW55HF8NVT*MTY4NjE2MDc5NS4xMC4xLjE2ODYxNjExMjIuMC4wLjA.',
               },
            ],
         },
      },
   },
]

export const initialAllCommentsState: InitialAllCommentsState = {
   AllComments: initialAllCommentsData,
}

export default function AllCommentsReducer(
   state: InitialAllCommentsState,
   { payload, type }: IAllCommentsAction
): InitialAllCommentsState {
   switch (type) {
      case 'SET_COMMENTS':
         const nextComment = produce(state, (draft) => {
            draft.AllComments = payload
         })
         return nextComment
      case 'ADD_NEW_COMMENT':
         const newComments = produce(state, (draft) => {
            draft.AllComments = payload
         })
         return newComments
      case 'REMOVE_SINGLE_COMMENT':
         const removedComments = produce(state, (draft) => {
            draft.AllComments = draft.AllComments.filter((comment) => comment._id !== payload)
         })
         return removedComments
      default:
         return state
   }
}
