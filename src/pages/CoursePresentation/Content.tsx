import React from 'react';
import styled from 'styled-components';
import parser from 'html-react-parser';
import { Collapse } from 'antd';
import { Section } from '../../graphql';

const { Panel } = Collapse;

const Wrapper = styled.div`
  padding-top: 50px;
  display: flex;
`;

const ContentLeft = styled.div`
  padding-top: 20px;
  width: 50%;
  padding-right: 10px;
`;
const ContentRight = styled.div`
  width: 50%;
  padding-left: 10px;
`;

const SectionName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const LectureName = styled.div`
  margin-bottom: 20px;
  padding-left: 25px;
`;

const StyledPanel = styled(Panel)`
  border-bottom: 1px solid #DEDFE0;
`;

type Props = {
  longDescription: string;
  sections: Section[];
};

const Content = ({ longDescription, sections }: Props) => {
  console.log(sections);
  return (
    <Wrapper>
      <ContentLeft>{parser(longDescription)}</ContentLeft>
      <ContentRight>
        {sections ? (
          <Collapse defaultActiveKey={sections[0]?.sectionId} accordion ghost>
            {sections.map((item, index) => (
              <StyledPanel key={item.sectionId} header={<SectionName>Раздел {index+1}: {item.title}</SectionName>}>
                {item.children?.map((child, index) => (
                  <LectureName>{index + 1}. {child?.title}</LectureName>
                ))}
              </StyledPanel>
            ))}
          </Collapse>
        ) : null}
      </ContentRight>
    </Wrapper>
  );
};

export default Content;
