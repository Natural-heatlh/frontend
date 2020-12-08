import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';
import { useDispatch } from 'react-redux';
import { TestItem } from '../../graphql';
import { setTest } from '../../slices/actions';
import { Item } from './index';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px;
  min-height: 400px;
  font-weight: bold;
`;

const Question = styled.h4`
  font-size: 20px;
  line-height: 25px;
  margin-bottom: 30px;
`;

const AnswersWrapper = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
`;

const Answer = styled(Radio)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: flex-start;
`;

interface QuizItemProps extends TestItem {
  currentAnswer: Item;
}

const QuizItem = ({ id, question, answers, currentAnswer }: QuizItemProps) => {
  const [value, setValue] = useState(currentAnswer?.value || null);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
      dispatch(
        setTest({
          id: id as string,
          value: e.target.value
        })
      );
    },
    [setValue, dispatch, id]
  );

  return (
    <Wrapper key={id}>
      <Question>{question}</Question>
      <AnswersWrapper
        value={currentAnswer ? value : null}
        onChange={handleChange}
      >
        {answers?.map((answ) => (
          <Answer value={answ?.id} key={answ?.id}>
            {answ?.title}
          </Answer>
        ))}
      </AnswersWrapper>
    </Wrapper>
  );
};

export default QuizItem;
