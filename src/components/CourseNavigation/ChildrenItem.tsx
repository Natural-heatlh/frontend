import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { ReactComponent as PapersIcon } from '../../static/papers.svg';
import { ReactComponent as PlayIcon } from '../../static/play.svg';


interface LinkProps extends NavLinkProps {
  disabled?: boolean;
}

const LinkWrapper = styled(NavLink)<LinkProps>`
  //fix
  color: rgba(38, 38, 38, 1);
  padding: 12px 15px;
  position: relative;

  &.${(props) => props.activeClassName} {
    background: #ebf5f4;

    &:hover {
      background: #ebf5f4;
    }
  }

  ${props => props.disabled && `
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.01);
    }
  `}

  &:hover {
    color: rgba(38, 38, 38, 1);
    background: rgba(242, 243, 245, 1);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Title = styled.span`
  font-size: 14px;
  line-height: 14px;
  margin-left: 10px;
`;

const Additional = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const AdditionalItem = styled.div`
  display: flex;
  align-items: center;
  padding-left: 7px;
  padding-right: 7px;
`;

const AdditionalContent = styled.span`
  margin-left: 5px;
`;

type Props = {
  index: number;
  item?: any;
  courseUrl: string;
  isPassed?: boolean;
  disabled?: boolean;
};

const ChildrenItem = ({
  index,
  item,
  courseUrl,
  isPassed,
  disabled
}: Props) => {
  return (
    <LinkWrapper
      activeClassName="active"
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      disabled={disabled}
      to={`${courseUrl}/lecture/${item.id}`}
    >
      <TitleWrapper>
        <Checkbox checked={isPassed} />
        <Title>
          {index + 1}. {item.title}
        </Title>
      </TitleWrapper>
      <Additional>
        {item.slides && (
          <>
            <AdditionalItem>
              <PapersIcon />
              <AdditionalContent>{item.slides.length} стр.</AdditionalContent>
            </AdditionalItem>
            <span> | </span>
          </>
        )}
        <AdditionalItem>
          <PlayIcon />
          <AdditionalContent>3 мин.</AdditionalContent>
        </AdditionalItem>
      </Additional>
    </LinkWrapper>
  );
};

export default ChildrenItem;
