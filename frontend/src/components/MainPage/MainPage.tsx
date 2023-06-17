import React from 'react'
import dynamic from 'next/dynamic'
import { MainPageContainer } from './Style'

const AllPostsComponent = dynamic(() => import('./AllPosts/AllPosts'))

const MainPage = () => {
   return (
      <MainPageContainer>
         <AllPostsComponent />
      </MainPageContainer>
   )
}

export default MainPage
