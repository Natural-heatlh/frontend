import React, { useMemo, useState } from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../static/up.svg';
import { Slide } from '../../graphql';
import { RoundButton } from '../Buttons';

type Props = {
  slides?: Slide[];
};

const SliderWrapper = styled.div`
  min-height: 400px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const SlideImg = styled.img`
  object-fit: cover;
  max-width: 100%;
  height: 100%;
`;

export const ProgressBar = styled.div`
  height: 7px;
  display: flex;
  min-width: 0;
`;

export const ProgressItem = styled.div<{ active?: boolean }>`
  width: 100%;
  background: ${(props) => (props.active ? '#007D75' : '#E8E9EB')};
  margin-right: 2px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

export const Toolbox = styled.div`
  height: 48px;
  width: 100%;
  background: #f2f3f5;
  display: flex;
  align-items: center;
  padding-left: 40px;
`;

const ArrowLeft = styled(ArrowIcon)`
  margin-left: -2px;
  transform: rotate(180deg);
`;

const ArrowLRight = styled(ArrowIcon)`
  margin-right: -2px;
`;

const slidess = [
  {
    id: '1',
    url:
      'https://oecdenvironmentfocusblog.files.wordpress.com/2020/06/wed-blog-shutterstock_1703194387_low_nwm.jpg'
  },
  {
    id: '2',
    url: 'https://www.meissl.com/media/images/8f24db1f/schweiz.jpg'
  },
  {
    id: '3',
    url: 'https://www.meissl.com/media/images/8f24db1f/schweiz.jpg'
  },
  {
    id: '4',
    url: 'https://www.meissl.com/media/images/8f24db1f/schweiz.jpg'
  }
];

const Slider = ({ slides }: Props) => {
  const [value, setValue] = useState(0);

  slides = slidess;

  const items = useMemo(
    () =>
      slides?.map((item) => (
        <div>
          <SlideImg src={item.url as string} />
        </div>
      )),
    [slides]
  );

  return (
    <SliderWrapper>
      <Carousel value={value} slides={items} onChange={setValue} />
      <div>
        <ProgressBar>
          {slides.map((item, index) => (
            <ProgressItem
              onClick={() => setValue(index)}
              active={index <= value}
            />
          ))}
        </ProgressBar>
        <Toolbox>
          <RoundButton
            onClick={() => (value > 0 ? setValue(value - 1) : undefined)}
          >
            <ArrowLeft />
          </RoundButton>
          <RoundButton
            onClick={() =>
              slides && value < slides?.length - 1
                ? setValue(value + 1)
                : undefined
            }
          >
            <ArrowLRight />
          </RoundButton>
          <span>
            {value + 1} из {slides.length} слайдов
          </span>
        </Toolbox>
      </div>
    </SliderWrapper>
  );
};

export default Slider;
