import { User } from '@/types/models'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  session: User | null
  token: string | null
}

const initialState: AuthState = {
  session: null,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setSession: (state, action: PayloadAction<User>) => {
      state.session = action.payload
    },
    clearSession: (state) => {
      state.session = null;
      state.token = null;
    }
  }
})

export default authSlice;
