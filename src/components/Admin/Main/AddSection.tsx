import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { AdminCourse } from '../../../types';
import { setCourse } from '../../../slices/actions';
import AddModal from './AddModal';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const AddButton = styled(Button)`
  margin-bottom: 20px;
`;

type Props = {
  handleChangeActiveTab: (key: string) => void;
};

const AddSection = (props: Props) => {
  const [isAddingMode, setAddingMode] = useState<boolean>(false);
  const [isExists, setIsExists] = useState<boolean>(false);
  const { handleChangeActiveTab } = props;
  const course = useSelector((state: any) => state.course);
  const dispatch = useDispatch();

  const handleAddSection = useCallback(
    (value) => {
      const sectionId = uuid();
      const exists = course?.sections?.find(
        (item: any) => item?.title === value
      );

      if (exists) {
        setIsExists(!!exists);
        setTimeout(() => setIsExists(false), 1000);
      } else if (value && value.length > 0) {
        dispatch(
          setCourse({
            ...course,
            sections: [
              ...course.sections,
              {
                sectionId,
                title: value
              }
            ]
          })
        );
        handleChangeActiveTab(sectionId);
        setAddingMode(false);
        setIsExists(false);
      }
    },
    [course, handleChangeActiveTab, setCourse, dispatch]
  );

  return (
    <Wrapper>
      <AddButton onClick={() => setAddingMode(true)}>Добавить раздел</AddButton>
      <AddModal
        title="Добавление"
        visible={isAddingMode}
        onOk={(value) => handleAddSection(value)}
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
