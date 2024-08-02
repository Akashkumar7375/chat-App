import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./user/useSlice"

export const store= configureStore({
  reducer:{
    user:userSlice
  }
})
