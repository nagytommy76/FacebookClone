import { createContext, useMemo, useReducer, useEffect } from 'react'
import AnswerReducer, { IAnswerAction, InitialAnswerState, initialAnswerState } from './AnswersReducer'
import { ICommentAnswers } from '@/src/types/LikeTypes'

interface IAnswerContext {
   answerReducer: InitialAnswerState
   parentRootAnswers: ICommentAnswers[]
   answerDispatch: React.Dispatch<IAnswerAction>
   getAnswerReplies(parentId: string): ICommentAnswers[]
   getAnswerImageById: (answerId: string) => string | null | undefined
   // getAnswersChildAnswers: (answerId: string) => ICommentAnswers[] | null
}

export const AnswerContext = createContext<IAnswerContext>({
   answerReducer: {
      singleAnswer: {} as ICommentAnswers,
      commentAnswers: [],
      removedAnswerImageLink: null,
      commentId: '',
      postId: '',
   },
   parentRootAnswers: [],
   answerDispatch: () => {},
   getAnswerImageById: () => {
      return null
   },
   // getAnswersChildAnswers: (answerId: string) => {
   //    return null
   // },
   getAnswerReplies: (parentId: string) => {
      return []
   },
})

const AnswersContextProvider: React.FC<{
   children: React.ReactNode
   postId: string
   commentId: string
   allCommentAnswers: ICommentAnswers[]
}> = ({ children, commentId, postId, allCommentAnswers }) => {
   const [answerReducer, answerDispatch] = useReducer(AnswerReducer, initialAnswerState)

   useEffect(() => {
      answerDispatch({ type: 'SET_POST_ID', payload: postId })
      answerDispatch({ type: 'SET_COMMENT_ID', payload: commentId })
   }, [commentId, postId])
   useEffect(() => {
      answerDispatch({ type: 'SET_ANSWERS', payload: allCommentAnswers })
   }, [allCommentAnswers])

   const getCommentsByParentId = useMemo(() => {
      const grouppedAnswers: { [index: string]: ICommentAnswers[] } = {}
      answerReducer.commentAnswers.map((answer) => {
         grouppedAnswers[answer.parentCommentId] ||= []
         grouppedAnswers[answer.parentCommentId].push(answer)
      })
      return grouppedAnswers
   }, [answerReducer.commentAnswers])

   function getAnswerReplies(parentId: string): ICommentAnswers[] {
      return getCommentsByParentId[parentId]
   }

   // Végigmegyek a 65102dcb9f91c84b6d20f47c-n, majd ezekből ki kell gíyűjtenem az id-kat,
   // és azokkal ellenőrizni getCommentsByParentId[id],
   // Ha ez undefined vége,
   // Ha nem undefined akkor van még childComment -> azoknak az ID-jét is begyűjteni majd azokon is végigmenni és így tovább....

   const test = () => {}

   const getAllChildRepliesToDelete = (toDeleteAnswerId: string) => {
      if (getCommentsByParentId[toDeleteAnswerId] !== undefined) {
         // Ezzel így megkapom azt amit törölni szeretnék, majd megnézem,
         // hogy az answer._id (a trölendő) benne van-e a getCommentsByParentId[parentId]
         let toDeleteIds: string[] = []
         let hasChildCommentIds: string[] = []
         for (const answer of Object.values(getCommentsByParentId[toDeleteAnswerId])) {
            toDeleteIds.push(answer._id)
            let toWatchAnswerId: string = ''

            if (getCommentsByParentId[answer._id] !== undefined) {
               hasChildCommentIds.push(answer._id)
               // Ebben az esetben nincs child -> uccsó a comment ágon
            }
         }
         // console.log(hasChildCommentIds)
         // let isWhileRun = true
         // while (isWhileRun) {
         //    let newchildCommentIds: string[] = []
         //    for (const commentId of hasChildCommentIds) {
         //       for (const answer of Object.values(getCommentsByParentId[commentId])) {
         //          if (getCommentsByParentId[answer._id] !== undefined) {
         //             newchildCommentIds.push(commentId)
         //          }
         //          console.log(answer)
         //       }
         //       toDeleteIds.push(commentId)
         //       // console.log(newchildCommentIds)
         //    }
         //    hasChildCommentIds = []

         //    isWhileRun = false
         // }
      }
   }
   // console.log(getCommentsByParentId['jolsdflks'])
   // console.log(getCommentsByParentId)
   // getAllChildRepliesToDelete('65102dcb9f91c84b6d20f47c')

   const getAnswerImageById = (answerId: string) => {
      return answerReducer.commentAnswers.find((answer) => answer._id === answerId)?.commentImage
   }

   return (
      <AnswerContext.Provider
         value={{
            getAnswerReplies,
            answerDispatch,
            getAnswerImageById,
            // getAnswersChildAnswers,
            parentRootAnswers: getCommentsByParentId['null'],
            answerReducer,
         }}
      >
         {children}
      </AnswerContext.Provider>
   )
}

export default AnswersContextProvider
