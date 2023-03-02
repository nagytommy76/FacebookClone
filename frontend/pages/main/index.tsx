import React from 'react'

const index = () => {
   return (
      <div>
         <h1>Ez egy védett oldal és csak access tokennel láthatom!</h1>
      </div>
   )
}

export async function getServerSideProps() {
   return {
      props: {},
   }
}

export default index
