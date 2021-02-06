import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CoinIcon } from '../../static/coins.svg';
import Container from '../../components/Container';

const Wrapper = styled.div<{ withTitleMargin?: boolean }>`
  height: 350px;
  width: 100%;
  display: flex;
  background: #ebf5f4;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const CourseTitle = styled.h1`
  font-size: 36px;
  line-height: 45px;
`;

const HeadDescription = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 85px;
`;

const IncomeDescription = styled.span`
  font-size: 12px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #8c8c8c;
`;

const StyledCoinIcon = styled(CoinIcon)`
  margin-right: 8px;
`;

const HeaderLeft = styled.div`
  width: 65%;
  height: 100%;
`;

const HeaderRight = styled.div`
  width: 35%;
  padding-left: 20px;
  height: 100%;
  background-size: contain;
  background-position: center center;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Image = styled.img`
  max-width: 100%;
  width: 100%;
`;

type Props = {
  children?: React.ReactNode;
  description?: string;
  income?: string;
  image?: string;
};

const PresentationPageHead = ({
  children,
  description,
  income,
  image
}: Props) => {
  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <HeaderLeft>
            <CourseTitle>{children}</CourseTitle>
            <HeadDescription>{description}</HeadDescription>
            <IncomeDescription>
              <StyledCoinIcon />
              {income}
            </IncomeDescription>
          </HeaderLeft>
          <HeaderRight>
            <Image src={image} />
          </HeaderRight>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
};

export default PresentationPageHead;
