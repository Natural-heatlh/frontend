import React from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';

const StyledPageContainer = styled(PageContainer)`
  min-height: 100vh;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100vh - 160px);
  font-weight: bold;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 100px;
    display: block;
    margin-bottom: 50px;
  }
  p {
    display: block;
  }
`;

const NotFound = () => {
  return (
    <StyledPageContainer pageTitle="Страница не найдена">
      <Content>
        <span>404</span>
        <p>
          К сожалению запрашиваемая страница не найдена. Для перехода на главную
          страницу нажмите <a href="/courses">сюда</a>
        </p>
      </Content>

    </StyledPageContainer>
  );
};

export default NotFound;
