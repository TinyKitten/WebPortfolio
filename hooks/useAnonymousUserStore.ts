import type { User } from 'firebase/auth';
import { create } from 'zustand';

export const useAnonymousUserStore = create<{
  user: User | null;
  setUser: (user: User) => void;
}>((set) => ({
  user: null,
  setUser: (user: User) => set((state) => ({ user: state.user ?? user })),
}));
