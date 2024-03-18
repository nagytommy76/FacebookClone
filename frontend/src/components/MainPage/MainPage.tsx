'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { MainPageContainer } from './Style'

const AllPostsComponent = dynamic(() => import('@/Base/PostsBase/PostsBase'))
const AcceptedFriends = dynamic(() => import('./AcceptedFriends/AcceptedFriends'))

const MainPage = () => {
   return (
      <MainPageContainer>
         <div style={{ maxWidth: '800px' }}>
            <AllPostsComponent />
         </div>
         <AcceptedFriends />
      </MainPageContainer>
   )
}

export default MainPage
