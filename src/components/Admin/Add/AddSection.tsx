import React, { useCallback, useState } from 'react';
import { Button, Alert } from 'antd';
import styled from 'styled-components';
import { CreateCourseInput } from '../../../graphql';

import AddModal from './AddModal';

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
  const [isAddingMode, setAddingMode] = useState<boolean>(false);
  const [isExists, setIsExists] = useState<boolean>(false);
  const { course, setCourse } = props;

  const handleAddSection = useCallback((value) => {
    const exists = course?.sections?.find(item => item?.title === value);
    if (exists) {
      setIsExists(!!exists);
      setTimeout(() => setIsExists(false), 1000);
    } else if (value && value.length > 0) {
      setCourse({
        ...course,
        sections: [
          ...course.sections,
          {
            title: value
          }
        ]
      });
      setAddingMode(false);
      setIsExists(false);
    }
  }, [course, setCourse]);

  return (
    <Wrapper>
      <AddButton onClick={() => setAddingMode(true)}>Добавить раздел</AddButton>
        <AddModal
          title="Добавление"
          visible={isAddingMode}
          onOk={value => handleAddSection(value)}
          setMode={setAddingMode}
          okText="Добавить"
          cancelText="Отменить добавление"
          error={isExists ? 'Раздел с таким именем существует!' : ''}
          onErrorClose={() => setIsExists(false)}
        />
    </Wrapper>
  );
};

export default AddSection;
