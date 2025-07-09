'use client'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { storage } from './storage'

import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import AuthSlice from './slices/AuthSlice'
import ThemeSlice from './slices/ThemeSlice'
import ChatSlice from './slices/ChatSlice'
import InfoSnack from './slices/InfoSnack'

const rootReducer = combineReducers({
   chat: ChatSlice,
   infoSnack: InfoSnack,
   auth: persistReducer({ key: 'Auth', storage }, AuthSlice),
   theme: persistReducer({ key: 'Theme', storage }, ThemeSlice),
})

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
      }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
