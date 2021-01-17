import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { Test } from '../../../../graphql';
import { TestForm } from './TestForm';

const answerIndexes = [1, 2, 3, 4];

type Props = {
  onSubmit: (child: Test) => void;
  content?: Record<any, any> | undefined;
  open?: boolean;
};

const TestComponent = ({ onSubmit, content, open }: Props) => {
  const [editableContent, setEditableContent] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && editableContent) {
      form.resetFields();
    }
  }, [editableContent, form, open]);

  useEffect(() => {
    if (content) {
      const tests = content?.items.map((item: Record<any, any>) => {
        const { answers } = item;
        return {
          '1': answers[0].title,
          '2': answers[1].title,
          '3': answers[2].title,
          '4': answers[3].title,
          answer:
            answers.findIndex((item: Record<any, any>) => item?.isCorrect) + 1,
          question: item.question
        };
      });
      setEditableContent({
        title: content.title,
        description: content.description,
        items: tests
      });
    }
  }, [content]);

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

      onSubmit(result);

      form.resetFields();
    },
    [mapItems, onSubmit, form]
  );

  return <TestForm form={form} onFinish={onFinish} content={editableContent} />;
};

export default TestComponent;
