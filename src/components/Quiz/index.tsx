import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from '@brainhubeu/react-carousel';
import { useMutation } from '@apollo/client';
import { Button, Modal } from 'antd';
import { Test } from '../../graphql';
import { resetTest } from '../../slices/actions';
import { Toolbox } from '../Slider';
import authQuery from '../Auth/query.graphql';
import QuizItem from './QuizItem';
import query from './query.graphql';

const StyledCarousel = styled(Carousel)`
  min-height: 350px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-right: 20px;
`;

type Props = {
  lecture?: Test;
  courseId?: string;
};

export type Item = {
  id: string;
  value: string;
};

const Quiz = ({ lecture, courseId }: Props) => {
  const [isModalVisible, setVisible] = useState(false);
  const [results, setResults] = useState({
    correct: 0,
    wrong: 0,
    isCompleted: false
  });

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (results.correct > 0 || results.wrong > 0) {
      setVisible(true);
    }
  }, [results, setVisible]);

  const items = lecture?.items;
  const [quizIndex, setIndex] = useState(0);
  // TODO fix any type
  const test = useSelector((state: any) => state.test);
  const [checkTestResult] = useMutation(query.CheckTestResult);

  const quizItems = useMemo(
    () =>
      items?.map((item) => (
        <QuizItem
          id={item?.id}
          key={item?.id}
          question={item?.question}
          answers={item?.answers}
          currentAnswer={test.find(
            (testItem: Item) => testItem.id === item?.id
          )}
        />
      )),
    [items, test]
  );

  const handleFinishTest = useCallback(() => {
    checkTestResult({
      variables: {
        input: {
          id: lecture?.id,
          results: test,
          courseId
        }
      },
      refetchQueries: [{ query: authQuery.CurrentUser }]
    })
      .then((response) => {
        if (response.data && response.data?.checkTestResult) {
          setResults({ ...response.data?.checkTestResult });
        }
      })
      .catch((error) => {
        throw error;
      });
  }, [checkTestResult, test, courseId, lecture]);

  const handleCancel = useCallback(() => {
    setIndex(0);
    setVisible(false);
  }, [setVisible, setIndex]);

  const handleContinue = useCallback(() => {
    handleCancel();
    history.replace('/courses');
  }, [history, handleCancel]);

  const handleReset = useCallback(() => {
    dispatch(resetTest([]));
    handleCancel();
  }, [dispatch, handleCancel]);

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
            disabled={items ? quizIndex === items.length - 1 : true}
            type="primary"
            onClick={() => setIndex(quizIndex + 1)}
          >
            Следующий вопрос
          </StyledButton>
          {items && quizIndex === items.length - 1 ? (
            <StyledButton
              type="primary"
              disabled={items.length !== test.length}
              onClick={handleFinishTest}
            >
              Завершить тест
            </StyledButton>
          ) : null}
        </Toolbox>
      </div>
      <Modal
        title="Результаты теста"
        visible={isModalVisible}
        onCancel={handleReset}
        onOk={results.isCompleted ? handleContinue : handleReset}
        cancelText="Закрыть"
        okText={
          results.isCompleted ? 'Продолжить обучение' : 'Попробовать еще раз'
        }
      >
        <p>
          {results.isCompleted
            ? 'Поздравляем. Вы успешно сдали тест!'
            : 'К сожалению вы не прошли тест. Попробуйте ещё раз!'}
        </p>
        <p>Правильных ответов: {results.correct}</p>
        <p>Неправильных ответов: {results.wrong}</p>
      </Modal>
    </Fragment>
  );
};

export default Quiz;
