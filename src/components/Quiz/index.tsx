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
import { Button } from 'antd';
import { Test } from '../../graphql';
import { resetTest } from '../../slices/actions';
import { Toolbox } from '../Slider';
import authQuery from '../Auth/query.graphql';
import QuizItem from './QuizItem';
import query from './query.graphql';
import FinishModal from './FinishModal';

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
  addProgress: () => void;
  isFree?: boolean | null;
};

export type Item = {
  id: string;
  value: string;
};

const Quiz = ({ lecture, courseId, addProgress, isFree }: Props) => {
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
          itemId={item?.itemId}
          key={item?.itemId}
          question={item?.question}
          answers={item?.answers}
          currentAnswer={test.find(
            (testItem: Item) => testItem.id === item?.itemId
          )}
        />
      )),
    [items, test]
  );

  const handleFinishTest = useCallback(() => {
    checkTestResult({
      variables: {
        input: {
          id: lecture?.lectureId,
          results: test,
          courseId
        }
      },
      refetchQueries: [{ query: authQuery.CurrentUser }]
    })
      .then((response) => {
        if (response.data && response.data?.checkTestResult) {
          setResults({ ...response.data?.checkTestResult });
          if (response?.data?.checkTestResult?.isCompleted) {
            addProgress();
          }
        }
      })
      .catch((error) => {
        throw error;
      });
  }, [checkTestResult, test, courseId, lecture, addProgress]);

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
      <FinishModal
        isVisible={isModalVisible}
        handleReset={handleReset}
        handleContinue={handleContinue}
        results={results}
        isFree={isFree}
      />
    </Fragment>
  );
};

export default Quiz;
