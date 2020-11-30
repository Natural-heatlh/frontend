import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { ReactComponent as PapersIcon } from '../../static/papers.svg';
import { ReactComponent as PlayIcon } from '../../static/play.svg';

const LinkWrapper = styled(NavLink)`
  //fix
  color: rgba(38, 38, 38, 1);
  padding: 12px 15px;

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
};

const ChildrenItem = ({ index, item }: Props) => {
  return (
    <LinkWrapper to="/#">
      <TitleWrapper>
        <Checkbox />
        <Title>
          {index + 1}. {item.title}
        </Title>
      </TitleWrapper>
      <Additional>
        <AdditionalItem>
          <PapersIcon />
          <AdditionalContent>22 стр.</AdditionalContent>
        </AdditionalItem>
        <span> | </span>
        <AdditionalItem>
          <PlayIcon />
          <AdditionalContent>3 мин.</AdditionalContent>
        </AdditionalItem>
      </Additional>
    </LinkWrapper>
  );
};

export default ChildrenItem;