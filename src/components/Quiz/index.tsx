import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import Carousel from '@brainhubeu/react-carousel';
import styled from 'styled-components';
import { Button } from 'antd';
import {useSelector} from 'react-redux';
import { Toolbox } from '../Slider';
import QuizItem from './QuizItem';

const items = [
  {
    id: 'q-1',
    question: 'Сколько вам лет?',
    answers: [
      {
        id: '1',
        title: 'Мне 11 лет'
      },
      {
        id: '2',
        title: 'Мне 13 лет'
      },
      {
        id: '3',
        title: 'Мне 18 лет'
      },
      {
        id: '4',
        title: 'Мне 20 лет'
      }
    ]
  },
  {
    id: 'q-2',
    question: 'Как ваше имя?',
    answers: [
      {
        id: '1',
        title: 'Альберт'
      },
      {
        id: '2',
        title: 'Дмитрий'
      },
      {
        id: '3',
        title: 'Степан'
      },
      {
        id: '4',
        title: 'Иван'
      }
    ]
  }
];

const StyledCarousel = styled(Carousel)`
  min-height: 350px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-right: 20px;
`;

type SelectedAnswerType = {
  id: string;
  value: string;
};

const Quiz = () => {
  const [quizIndex, setIndex] = useState(0);
  const test = useSelector((state: any) => state.test);


  const quizItems = useMemo(
    () =>
      items?.map((item) => (
        <QuizItem
          id={item.id}
          question={item.question}
          answers={item.answers}
        />
      )),
    [items]
  );

  return (
    <Fragment>
      <StyledCarousel value={quizIndex} slides={quizItems} draggable={false} />
      <div>
        <Toolbox>
          <StyledButton
            disabled={quizIndex === 0}
            type="primary"
            onClick={() => setIndex(quizIndex - 1)}
          >
            Предыдущий вопрос
          </StyledButton>
          <StyledButton
            disabled={quizIndex === quizItems.length - 1}
            type="primary"
            onClick={() => setIndex(quizIndex + 1)}
          >
            Следующий вопрос
          </StyledButton>
        </Toolbox>
      </div>
    </Fragment>
  );
};

export default Quiz;
