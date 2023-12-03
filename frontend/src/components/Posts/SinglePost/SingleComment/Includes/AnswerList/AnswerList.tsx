import type { ICommentAnswers } from '@/src/types/LikeTypes'
import SingleAnswer from '../SingleAnswer/SingleAnswer'

const AnswerList: React.FC<{ answer: ICommentAnswers[] }> = ({ answer }) => {
   return (
      <>
         {answer.map((singleAnswer) => (
            <SingleAnswer key={singleAnswer._id} answer={singleAnswer} />
         ))}
      </>
   )
}

export default AnswerList
