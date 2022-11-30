import { atom } from 'jotai';

export const visitorAtom = atom({
  isReturningVisitor: false,
  user: null,
  initialized: false,
});
