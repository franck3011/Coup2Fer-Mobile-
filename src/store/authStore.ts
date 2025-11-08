import { create } from 'zustand'
import { User } from '../types'

interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  signOut: () => void
}

// Utilisateur demo pour test
const DEMO_USER: User = {
  id: 'user-demo',
  email: 'client@coup2fer.com',
  displayName: 'Client Demo',
  phoneNumber: '+33 6 12 34 56 78',
  role: 'client',
  createdAt: new Date()
}

export const useAuthStore = create<AuthState>((set) => ({
  user: DEMO_USER, // Pour test, enlever en production
  loading: false,
  setUser: (user) => set({ user }),
  signOut: () => set({ user: null }),
}))
