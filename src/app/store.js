import { configureStore } from '@reduxjs/toolkit'
import stepCounterReducer from '../feature/stepCounter/stepCounterSlice'

export const store = configureStore({
  reducer: {
        stepCounter: stepCounterReducer,
      },
})