import React, { useCallback, useState } from 'react';
import {Answer, Maybe, Scalars, Test, TestItem} from '../../../../graphql';
import { ContentType } from '../../../../types';
import { CustomForm } from './CustomForm';

const answerIndexes = [1, 2, 3, 4];

interface State {
  __typename?: 'Test';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<TestItem>>>;

  // __typename?: 'TestItem';
  // id?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Answer>>>;
  isCompleted?: Maybe<Scalars['Boolean']>;

  // id?: Maybe<Scalars['String']>;
  // title?: Maybe<Scalars['String']>;
  // isCorrect?: Maybe<Scalars['Boolean']>;
}

const TestComponent = () => {
  const [fields, setFields] = useState<any>({});
  const onChange = useCallback((value) => {
    setFields(fields);
  }, [fields]);

  const mapItems = useCallback(items => {
    return items.map((item: Record<any, any>) => ({
        question: item.question,
        answers: answerIndexes.map(index => ({
            title: item[index],
            isCorrect: item.answer === index,
        }))
      }));
  }, [])

  const onFinish = useCallback(value => {
    const result = {
      title: value.title,
      description: value.description,
      items: mapItems(value.items)
    }
    console.log('val >', result);
  }, []);

  return (
    <CustomForm
      onChange={onChange}
      onFinish={onFinish}
      fields={fields}
    />
  )
};

export default TestComponent;
