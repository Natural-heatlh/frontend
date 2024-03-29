import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from '@brainhubeu/react-carousel';
import { useMutation } from '@apollo/client';
import { Button, Image } from 'antd';
import { Test } from '../../graphql';
import { resetTest } from '../../slices/actions';
import axios from '../../helpers/axios';
import { AuthContext } from '../Auth/AuthCheck';
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

const HiddenImage = styled(Image)`
  display: none;
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
  const user = useContext(AuthContext);
  const [isModalVisible, setVisible] = useState(false);
  const [results, setResults] = useState({
    correct: 0,
    wrong: 0,
    isCompleted: false
  });

  const [certificate, setCertificate] = useState({
    url: '',
    visible: false,
    isFetching: false
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

  const getCertificate = useCallback(async () => {
    setCertificate((current) => ({
      ...current,
      isFetching: true
    }));

    try {
      const result = await axios.post('/generate-certificate', {
        courseId,
        email: user?.email
      });

      if (result.data?.certificate) {
        setCertificate({
          url: result.data.certificate,
          visible: true,
          isFetching: false
        });
        // window.location = result.data.certificate;
      }
    } catch (e) {
      console.log(e);
    }
  }, [courseId, user]);

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
        isFetching={certificate?.isFetching}
        handleReset={handleReset}
        handleContinue={handleContinue}
        getCertificate={getCertificate}
        results={results}
        isFree={isFree}
      />
      <HiddenImage
        src={certificate.url}
        preview={{
          visible: certificate?.visible,
          onVisibleChange: (visible) => {
            setCertificate((current) => ({
              ...current,
              url: '',
              visible,
              isFetching: false
            }));
          }
        }}
      />
    </Fragment>
  );
};

export default Quiz;
