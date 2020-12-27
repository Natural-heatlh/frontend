import React, { useCallback } from 'react';
import { Form } from 'antd';
import { Test } from '../../../../graphql';
import { TestForm } from './TestForm';

const answerIndexes = [1, 2, 3, 4];

type Props = {
  handleAddChild: (child: Test) => void;
};

const TestComponent = ({ handleAddChild }: Props) => {
  const [form] = Form.useForm();

  const mapItems = useCallback((items) => {
    return items.map((item: Record<any, any>) => ({
      question: item.question,
      answers: answerIndexes.map((index) => ({
        title: item[index],
        isCorrect: item.answer === index
      }))
    }));
  }, []);

  const onFinish = useCallback(
    (value) => {
      const result = {
        title: value.title,
        description: value.description,
        type: 'Test',
        items: mapItems(value.items)
      };

      handleAddChild(result);

      form.resetFields();
    },
    [mapItems]
  );

  return <TestForm form={form} onFinish={onFinish} />;
};

export default TestComponent;
