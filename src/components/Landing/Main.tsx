import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import MainVector from '../../static/main-vector.svg';
import MainImg from '../../static/main-bg.png';
import Smartphone from '../../static/icons/1.svg';
import Tree from '../../static/icons/2.svg';
import Play from '../../static/icons/3.svg';
import CheckList from '../../static/icons/4.svg';
import FavoriteList from '../../static/icons/5.svg';
import Download from '../../static/icons/6.svg';

import Container from '../Container';

const advantages = [
  {
    icon: Smartphone,
    text: 'После изучения материала проходите тест для закрепления знаний'
  },
  {
    icon: Tree,
    text: 'Каждый курс имеет поэтапную систему обучения по разделам'
  },
  {
    icon: Play,
    text: 'Если не можете читать, то всегда можно слушать аудиолекции'
  },
  {
    icon: CheckList,
    text: 'После изучения материала проходите тест для закрепления знаний'
  },
  {
    icon: FavoriteList,
    text: 'Повышайте свой профессионализм, получая знания и сертификаты'
  },
  {
    icon: Download,
    text: 'После прохождения курса вы сможете скачать теоретический материал'
  }
];

const MainWrapper = styled.div`
  padding-top: 110px;
  padding-bottom: 110px;
  position: relative;
  min-height: 100vh;
  background: url(${MainVector});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left center;
  background-color: #fff;

  &::after {
    content: '';
    position: absolute;
    top: 70px;
    right: 0;
    width: calc(100% - 700px);
    height: 600px;
    background-image: url(${MainImg});
    background-position: center right;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const MainLeft = styled.div`
  max-width: 400px;
  width: 100%;
`;

const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  margin-bottom: 210px;
`;

const Title = styled.h1`
  font-size: 64px;
  line-height: 89px;
  font-family: Pattaya;
  margin-bottom: 15px;
  >span {
    color: #007D75;
  }
`;

const Welcome = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
`;

const AdvantagesWrapper = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

const Advantages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;

  > h3 {
    color: #fff;
    font-size: 24px;
    line-height: 31px;
    font-weight: bold;
    margin-bottom: 50px;
  }
`;

const Icon = styled.div<{
  icon: string;
}>`
  width: 67px;
  height: 67px;
  background-position: center center;
  background-size: contain;
  background-image: url(${(props) => props.icon});
  margin-bottom: 20px;
`;

const Advantage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  width: calc(100% / 3);
  text-align: center;
`;

const Main = () => {
  const advantagesList = useMemo(
    () =>
      advantages.map((item) => (
        <Advantage key={item.text}>
          <Icon icon={item.icon} />
          <p>{item.text}</p>
        </Advantage>
      )),
    []
  );

  return (
    <MainWrapper>
      <Container>
        <MainHeader>
          <MainLeft>
            <Title><span>А</span>кадемия</Title>
            <Welcome>
              Добро пожаловать на обучающий портал Natural Health Академия!
            </Welcome>
            <p>
              Здесь вы получите знания и навыки необходимые для успешного
              ведения бизнеса Natural Health. <br />
              <br />
              Для входа на портал электронного обучения нажмите кнопку "Перейти
              к обучению".
            </p>
            <StyledButton type="primary">
              <Link to="/courses/">
                Перейти к обучению
              </Link>

            </StyledButton>
          </MainLeft>
        </MainHeader>
        <Advantages>
          <h3>Преимущества обучения в Natural Health Академии</h3>
          <AdvantagesWrapper>{advantagesList}</AdvantagesWrapper>
        </Advantages>
      </Container>
    </MainWrapper>
  );
};

export default Main;
