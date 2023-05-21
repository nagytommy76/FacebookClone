import React from 'react'
import dynamic from 'next/dynamic'
import { MainPageContainer } from './Style'

import PostsContextProvider from './Context/PostsContextProvider'
const AllPostsComponent = dynamic(() => import('./AllPosts/AllPosts'), {
   loading: () => <>Egyelőre töltés...</>,
})

const MainPage = () => {
   return (
      <PostsContextProvider>
         <MainPageContainer>
            <AllPostsComponent />
         </MainPageContainer>
      </PostsContextProvider>
   )
}

export default MainPage
