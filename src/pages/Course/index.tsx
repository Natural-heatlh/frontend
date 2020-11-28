import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import CourseNavigation from '../../components/CourseNavigation';
import Preloader from '../../components/Preloader';
import PageContainer from '../../components/PageContainer';
import CourseContent from '../../components/CourseContent';
import query from './query.graphql';

const CourseWrapper = styled.div`
  display: flex;
`;

const StyledPageContainer = styled(PageContainer)`
  background: #fff;
`;

const Course = (props: any) => {
  const { id } = props.match.params;

  const { data, loading, error } = useQuery(query.CourseQuery, {
    variables: {
      id
    }
  });

  if (loading) return <Preloader />;

  return (
    <StyledPageContainer pageTitle={data.course.title} withTitleMargin={false}>
      <CourseWrapper>
        <CourseContent />
        <CourseNavigation sections={data.course.sections} />
      </CourseWrapper>
    </StyledPageContainer>
  );
};

export default Course;
