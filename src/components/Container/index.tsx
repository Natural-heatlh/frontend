import { Layout } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

const Container = styled(Content)`
  display: block;
  max-width: 1200px;
  margin: 0 auto;

  @media(max-width: 1200px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export default Container;
