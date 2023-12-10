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
      // console.log(grouppedAnswers)
      return grouppedAnswers
   }, [answerReducer.commentAnswers])

   function getAnswerReplies(parentId: string): ICommentAnswers[] {
      return getCommentsByParentId[parentId]
   }
   const getAllChildRepliesToDelete = (toDeleteAnswerId: string) => {
      if (getCommentsByParentId[toDeleteAnswerId] !== undefined) {
         // Ezzel így megkapom azt amit törölni szeretnék, majd megnézem,
         // hogy az answer._id (a trölendő) benne van-e a getCommentsByParentId[parentId]
         let toDeleteIds: string[] = []
         for (const answer of Object.values(getCommentsByParentId[toDeleteAnswerId])) {
            toDeleteIds.push(answer._id)
            let toWatchAnswerId: string = ''
            // if (getCommentsByParentId[answer._id] !== undefined)
            //    for (const childAnswer of Object.values(getCommentsByParentId[answer._id])) {
            //       console.log(childAnswer)
            //       toDeleteIds.push(childAnswer._id)
            //    }
            // console.log(`${answerId}: ${answer}`)
         }
         // let toWatchAnswerId: string | null = toDeleteAnswerId
         // while (toWatchAnswerId !== null) {
         //    for (const answer of Object.values(getCommentsByParentId[toWatchAnswerId])) {
         //       toDeleteIds.push(answer._id)

         //       // console.log(answer)
         //       toWatchAnswerId = answer._id
         //       // console.log(toWatchAnswerId)
         //    }
         //    toWatchAnswerId = null
         // }
      }
   }
   console.log(getCommentsByParentId)
   getAllChildRepliesToDelete('65102dcb9f91c84b6d20f47c')

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
