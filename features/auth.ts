import { User } from '@/types/models'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define the TS type for the counter slice's state
export interface AuthState {
  session: User | null
}

// Define the initial value for the slice state
const initialState: AuthState = {
  session: null,
}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSession: (state, action: PayloadAction<User>) => {
      state.session = action.payload
    },
    clearSession: (state) => {
      state.session = null
    }
  }
})

// Export the slice reducer for use in the store configuration
export default authSlice