import useAnswerCreateMutate from './useAnswerCreateMutate'
import useUpdateCommentMutate from './useUpdateCommentMutate'
import useUpdateAnswer from './useUpdateAnswer'
import useAnswerAndComment from './useAnswerAndComment'

const useAnswer = (commentDepth: number, parentCommentId: string) => {
   const {
      isSendDisabled,
      imagePath,
      reference,
      isUpdate,
      isError,
      isOpen,
      text,
      setIsError,
      setIsUpdate,
      setImagePath,
      handleSetOpen,
      handleChangeText,
      setStatesToDefault,
      handleSetOpenForUpdate,
      handleChangeTextWithEmoji,
   } = useAnswerAndComment()
   // A többi mutation-hoz is hozzáadni az error snackbar-t. Esetleg vezényleni a szöveget is!!!!!!!!!!!!!!!!!!!!!!!!
   const updateCommentMutate = useUpdateCommentMutate(text, imagePath, setStatesToDefault, setIsError)
   const updateCommentAnswerMutate = useUpdateAnswer(
      text,
      imagePath,
      parentCommentId,
      setStatesToDefault,
      setIsError
   )
   const saveAnswerMutate = useAnswerCreateMutate(
      imagePath,
      commentDepth,
      parentCommentId,
      text,
      setStatesToDefault
   )
   // ezt használom a válasz kinyitására és beállítom default-ra, pl ha a módosítás után nyomom meg
   const handleSetAnswerOpen = () => {
      setStatesToDefault()
      handleSetOpen()
   }

   const handleUpdateCommentAnswerMutate = () => {
      updateCommentAnswerMutate()
      setIsUpdate(true)
   }

   return {
      saveAnswerMutate,
      updateCommentMutate,
      handleUpdateCommentAnswerMutate,
      handleChangeText,
      handleSetOpenForUpdate,
      handleChangeTextWithEmoji,
      handleSetAnswerOpen,
      setImagePath,
      handleSetOpen,
      imagePath,
      isOpen,
      text,
      isSendDisabled,
      isUpdate,
      isError,
      reference,
   }
}

export default useAnswer
