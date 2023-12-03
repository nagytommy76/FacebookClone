import { createContext, useMemo, useReducer, useEffect } from 'react'
import AnswerReducer, { IAnswerAction, InitialAnswerState, initialAnswerState } from './AnswerReducer'
import { ICommentAnswers } from '@/src/types/LikeTypes'

interface IAnswerContext {
   answerReducer: InitialAnswerState
   parentRootAnswers: ICommentAnswers[]
   answerDispatch: React.Dispatch<IAnswerAction>
   getAnswerReplies(parentId: string): ICommentAnswers[]
}

export const AnswerContext = createContext<IAnswerContext>({
   answerReducer: {
      singleAnswer: {} as ICommentAnswers,
      commentAnswers: [],
      removedAnswerImageLink: null,
   },
   parentRootAnswers: [],
   answerDispatch: () => {},
   getAnswerReplies: (parentId: string) => {
      return []
   },
})

const AnswerContextProvider: React.FC<{
   children: React.ReactNode
   allCommentAnswers: ICommentAnswers[]
}> = ({ children, allCommentAnswers }) => {
   const [answerReducer, answerDispatch] = useReducer(AnswerReducer, initialAnswerState)

   useEffect(() => {
      answerDispatch({ type: 'SET_ANSWERS', payload: allCommentAnswers })
   }, [allCommentAnswers])

   const getCommentsByParentId = useMemo(() => {
      const grouppedAnswers: any = {}
      answerReducer.commentAnswers.map((answer) => {
         grouppedAnswers[answer.parentCommentId] ||= []
         grouppedAnswers[answer.parentCommentId].push(answer)
      })
      return grouppedAnswers
   }, [answerReducer.commentAnswers])

   function getAnswerReplies(parentId: string): ICommentAnswers[] {
      return getCommentsByParentId[parentId]
   }

   return (
      <AnswerContext.Provider
         value={{
            getAnswerReplies,
            answerDispatch,
            parentRootAnswers: getCommentsByParentId['null'],
            answerReducer,
         }}
      >
         {children}
      </AnswerContext.Provider>
   )
}

export default AnswerContextProvider
