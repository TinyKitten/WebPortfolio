import { keyframes } from 'styled-components';

export const titlePostitAnimation = keyframes({
  from: {
    transform: 'translateY(-147px)',
  },
  to: {
    transform: 'translateY(0)',
  },
});

export const headingPostitAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-64px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0) rotate(-5deg)',
  },
});

export const fadeAnimation = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const imageAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-32px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});
