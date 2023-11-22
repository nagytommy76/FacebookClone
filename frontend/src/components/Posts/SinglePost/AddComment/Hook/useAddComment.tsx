import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import useEmojiText from '@/src/hooks/useEmojiText'
import useCommentMutation from './useCommentMutation'

import { AllCommentsContext } from '@/AllCommentContext/AllCommentsContext'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'

const useAddComment = (reference: React.MutableRefObject<HTMLTextAreaElement | undefined>) => {
   const { commentsDispatch } = useContext(AllCommentsContext)
   const {
      postsDispatch,
      postsReducer: {
         singlePost: { _id: postID },
      },
   } = useContext(PostContext)
   const [commentText, setCommentText] = useState<string>('')
   const [commentImagePath, setCommentImagePath] = useState<FileList | null>(null)
   const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true)

   const commentMutationFn = useCommentMutation(commentImagePath, commentText, postID)
   const handleChangeEmoji = useEmojiText(reference, setCommentText)

   const { mutate } = useMutation({
      mutationKey: ['sendPostComment'],
      mutationFn: commentMutationFn,
      onSuccess: (data) => {
         commentsDispatch({ type: 'ADD_NEW_COMMENT', payload: data.comments })
         postsDispatch({ type: 'SET_COMMENTS_LENGTH', payload: data.comments.length })
         setCommentImagePath(null)
      },
   })

   const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      setCommentText(event.target.value)
   }

   const handleChangeTextWithEmoji = (emoji: string = '') => {
      if (commentText.length === 0) setIsSendDisabled(true)
      else setIsSendDisabled(false)
      handleChangeEmoji(emoji)
   }

   const handleSendComment = () => {
      mutate()
      setCommentText('')
   }

   return {
      handleChangeText,
      handleSendComment,
      handleChangeTextWithEmoji,
      setCommentImagePath,
      commentImagePath,
      commentText,
      isSendDisabled,
   }
}

export default useAddComment
