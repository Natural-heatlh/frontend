import React, {useCallback, useState} from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AdminCourse } from '../../../types';
import AddModal from './AddModal';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const AddButton = styled(Button)`
  margin-bottom: 20px;
`;

type Props = {
  setCourse: (course: AdminCourse) => void;
  handleChangeActiveTab: (key: string) => void
  course: AdminCourse;
};

const AddSection = (props: Props) => {
  const [isAddingMode, setAddingMode] = useState<boolean>(false);
  const [isExists, setIsExists] = useState<boolean>(false);
  const { course, setCourse, handleChangeActiveTab} = props;

  const handleAddSection = useCallback(
    (value) => {
      const exists = course?.sections?.find((item) => item?.title === value);
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
        handleChangeActiveTab(value)
        setAddingMode(false);
        setIsExists(false);
      }
    },
    [course, handleChangeActiveTab, setCourse]
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

const mapStateToProps = (state: Record<string, any>) => ({ course: state?.course })

export default connect(mapStateToProps)(AddSection);
