import React, { useCallback, useRef, useState } from 'react';
import { Table, Input, Button, Space, Tag, Drawer, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { User, UserCourse } from '../../graphql';
import UserForm from '../../components/Admin/Main/UserForm';
import Preloader from '../../components/Preloader';
import query from './query.graphql';
import AdminContainer from './Container';

type SearchState = {
  text: string;
  column: string;
};

const Users = () => {
  const { data, loading } = useQuery(query.Users);
  const [updateUserCourses] = useMutation(query.AddUserCourses);
  const [editableUser, setUser] = useState<User | null>(null);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const searchRef = useRef(null);

  const [state, setState] = useState<SearchState>({
    text: '',
    column: ''
  });

  console.log(state);

  const handleAddCoursesToUser = useCallback(
    async (
      email: string,
      courses?: UserCourse[],
      removableCourses?: string[]
    ) => {
      if (email) {
        try {
          const result = await updateUserCourses({
            variables: {
              input: {
                email,
                courses,
                removableCourses
              }
            },
            refetchQueries: [
              {
                query: query.Users
              }
            ]
          });

          if (result) {
            Modal.success({
              title: 'Успешно обновлено',
              content: 'Вы успешно обновили список курсов',
              onOk: () => {
                setDrawerOpen(false);
                setUser(null);
              }
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    [updateUserCourses, setDrawerOpen, setUser]
  );

  const handleSetEditing = useCallback(
    (user: User) => {
      setDrawerOpen(true);
      setUser(user);
    },
    [setDrawerOpen, setUser]
  );

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false);
    setUser(null);
  }, [setDrawerOpen]);

  const handleSearch = useCallback(
    (selectedKeys, confirm, dataIndex) => {
      confirm();
      setState({
        text: selectedKeys[0],
        column: dataIndex
      });
    },
    [setState]
  );

  const handleReset = useCallback(
    (clearFilters) => {
      clearFilters();
      setState((current) => ({ ...current, text: '' }));
    },
    [setState]
  );

  const getColumnSearchProps = useCallback(
    (dataIndex: string) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchRef}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setState({
                  text: selectedKeys[0],
                  column: dataIndex
                });
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value: string, record: any) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : '',
      render: (text: string) => text
    }),
    [handleReset, handleSearch, searchRef]
  );

  if (loading) return <Preloader />;

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '15%',
      ...getColumnSearchProps('firstName')
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '15%',
      ...getColumnSearchProps('lastName')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '15%',
      ...getColumnSearchProps('lastName')
    },
    {
      title: 'Partner ID',
      dataIndex: 'partnerID',
      key: 'partnerID',
      width: '15%',
      ...getColumnSearchProps('partnerID')
    },
    {
      title: 'Курсы',
      dataIndex: 'courses',
      key: 'courses',
      render: (courses: UserCourse[]) => {
        return (
          <span>
            {courses?.map((item) => (
              <Tag color={item.isCompleted ? 'green' : 'red'}>{item.level}</Tag>
            ))}
          </span>
        );
      }
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text: any, record: any) => {
        return (
          <Space>
            <Button size="small" onClick={() => handleSetEditing(record)}>
              Редактировать
            </Button>
          </Space>
        );
      }
    }
  ];

  return (
    <React.Fragment>
      <AdminContainer>
        <Table columns={columns as any} dataSource={data?.users} />
      </AdminContainer>
      <Drawer
        width="80%"
        onClose={handleCloseDrawer}
        visible={isDrawerOpen}
        destroyOnClose
      >
        <UserForm
          updateUserCourses={handleAddCoursesToUser}
          user={editableUser}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default Users;
