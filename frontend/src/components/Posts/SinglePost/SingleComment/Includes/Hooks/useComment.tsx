import useAnswerAndComment from '../Base/Hooks/useAnswerAndComment'
import useUpdateCommentMutate from './useUpdateCommentMutate'
import useAnswerCreateMutate from './useAnswerCreateMutate'

const useComment = () => {
   const {
      isSendDisabled,
      reference,
      imagePath,
      isUpdate,
      isError,
      isOpen,
      text,
      setIsError,
      setImagePath,
      handleSetOpen,
      handleChangeText,
      setStatesToDefault,
      handleSetOpenForUpdate,
      handleChangeTextWithEmoji,
   } = useAnswerAndComment()

   const updateCommentMutate = useUpdateCommentMutate(text, imagePath, setStatesToDefault, setIsError)
   const saveAnswerMutate = useAnswerCreateMutate(imagePath, 1, null, text, setStatesToDefault)

   return {
      isSendDisabled,
      reference,
      imagePath,
      isUpdate,
      isError,
      isOpen,
      text,
      setImagePath,
      handleSetOpen,
      handleChangeText,
      handleSetOpenForUpdate,
      handleChangeTextWithEmoji,
      updateCommentMutate,
      saveAnswerMutate,
   }
}

export default useComment
