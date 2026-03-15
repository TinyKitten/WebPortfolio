'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { TriviaItemObject } from '../models/trivia';
import TriviaCard from './TriviaCard';

type Props = {
  title: string;
  items: TriviaItemObject[];
};

export const TriviaSlider = ({ title, items }: Props) => (
  <div className="opacity-0 animate-slider">
    <Swiper slidesPerView="auto" spaceBetween={0}>
      {items.map((item) => (
        <SwiperSlide key={item.id} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TriviaCard title={title} item={item} visible />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
