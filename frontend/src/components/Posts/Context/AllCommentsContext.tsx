import { createContext, useReducer } from 'react'
import AllCommentsReducer, {
   InitialAllCommentsState,
   IAllCommentsAction,
   initialAllCommentsData,
   initialAllCommentsState,
} from './AllCommentsReducer'

interface ICommentContext {
   commentsReducer: InitialAllCommentsState
   commentsDispatch: React.Dispatch<IAllCommentsAction>
}

export const AllCommentsContext = createContext<ICommentContext>({
   commentsReducer: { AllComments: initialAllCommentsData },
   commentsDispatch: () => {},
})

const AllCommentContextProvider: React.FC<{
   children: React.ReactNode
}> = ({ children }) => {
   const [commentsReducer, commentsDispatch] = useReducer(AllCommentsReducer, initialAllCommentsState)
   return (
      <AllCommentsContext.Provider value={{ commentsDispatch, commentsReducer }}>
         {children}
      </AllCommentsContext.Provider>
   )
}

export default AllCommentContextProvider
