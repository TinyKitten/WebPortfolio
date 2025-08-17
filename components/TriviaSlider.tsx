'use client';
import styled, { keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import TriviaCard from './TriviaCard';
import { TriviaItemObject } from '../models/trivia';

const sliderAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(0)',
  },
  '25%': {
    opacity: 1,
  },
  '50%': {
    transform: 'translateX(-5%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

const SwiperContainer = styled.div`
  opacity: 0;
  animation: ${sliderAnimation} 0.75s ease forwards;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

type Props = {
  title: string;
  items: TriviaItemObject[];
};

export const TriviaSlider = ({ title, items }: Props) => (
  <SwiperContainer>
    <Swiper slidesPerView="auto" spaceBetween={0}>
      {items.map((item) => (
        <StyledSwiperSlide key={item.id}>
          <TriviaCard title={title} item={item} visible />
        </StyledSwiperSlide>
      ))}
    </Swiper>
  </SwiperContainer>
);
