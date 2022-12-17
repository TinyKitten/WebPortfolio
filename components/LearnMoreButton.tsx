import styled from 'styled-components';
import { imageAnimation } from '../constants/keyframets';
import Button from './Button';

export const LearnMoreButton = styled(Button)`
  margin: 32px 0;
  animation: ${imageAnimation} 1s ease forwards;
`;
