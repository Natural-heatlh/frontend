import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';
import { Section } from '../../graphql';
import SectionItem from './SectionItem';
import ChildItem from './ChildrenItem';

type Props = {
  sections: Section[];
};

const SectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dedfe0;
  max-width: 320px;
  width: 100%;
`;

const { Panel } = Collapse;

const StyledPanel = styled(Panel)`
  border-radius: 0;
  width: 100%;
  border-left: none;
  border-right: none;
  padding: 0;

  .ant-collapse-content-box {
    padding: 0;
  }
`;

const StyledCollapse = styled(Collapse)`
  border-top: none;
  border-left: none;
  border-right: none;
`;

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const sections = [
  {
    id: '1',
    title: 'Раздел 1'
  },
  {
    id: '2',
    title: 'Раздел 2'
  },
  {
    id: '3',
    title: 'Раздел 3'
  },
  {
    id: '4',
    title: 'Раздел 4'
  },
  {
    id: '5',
    title: 'Раздел 5'
  }
];

const childrenSome = [
  { id: '1', title: 'Ввведение', slidesCount: 23, audioDuration: 5 },
  { id: '2', title: 'Чайлд 2', slidesCount: 23, audioDuration: 5 },
  { id: '2', title: 'Чайлд 3', slidesCount: 23, audioDuration: 25 },
  { id: '2', title: 'Чайлд 4', slidesCount: 13, audioDuration: 9 },
  { id: '2', title: 'Чайлд 5', slidesCount: 3, audioDuration: 15 }
];

const CourseNavigation = ({ sections }: Props) => {
  return (
    <SectionsWrapper>
      <StyledCollapse accordion expandIconPosition="right">
        {sections.length > 0
          ? sections.map((item) => (
              <StyledPanel
                key={item.id}
                header={
                  <SectionItem
                    id={item.id}
                    title={item.title}
                    count={item.children?.length}
                  />
                }
              >
                <ChildrenWrapper>
                  {childrenSome?.map((child, index) => (
                    <ChildItem
                      index={index}
                      item={child}
                    />
                  ))}
                </ChildrenWrapper>
              </StyledPanel>
            ))
          : null}
      </StyledCollapse>
    </SectionsWrapper>
  );
};

export default CourseNavigation;
