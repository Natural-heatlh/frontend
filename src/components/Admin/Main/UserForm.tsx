import React, { Fragment, useCallback, useState } from 'react';
import { Button, Popconfirm, Select, Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { State } from '../../../types';
import { Course, User, UserCourse } from '../../../graphql';
import { getLevelName } from '../../../utils/getLevels';
import { statusArray } from './MainForm';

const { Option } = Select;

const AddWrapper = styled.div`
  margin-bottom: 50px;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSelect = styled(Select)`
  width: 320px;
`;

interface ExtendedUserCourse extends UserCourse {
  removable?: boolean;
}

type Props = {
  user?: User | null;
  updateUserCourses: (
    email: string,
    courses: UserCourse[],
    removableCourses?: string[]
  ) => void;
};

const UserForm = ({ user, updateUserCourses }: Props) => {
  const [level, setLevel] = useState(null);

  const courses = useSelector<State, Course[]>((state) => state.courses);
  const [userCourses, setCourses] = useState<ExtendedUserCourse[]>(
    (user?.courses as ExtendedUserCourse[]) || []
  );
  const [newCourses, setNewCourses] = useState<UserCourse[]>([]);
  const [removableCourses, setRemovableCourses] = useState<string[]>([]);

  const changeLevel = useCallback(
    (value) => {
      setLevel(value);
    },
    [setLevel]
  );

  const handleRemove = useCallback(
    (courseId: string) => {
      if (courseId && userCourses) {
        const filtered = userCourses?.filter(
          (item) => item.courseId !== courseId
        );
        setCourses(filtered);

        if (!removableCourses?.includes(courseId)) {
          setRemovableCourses((removableCourses) => [
            ...removableCourses,
            courseId
          ]);
        }
      }
    },
    [userCourses, setCourses, removableCourses]
  );

  const onFinish = useCallback(() => {
    if (user?.email) {
      updateUserCourses(user?.email, newCourses, removableCourses);
    }
  }, [newCourses, updateUserCourses, removableCourses, user]);

  const handleAddCourse = useCallback(() => {
    if (courses && courses?.length > 0) {
      const addingCourse = courses?.find((item) => item?.level === level);
      const isCourseExist = userCourses?.find(
        (item) => item?.courseId === addingCourse?.courseId
      );

      if (addingCourse && !isCourseExist) {
        const userCourse: ExtendedUserCourse = {
          courseId: addingCourse?.courseId,
          progress: [],
          level: addingCourse?.level || 0,
          isCompleted: false
        };

        setCourses((current) => [...current, { ...userCourse }]);
        setNewCourses((current) => [...current, { ...userCourse }]);
      }
    }
  }, [courses, setCourses, userCourses, level]);

  const columns = [
    {
      title: 'Название',
      dataIndex: 'level',
      key: 'name',
      width: '15%',
      render: (text: number) => {
        return getLevelName(text);
      }
    },
    {
      title: 'Уровень',
      dataIndex: 'level',
      key: 'level',
      width: '15%',
      render: (text: number) => {
        return text;
      }
    },
    {
      title: 'Прогресс',
      dataIndex: 'isCompleted',
      key: 'isCompleted',
      width: '15%',
      render: (isCompleted: boolean, record: any) => {
        return isCompleted ? (
          <Tag color="green">Выполнено</Tag>
        ) : (
          <Tag>Не выполнено</Tag>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: ExtendedUserCourse) => {
        return (
          <Popconfirm
            title="Вы действительно хотите удалить?"
            onConfirm={() => handleRemove(record.courseId)}
            okText="Да"
            cancelText="Нет"
          >
            <Button danger={true}>Удалить</Button>
          </Popconfirm>
        );
      }
    }
  ];

  return (
    <Fragment>
      <AddWrapper>
        <h3>Добавить курс</h3>
        <SelectWrapper>
          <StyledSelect
            allowClear
            onChange={changeLevel}
            placeholder="Пожалуйста, выберите статус курса"
          >
            {statusArray.map((item, index) => (
              <Option key={index} value={item}>{getLevelName(item)}</Option>
            ))}
          </StyledSelect>
          <Button style={{ marginLeft: '20px' }} onClick={handleAddCourse}>
            Добавить
          </Button>
        </SelectWrapper>
      </AddWrapper>

      <h3>Курсы пользователя</h3>
      {courses && courses.length > 0 ? (
        <Table columns={columns} dataSource={userCourses} />
      ) : null}

      <Button onClick={onFinish}>Принять</Button>
    </Fragment>
  );
};

export default UserForm;
