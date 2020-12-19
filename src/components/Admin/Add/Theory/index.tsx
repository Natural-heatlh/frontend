import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Input, Form, Button, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Theory } from '../../../../graphql';

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

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
    handleAddChild({
      ...form.getFieldsValue(),
      type: 'Theory'
    });
    form.resetFields();
  }, [handleAddChild, form]);

  const onFinishFailed = useCallback(() => {
    // setAlert({
    //   visible: true,
    //   type: 'error',
    //   message: 'Ошибка!',
    // });
  }, []);

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
        onFinishFailed={onFinishFailed}
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

        <Form.Item label="Ссылка на аудио" name="audio">
          <Input />
        </Form.Item>
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
          <Form.List name="slides">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, i) => (
                  <SliderWrapper key={i}>
                    <Form.Item
                      label={`${i + 1}. Ссылка на слайд`}
                      key={i}
                      // name={`${i+1}_testTitle`}
                      name={[field.name, `url`]}
                      rules={[
                        {
                          required: true,
                          message: 'Пожалуйста введите ссылку на слайд!'
                        }
                      ]}
                      style={{ width: '100%', marginBottom: '50px' }}
                    >
                      <Input
                        placeholder={'Введите ссылку на слайд'}
                        key={`${i + 1}_key`}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </SliderWrapper>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Добавить слайд
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Принять
          </Button>
        </Form.Item>
        {/*{ alert?.visible && <Alert message={alert?.message} type={alert?.type} /> }*/}
      </Form>
    </React.Fragment>
  );
};

export default TheoryComponent;
