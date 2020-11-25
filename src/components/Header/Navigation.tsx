import React, {
  Fragment,
  ReactComponentElement,
  useCallback,
  useMemo,
  useState
} from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation, LinkProps, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as KnowledgeIcon } from '../../static/knowledge.svg';
import { ReactComponent as GroupIcon } from '../../static/group.svg';
import { Course } from '../../graphql';

const LinkText = styled.span`
  margin-left: 8px;
`;

type NavItemProps = LinkProps & {
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

export const NavItem = styled(NavLink)<NavItemProps>`
  display: flex;
  align-items: center;
  color: #fff;
  height: 100%;
  padding-left: 25px;
  padding-right: 25px;

  &.active {
    background: #88d1cc;
  }

  ${(props) => (props.active ? `background: #88d1cc;` : '')}

  &:hover {
    background: #88d1cc;
    color: rgba(0, 125, 117, 1);
    height: 100%;
  }
`;

const StyledDropdown = styled(Dropdown)``;

const StyledMenu = styled(Menu)`
  background: #88d1cc;
  color: #fff;
  min-width: 220px;
`;

const MenuItem = styled(Menu.Item)`
  color: #fff;
  padding: 8px 24px;
  font-weight: 500;

  &:hover {
    background: none;
  }
`;

const Link = styled(NavLink)`
  color: #fff !important;

  &:hover {
    background: none;
    color: rgba(0, 125, 117, 1) !important;
  }
`;

type Props = {
  courses?: Course[];
};

const Navigation = ({ courses }: Props) => {
  const [visible, changeVisible] = useState(false);

  const handleVisibleChange = useCallback(
    (flag) => {
      changeVisible(flag);
    },
    [changeVisible]
  );

  const coursesItem = useMemo(
    () => (
      <StyledMenu onClick={() => changeVisible(false)}>
        {courses?.map((item) => (
          <MenuItem key={item.id}>
            <Link to={`/course/${item.id}`}>{item.title}</Link>
          </MenuItem>
        ))}
      </StyledMenu>
    ),
    [courses]
  );

  return (
    <Fragment>
      <StyledDropdown
        overlay={coursesItem}
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <NavItem active={visible} to="/courses">
          <KnowledgeIcon />
          <LinkText>
            Курсы <DownOutlined />
          </LinkText>
        </NavItem>
      </StyledDropdown>
      <NavItem to="/my-courses/">
        <GroupIcon />
        <LinkText>Моё обучение</LinkText>
      </NavItem>
    </Fragment>
  );
};

export default Navigation;
