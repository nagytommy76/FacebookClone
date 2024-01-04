'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
import { persistStore } from 'redux-persist'

import { PersistGate } from 'redux-persist/integration/react'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
   const storeRef = useRef<AppStore>()
   if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore()
   }
   let persistor = persistStore(storeRef.current)
   return (
      <Provider store={storeRef.current}>
         <PersistGate persistor={persistor}>{children}</PersistGate>
      </Provider>
   )
}
