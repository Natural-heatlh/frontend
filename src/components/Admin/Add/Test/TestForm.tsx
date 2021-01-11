import React from 'react';
import { Button, Divider, Form, Input, Radio } from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { FormInstance } from 'antd/es/form';

const { Item, List } = Form;

const RadioButton = Radio.Button;

const answersArray: number[] = [1, 2, 3, 4];

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const QuestionItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
`;

const QuestionBlockWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledDivider = styled(Divider)`
  border-top: 1px dashed #168a7e;
`;

const StyledRadioButton = styled(RadioButton)`
  margin-right: 10px;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
`;

interface Props {
  onFinish: (any?: any) => void;
  form: FormInstance;
  content?: Record<any, any> | undefined;
}

export const TestForm = ({ onFinish, form, content }: Props) => {
  return (
    <>
      <Form layout="vertical" onFinish={onFinish} form={form} initialValues={content}>
        <Item
          label="Заголовок теста"
          name="title"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите заголовок теста!'
            }
          ]}
          style={{ width: '100%' }}
        >
          <Input />
        </Item>
        <Item
          label="Описание"
          name="description"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите текст описания!'
            }
          ]}
        >
          <Input.TextArea rows={3} />
        </Item>
        <List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, i) => (
                <>
                  <StyledDivider />
                  <QuestionBlockWrapper>
                    <QuestionWrapper>
                      <Item
                        label={`${i + 1}. Вопрос`}
                        key={i}
                        name={[field.name, `question`]}
                        fieldKey={[field.fieldKey, `question`]}
                        rules={[
                          {
                            required: true,
                            message: 'Пожалуйста введите вопрос!'
                          }
                        ]}
                        style={{ width: '100%' }}
                      >
                        <Input
                          placeholder={'Введите вопрос'}
                          style={{ width: '100%' }}
                        />
                      </Item>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Item name={[field.name, `answer`]}>
                          <Radio.Group
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <StyledRadioButton
                              value={1}
                              style={{ marginTop: '30px' }}
                            >
                              <CheckOutlined />
                            </StyledRadioButton>
                            <StyledRadioButton
                              value={2}
                              style={{ marginTop: '55px' }}
                            >
                              <CheckOutlined />
                            </StyledRadioButton>
                            <StyledRadioButton
                              value={3}
                              style={{ marginTop: '54px' }}
                            >
                              <CheckOutlined />
                            </StyledRadioButton>
                            <StyledRadioButton
                              value={4}
                              style={{ marginTop: '54px' }}
                            >
                              <CheckOutlined />
                            </StyledRadioButton>
                          </Radio.Group>
                        </Item>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                          }}
                        >
                          <Item name={[field.name, `answers`]}>
                            {answersArray.map((item, i) => (
                              <QuestionItemWrapper>
                                <Item
                                  label={`${item}. Вариант ответа`}
                                  name={[field.name, `${i + 1}`]}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        'Пожалуйста введите вариант ответа!'
                                    }
                                  ]}
                                  style={{ width: '100%' }}
                                >
                                  <Input placeholder={'Введите вариант ответа'} />
                                </Item>
                              </QuestionItemWrapper>
                            ))}
                          </Item>

                        </div>
                      </div>
                    </QuestionWrapper>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </QuestionBlockWrapper>
                </>
              ))}
              <Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить вопрос
                </Button>
              </Item>
            </>
          )}
        </List>
        <Item>
          <Button type="primary" htmlType="submit">
            Принять
          </Button>
        </Item>
      </Form>
    </>
  );
};
