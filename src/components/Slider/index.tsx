import React, { useEffect, useMemo, useState } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import styled from 'styled-components';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../static/up.svg';
import { Slide } from '../../graphql';
import { RoundButton } from '../Buttons';

const SliderWrapper = styled.div`
  min-height: 400px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const SlideImg = styled(motion.img)`
  max-width: 100%;
  width: 100%;
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
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
`;

const ToolboxLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ToolboxRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ArrowLeft = styled(ArrowIcon)`
  margin-left: -2px;
  transform: rotate(180deg);
`;

const ArrowLRight = styled(ArrowIcon)`
  margin-right: -2px;
`;

type Props = {
  slides?: Slide[];
  addProgress: () => void;
  progress?: string[];
  isCompleted?: boolean;
  next?: string | null;
};

const Slider = ({ slides, addProgress, isCompleted, next }: Props) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (slides && value + 1 === slides?.length && !isCompleted) {
      addProgress();
    }
  }, [value, addProgress, slides, isCompleted]);

  useEffect(() => {
    setValue(0);
  }, [next, setValue]);

  const items = useMemo(
    () =>
      slides?.map((item, index) => (
        <div style={{ height: '622px' }} key={item.id}>
          <SlideImg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={item.url as string}
          />
        </div>
      )),
    [slides]
  );

  return items ? (
    <SliderWrapper>
      <Carousel value={value} slides={items} onChange={setValue} />
      <div>
        <ProgressBar>
          {slides?.map((item, index) => (
            <ProgressItem
              key={index}
              onClick={() => setValue(index)}
              active={index <= value}
            />
          ))}
        </ProgressBar>
        <Toolbox>
          <ToolboxLeft>
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
              {value + 1} из {slides?.length} слайдов{' '}
            </span>
          </ToolboxLeft>
          {next ? (
            <ToolboxRight>
              <Button
                onClick={() => setValue(0)}
                type="primary"
                disabled={!isCompleted}
              >
                <Link to={next}>Следующий урок</Link>
              </Button>
            </ToolboxRight>
          ) : null}
        </Toolbox>
      </div>
    </SliderWrapper>
  ) : null;
};

export default Slider;
