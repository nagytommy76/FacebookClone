import { Response } from 'express'
import type { IJWTUserType } from '../../middlewares/accessTokenRefresh'
import { Posts as PostModel } from '../../models/posts/posts'
import { ICommentAnswer } from './types/commentTypes'

interface IRemoveCommentRequest extends IJWTUserType {
   body: {
      postId: string
      commentId: string
   }
}
interface IRemoveAnswerRequest extends IJWTUserType {
   body: {
      postId: string
      answerId: string
   }
}

export const removeCommentController = async (request: IRemoveCommentRequest, response: Response) => {
   const { postId, commentId } = request.body
   try {
      // ha egy "fő" komment:
      const foundPostsComment = await PostModel.find({
         _id: postId,
         comments: { $elemMatch: { _id: commentId } },
      }).select('comments')

      foundPostsComment[0].comments = foundPostsComment[0].comments.filter(
         (comment) => comment._id?.toString() != commentId.toString()
      )
      foundPostsComment[0].save()
      response.status(200).json({ msg: 'success', commentsLength: foundPostsComment[0].comments.length })
   } catch (error) {
      response.status(500).json({ error, msg: 'internal server error' })
   }
}

export const removeCommentAnswerController = async (request: IRemoveAnswerRequest, response: Response) => {
   const { postId, answerId } = request.body

   try {
      const foundPostsComment = await PostModel.find({
         _id: postId,
         'comments.commentAnswers': { $elemMatch: { _id: answerId } },
      }).select(['comments.commentAnswers.$'])

      const foundAnswerToDelete = foundPostsComment[0].comments[0].commentAnswers?.find(
         (answer) => answer._id == answerId
      ) as ICommentAnswer

      // Azokat kell kitörölni amelyeknek a parentCommentId-je megegyezik
      // fel kell építeni egy comment fát, megviszgálni hogy van-e utána "CHILD" comment még és azoknak id-jét kigyüjteni
      let foundChilds = []
      const test = foundPostsComment[0].comments[0].commentAnswers.map((answer) => {
         let firstParentId = foundAnswerToDelete._id
         // Ezzel megkeresem az összes 1-gyel lejjebb lévő commentet -> most kéne lejjebb menni.
         if (
            answer.parentCommentId == firstParentId &&
            foundAnswerToDelete.commentDepth < answer.commentDepth
         ) {
            firstParentId = answer._id
            console.log(firstParentId)
            console.log('')
            console.log(answer.parentCommentId)
         }
      })

      foundPostsComment[0].comments[0].commentAnswers =
         foundPostsComment[0].comments[0].commentAnswers?.filter((answer) => {
            return (
               answer.commentDepth <= foundAnswerToDelete?.commentDepth &&
               answer._id != answerId &&
               answer.parentCommentId != answerId
            )
         })

      // A commentDepth + 1 et vizsgálnom kell, hogy a parentComentId-je az megegyezik-e a törlendővel,
      // Ha igen azt is törölnöm kell

      response.status(200).json({
         msg: 'helló VÁLASZ TÖRLÉS',
         newCommentAnswers: foundPostsComment[0].comments[0].commentAnswers,
         foundAnswerToDelete,
      })
   } catch (error) {
      response.status(500).json({ error, msg: 'internal server error' })
   }
}
