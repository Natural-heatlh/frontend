import React, { useCallback, useState } from 'react';
import { Input, Form, Button, Select, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Option } = Select;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const QuestionBlockWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledDivider = styled(Divider)`
  border-top: 1px dashed #168a7e;
`;

interface State {
  [index: number]: { id: number; value: string; };
}

const Test = () => {
  const onFinish = useCallback(
    (value) => {
      console.log('val >', value);
    },
    []
  );

  return (
    <React.Fragment>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Заголовок теста"
          name="testTitle"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите заголовок теста!'
            }
          ]}
          style={{ width: '100%' }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Описание"
          name="testDescription"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите текст описания!'
            }
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.List name="tests">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, i) => (
                <>
                  <StyledDivider />
                  <QuestionBlockWrapper>
                  <QuestionWrapper>
                    <Form.Item
                      label={`${i+1}. Вопрос`}
                      key={i}
                      // name={`${i+1}_testTitle`}
                      name={[field.name, `question`]}
                      fieldKey={[field.fieldKey, `question`]}
                      rules={[
                        {
                          required: true,
                          message: 'Пожалуйста введите вопрос!'
                        }
                      ]}
                      style={{ width: '100%', marginBottom: '50px' }}
                    >
                      <Input
                        placeholder={'Введите вопрос'}
                        name={`${i+1}_name`}
                        id={`${i+1}_id`}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    {[1,2,3,4].map(item =>
                      <Form.Item
                        label={`${item}. Вариант ответа`}
                        name={[field.name, `${item}`]}
                        rules={[
                          {
                            required: true,
                            message: 'Пожалуйста введите вариант ответа!'
                          }
                        ]}
                      >
                        <Input
                          name={`${item}`}
                          id={`${item}`}
                          placeholder={'Введите вариант ответа'}
                        />
                      </Form.Item>
                    )}
                    <Form.Item
                      label={`Выберите правильный вариант ответа`}
                      fieldKey={[field.fieldKey, `answer`]} name={[field.name, `answer`]}
                      rules={[
                        {
                          required: true,
                          message: 'Пожалуйста выберите правильный вариант ответа!'
                        }
                      ]}
                      style={{ marginTop: '15px' }}
                    >
                      <Select style={{ width: 120 }}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                      </Select>
                    </Form.Item>
                  </QuestionWrapper>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </QuestionBlockWrapper>
                </>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить вопрос
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Принять
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default Test;
