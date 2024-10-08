'use client'
import { useStore } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { storage } from './storage'

import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import AuthSlice from './slices/AuthSlice'
import ThemeSlice from './slices/ThemeSlice'
import ChatSlice from './slices/ChatSlice'
import InfoSnack from './slices/InfoSnack'

export const makeStore = () =>
   configureStore({
      reducer: {
         chat: ChatSlice,
         infoSnack: InfoSnack,
         auth: persistReducer({ key: 'Auth', storage }, AuthSlice),
         theme: persistReducer({ key: 'Theme', storage }, ThemeSlice),
      },
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            serializableCheck: {
               ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
         }),
   })

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
