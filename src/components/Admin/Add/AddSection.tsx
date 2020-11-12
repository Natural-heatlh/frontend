import React, { useCallback, useState } from 'react';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import { CreateCourseInput } from '../../../graphql';

const SectionNameInput = styled(Input)`
  max-width: 680px;
  width: 100%;
  margin-right: 10px;
`;

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const AddButton = styled(Button)`
  margin-bottom: 20px;
`;

type Props = {
  setCourse: (course: CreateCourseInput) => void;
  course: CreateCourseInput;
};

const AddSection = (props: Props) => {
  const [isAddingMode, setAddingMode] = useState(false);
  const [value, updateValue] = useState('');
  const { course, setCourse } = props;

  const handleAddSection = useCallback(() => {
    if (value && value.length > 0) {
      setCourse({
        ...course,
        sections: [
          ...course.sections,
          {
            title: value
          }
        ]
      });
    }
    updateValue('');
    setAddingMode(false);
  }, [course, setCourse, value]);

  return (
    <Wrapper>
      <AddButton onClick={() => setAddingMode(true)}>Добавить раздел</AddButton>
      {isAddingMode && (
        <div>
          <SectionNameInput
            placeholder="Название раздела"
            value={value}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Button onClick={handleAddSection} shape="round" type="primary">
            Добавить
          </Button>
          <Button
            onClick={() => setAddingMode(false)}
            shape="round"
            type="primary"
            danger
          >
            Отменить добавлние
          </Button>
        </div>
      )}
    </Wrapper>
  );
};

export default AddSection;
