import React from 'react'
import useGetAccepted from './Hooks/useGetAccepted'

import { AcceptedFriendsStyles } from './styles'

const AcceptedFriends = () => {
   useGetAccepted()
   return (
      <AcceptedFriendsStyles>
         <h1>Ide jönnek a már elfogadott barátok</h1>
      </AcceptedFriendsStyles>
   )
}

export default AcceptedFriends
