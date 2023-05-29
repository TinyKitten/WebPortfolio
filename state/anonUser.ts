import type { User } from 'firebase/auth';
import { atom } from 'jotai';

// https://github.com/pmndrs/jotai/discussions/629#discussioncomment-1120227
export const anonymousUserAtom = atom<User | false>(false);
