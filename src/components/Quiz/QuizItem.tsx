import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';
import { useDispatch } from 'react-redux';
import { Test, TestItem } from '../../graphql';
import { setTest } from '../../slices/actions';

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

interface QuizItemProps extends TestItem {}

const QuizItem = ({ id, question, answers }: QuizItemProps) => {
  const [value, setValue] = useState(null);
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
    [setValue]
  );

  return (
    <Wrapper key={id}>
      <Question>{question}</Question>
      <AnswersWrapper value={value} onChange={handleChange}>
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
