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

export const singleHeadingPostitAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-64px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
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

export const skillCircleAnimation = keyframes({
  '0%': {
    boxShadow: '0 -3px 0 rgba(0, 0, 0, 0)',
  },
  '50%': {
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.16)',
  },
  '100%': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
  },
});

export const balloonAnimationVertical = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-62px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});
export const balloonAnimationHorizontal = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-220px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
});
