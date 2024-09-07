import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/features/auth'

// Función para verificar si localStorage está disponible
const isLocalStorageAvailable = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false
    }
    const testKey = '__test__'
    window.localStorage.setItem(testKey, testKey)
    window.localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

// Función para cargar el estado inicial desde localStorage
const loadState = () => {
  if (!isLocalStorageAvailable()) {
    return undefined
  }
  try {
    const serializedState = window.localStorage.getItem('reduxState')
    if (serializedState === null) {
      return undefined // Si no hay estado en localStorage, devuelve undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('Error cargando el estado desde localStorage:', err)
    return undefined
  }
}

// Función para guardar el estado en localStorage
const saveState = (state: RootState) => {
  if (!isLocalStorageAvailable()) {
    return
  }
  try {
    const serializedState = JSON.stringify(state)
    window.localStorage.setItem('reduxState', serializedState)
  } catch (err) {
    console.error('Error guardando el estado en localStorage:', err)
  }
}

// Crear la tienda con la carga inicial del estado
export const makeStore = () => {
  const store = configureStore({
    reducer: {
      // @ts-ignore
      auth: authSlice.reducer,
    },
    preloadedState: loadState(),
  })

  store.subscribe(() => {
    saveState(store.getState())
  })

  return store
}

// Inferir el tipo de la tienda creada por makeStore
export type AppStore = ReturnType<typeof makeStore>

// Inferir los tipos `RootState` y `AppDispatch` a partir de la tienda
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
