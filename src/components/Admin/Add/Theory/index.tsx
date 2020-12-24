import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Input, Form, Button, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import { Theory } from '../../../../graphql';
import SlideUploader from './SlideUploader';
import AudioUploader from './AudioUploader';

enum TheoryVariants {
  SLIDER = 'Слайдер',
  TEXT = 'Текст'
}

type Props = {
  handleAddChild: (child: Theory) => void;
};

const initialState = {
  title: '',
  content: '',
  type: 'Theory',
  slides: [],
  audio: ''
};

const TheoryComponent = ({ handleAddChild }: Props) => {
  const [theoryVariant, setTheoryVariant] = useState(TheoryVariants.SLIDER);
  const [form] = Form.useForm();

  const onFinish = useCallback(() => {
    const { uploadSlides, audio, ...rest } = form.getFieldsValue();
    const audioFile = audio?.file?.response?.fileLocation;
    const slides = uploadSlides
      ? uploadSlides
          .filter((item: any) => !!item.status)
          .map((item: any) => ({ url: item.response?.fileLocation }))
      : [];


    handleAddChild({
      ...rest,
      audio: audioFile,
      slides,
      type: 'Theory'
    });
    form.resetFields();
  }, [handleAddChild, form]);

  const handleVariantChange = useCallback(
    (e: RadioChangeEvent) => {
      setTheoryVariant(e.target.value);
    },
    [setTheoryVariant]
  );

  return (
    <React.Fragment>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialState}
      >
        <Form.Item
          label="Заголовок теории"
          name="title"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите заголовок теории!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <AudioUploader />
        <Form.Item label="Тип контента">
          <Radio.Group onChange={handleVariantChange} value={theoryVariant}>
            <Radio value={TheoryVariants.SLIDER}>{TheoryVariants.SLIDER}</Radio>
            <Radio value={TheoryVariants.TEXT}>{TheoryVariants.TEXT}</Radio>
          </Radio.Group>
        </Form.Item>
        {theoryVariant === TheoryVariants.TEXT ? (
          <Form.Item
            label="Теория"
            name="content"
            rules={[
              {
                required: true,
                message: 'Пожалуйста введите текст теории!'
              }
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        ) : (
          <SlideUploader />
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Принять
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default TheoryComponent;
