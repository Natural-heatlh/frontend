import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';
import { Section } from '../../graphql';
import SectionItem from './SectionItem';
import ChildItem from './ChildrenItem';

type Props = {
  sections: Section[];
  courseUrl: string;
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

const CourseNavigation = ({ sections, courseUrl }: Props) => {
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
                  {item.children?.map((child, index) => (
                    <ChildItem courseUrl={courseUrl} index={index} item={child} />
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
