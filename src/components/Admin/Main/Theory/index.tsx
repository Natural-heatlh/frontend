import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Input, Form, Button, Radio } from 'antd';
import { v4 as uuid } from 'uuid';
import { RadioChangeEvent } from 'antd/es/radio';
import { FormInstance } from 'antd/es/form';
import { Theory } from '../../../../graphql';
import SlideUploader from './SlideUploader';
import AudioUploader from './AudioUploader';

enum TheoryVariants {
  SLIDER = 'Слайдер',
  TEXT = 'Текст'
}

type Props = {
  onSubmit: (child: Theory) => void;
  content: Theory;
  form: FormInstance;
};

const TheoryComponent = ({ onSubmit, content, form }: Props) => {
  const [theoryVariant, setTheoryVariant] = useState(TheoryVariants.SLIDER);

  useEffect(() => {
    if (content) {
      form.setFieldsValue({
        ...content,
        uploadSlides:
          content?.slides?.map((item) => ({ ...item, status: 'done' })) || [],
        audioFiles: content?.audio?.url
          ? [
              {
                ...content?.audio,
                status: 'done'
              }
            ]
          : []
      });
    }
  }, [form, content]);

  const onFinish = useCallback(() => {
    const { uploadSlides, audioFiles, ...rest } = form.getFieldsValue();

    const audioFile = audioFiles ? {
      url: audioFiles[0]?.response?.fileLocation || audioFiles[0]?.url,
      uid: audioFiles[0]?.uid,
      name: audioFiles[0]?.name
    } : undefined;

    const slides = uploadSlides
      ? uploadSlides
          .filter((item: any) => !!item.status)
          .map((item: any) => {
            return {
              slideId: item.slideId || `slide-${uuid()}`,
              name: item.name,
              uid: item.uid,
              url: item.response?.fileLocation || item.url,
              status: 'done'
            };
          })
      : [];

    onSubmit({
      ...content,
      ...rest,
      audio: audioFile,
      slides,
      type: 'Theory'
    });

    form.resetFields();
  }, [onSubmit, form, content]);

  const handleVariantChange = useCallback(
    (e: RadioChangeEvent) => {
      setTheoryVariant(e.target.value);
    },
    [setTheoryVariant]
  );

  const slides = useMemo(() => {
    return content?.slides?.map((item) => ({ ...item, status: 'done' })) || [];
  }, [content]);

  const audioList = content?.audio?.url
    ? [{ ...content?.audio, status: 'done' }]
    : [];

  return (
    <React.Fragment>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={content}
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
        <AudioUploader audioList={audioList} />
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
          <SlideUploader slides={slides} />
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
