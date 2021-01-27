import React, { useCallback, useEffect } from 'react';
import { FormInstance } from 'antd/es/form';
import { Answer, Test } from '../../../../graphql';
import { TestForm } from './TestForm';

const answerIndexes = [1, 2, 3, 4];

type Props = {
  onSubmit: (child: Test) => void;
  content?: Record<string, any>;
  form: FormInstance;
};

const TestComponent = ({ onSubmit, content, form }: Props) => {
  useEffect(() => {
    if (content) {
      const items =
        content?.items?.map((item: any) => {
          const itemForForm: any = {
            question: item.question,
            answer:
              item.answers.findIndex(
                (item: Record<any, any>) => item?.isCorrect
              ) + 1
          };

          item?.answers.forEach((item: Answer, index: number) => {
            itemForForm[index + 1] = item.title;
          });

          return itemForForm;
        }) || [];

      form.setFieldsValue({ ...content, items });
    }
  }, [content, form]);

  const mapItems = useCallback((items) => {
    return items.map((item: Record<any, any>) => ({
      question: item.question,
      answers: answerIndexes.map((index) => ({
        title: item[index],
        isCorrect: item.answer === index
      }))
    }));
  }, []);

  const onFinish = useCallback(() => {
    const fields = form.getFieldsValue();

    const result = {
      ...content,
      ...fields,
      type: 'Test',
      items: mapItems(fields.items)
    };

    onSubmit(result);
    form.resetFields();
  }, [mapItems, onSubmit, form, content]);

  return <TestForm form={form} onFinish={onFinish} />;
};

export default TestComponent;
