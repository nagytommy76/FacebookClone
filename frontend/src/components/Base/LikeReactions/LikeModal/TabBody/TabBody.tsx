import dynamic from 'next/dynamic'
import useIcon from '../Hooks/useIcon'
import type { LikeTypes, ReactionType } from '@/src/types/LikeTypes'

import { StyledTabBodyContainer } from './Style'

const ReactionElement = dynamic(() => import('./Includes/ReactorBase'))

const TabBody: React.FC<{ tabValue: LikeTypes | 'all'; reactionTypes: ReactionType }> = ({
   tabValue,
   reactionTypes,
}) => {
   const iconImageComponent = useIcon()

   if (tabValue === 'all')
      return (
         <StyledTabBodyContainer value={tabValue}>
            {Object.entries(reactionTypes).map((keyValue) =>
               keyValue[1].reactors.map((reactor, index) => (
                  <ReactionElement key={index} reactor={reactor}>
                     {iconImageComponent(keyValue[0] as LikeTypes | 'all', 17, 17)}
                  </ReactionElement>
               ))
            )}
         </StyledTabBodyContainer>
      )
   else
      return (
         <StyledTabBodyContainer value={tabValue}>
            {reactionTypes[tabValue].reactors.map((reactor, index) => (
               <ReactionElement key={index} reactor={reactor}>
                  {iconImageComponent(tabValue, 17, 17)}
               </ReactionElement>
            ))}
         </StyledTabBodyContainer>
      )
}

export default TabBody
