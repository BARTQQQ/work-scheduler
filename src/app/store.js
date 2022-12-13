import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import groupReducer from '../features/group/groupSlice'
import eventReducer from '../features/event/eventSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
    event: eventReducer,
  },
})