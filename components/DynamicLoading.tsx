'use client';
import styled from 'styled-components';
import { isDark } from '../utils/isDark';

export const DynamicLoading = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${isDark ? '#212121' : '#fefefe'};
`;
