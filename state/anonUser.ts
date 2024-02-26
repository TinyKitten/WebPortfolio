import type { User } from 'firebase/auth';
import { atom } from 'jotai';

export const anonymousUserAtom = atom<User | null>(null);
