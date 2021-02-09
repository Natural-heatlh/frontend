import React, {
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LinkProps, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as KnowledgeIcon } from '../../static/knowledge.svg';
import { ReactComponent as GroupIcon } from '../../static/group.svg';
import { Course, UserCourse } from '../../graphql';
import {
  checkCourseAvailable,
  CheckProps,
  getAvailableOfPrev
} from '../../utils/checkCourseAvailable';
import { AuthContext } from '../Auth/AuthCheck';

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

const Link = styled(NavLink)<{ isPublished?: boolean | null }>`
  color: #fff !important;

  &:hover {
    background: none;
    color: rgba(0, 125, 117, 1) !important;
  }

  ${(props) =>
    !props.isPublished &&
    `
    color: rgba(255, 255, 255, 0.3) !important;

    &:hover {
      color: rgba(255, 255, 255, 0.3) !important;
    }
  `}
`;

type Props = {
  courses?: Course[];
};

const Navigation = ({ courses }: Props) => {
  const [visible, changeVisible] = useState(false);
  const user = useContext(AuthContext);

  const handleVisibleChange = useCallback(
    (flag) => {
      changeVisible(flag);
    },
    [changeVisible]
  );

  const coursesItems = useMemo(
    () => (
      <StyledMenu onClick={() => changeVisible(false)}>
        {courses?.map((item) => {
          const options: CheckProps = {
            isPublished: item?.isPublished as boolean,
            userStatus: user?.status as number,
            courseStatus: item?.level as number,
            isAvailableOfPrev: getAvailableOfPrev(
              user?.courses as UserCourse[],
              item?.level as number
            )
          };

          const [isAccessible] = checkCourseAvailable(options);

          return (
            <MenuItem key={item.courseId}>
              <Link
                isPublished={isAccessible}
                onClick={!isAccessible ? (e) => e.preventDefault() : undefined}
                to={`/presentation/${item.courseId}`}
              >
                {item.title}
              </Link>
            </MenuItem>
          );
        })}
      </StyledMenu>
    ),
    [courses, user]
  );

  return (
    <Fragment>
      <StyledDropdown
        overlay={coursesItems}
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <NavItem active={visible} to="/courses">
          <KnowledgeIcon />
          <LinkText>
            Курсы <DownOutlined size={10} />
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
