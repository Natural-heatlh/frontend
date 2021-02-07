import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import styled from 'styled-components';
import SuccessImg from '../../static/modals/success.png';
import FailImg from '../../static/modals/fail.png';
import { TestResult } from '../../graphql';

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  max-width: 110px;
  margin-bottom: 50px;

  img {
    max-width: 100%;
  }
`;

const Title = styled.h4`
  font-size: 21px;
  line-height: 34px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  max-width: 285px;
  width: 100%;
  margin-bottom: 50px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

type Props = {
  isVisible: boolean;
  isFree?: boolean | null;
  handleReset: () => void;
  handleContinue: () => void;
  getCertificate?: () => void;
  results: TestResult;
};

const FinishModal = ({
  isVisible,
  handleReset,
  results,
  handleContinue,
  getCertificate,
  isFree
}: Props) => {
  const sum = Number(results.wrong) + Number(results.correct);

  return (
    <Modal
      width={384}
      bodyStyle={{
        paddingTop: '50px',
        paddingBottom: '50px',
        paddingLeft: '30px',
        paddingRight: '30px'
      }}
      centered
      visible={isVisible}
      onCancel={!results.isCompleted ? handleReset : handleContinue}
      footer={null}
    >
      <ModalContent>
        {isFree ? (
          <Fragment>
            {results.isCompleted ? (
              <Fragment>
                <ImageWrapper>
                  <img src={SuccessImg} alt="Поздравляем!" />
                </ImageWrapper>
                <Title>Поздравляем!</Title>
                <Description>
                  Вы успешно прошли курс обучения “Для начинающих”
                </Description>

                <StyledButton onClick={handleContinue} type="primary">
                  Продолжить обучение
                </StyledButton>
              </Fragment>
            ) : (
              <Fragment>
                <ImageWrapper>
                  <img src={FailImg} alt="Повторите попытку" />
                </ImageWrapper>

                <Title>Вы набрали {results.correct} из {sum} вопросов</Title>
                <Description>
                  К сожалению, этого недостаточно, чтобы перейти к следующему
                  курсу. <br /> <br /> Вы можете повторить попытку или вернуться
                  к обучению.
                </Description>

                <StyledButton onClick={handleReset} type="primary">
                  Повторить попытку
                </StyledButton>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {results.isCompleted ? (
              <Fragment>
                <Fragment>
                  <ImageWrapper>
                    <img src={SuccessImg} alt="Поздравляем!" />
                  </ImageWrapper>
                  <Title>Поздравляем!</Title>
                  <Description>
                    Вы успешно прошли курс обучения.
                  </Description>

                  <StyledButton style={{ marginBottom: "20px" }} onClick={handleContinue} type="primary">
                    Продолжить обучение
                  </StyledButton>

                  <StyledButton onClick={getCertificate} type="primary">
                    Получить сертификат
                  </StyledButton>
                </Fragment>
              </Fragment>
            ) : (
              <Fragment>
                <ImageWrapper>
                  <img src={FailImg} alt="Повторите попытку!" />
                </ImageWrapper>

                <Title>Вы набрали {results.correct} из {sum} вопросов</Title>
                <Description>
                  К сожалению, этого недостаточно, чтобы перейти к следующему
                  курсу. <br /> <br /> Вы можете повторить попытку или вернуться
                  к обучению.
                </Description>

                <StyledButton onClick={handleReset} type="primary">
                  Повторить попытку
                </StyledButton>
              </Fragment>
            )}
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FinishModal;
