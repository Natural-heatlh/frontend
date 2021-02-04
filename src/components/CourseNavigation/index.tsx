import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';
import { Section } from '../../graphql';
import SectionItem from './SectionItem';
import ChildItem from './ChildrenItem';

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

type Props = {
  sections: Section[];
  courseUrl: string;
  progress: string[];
  activeSectionKey?: string;
  isCompletedTillTest?: boolean;
};

const CourseNavigation = ({
  activeSectionKey,
  sections,
  courseUrl,
  progress,
  isCompletedTillTest
}: Props) => {
  const [activeKey, setActive] = useState(activeSectionKey);

  const handleChangeActiveKey = useCallback(
    (e) => {
      if (e.length > 0) {
        setActive(e[e.length - 1]);
      }
    },
    [setActive]
  );

  useEffect(() => {
    setActive(activeSectionKey);
  }, [activeSectionKey]);

  return (
    <SectionsWrapper>
      <StyledCollapse
        onChange={handleChangeActiveKey}
        activeKey={activeKey}
        expandIconPosition="right"
      >
        {sections.length > 0
          ? sections.map((item, i) => (
              <StyledPanel
                key={item.sectionId}
                header={
                  <SectionItem
                    id={item.sectionId}
                    index={i + 1}
                    title={item.title}
                    count={item.children?.length}
                  />
                }
              >
                <ChildrenWrapper>
                  {item.children?.map((child, index) =>
                    child ? (
                      <ChildItem
                        isPassed={progress.includes(child.lectureId as string)}
                        key={child.lectureId}
                        courseUrl={courseUrl}
                        index={index}
                        item={child}
                        disabled={child.type === 'Test' && !isCompletedTillTest}
                      />
                    ) : null
                  )}
                </ChildrenWrapper>
              </StyledPanel>
            ))
          : null}
      </StyledCollapse>
    </SectionsWrapper>
  );
};

export default CourseNavigation;
