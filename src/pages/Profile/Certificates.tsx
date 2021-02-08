import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Image } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import axios from '../../helpers/axios';
import { AuthContext } from '../../components/Auth/AuthCheck';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const CertificateLink = styled.div`
  display: block;
  max-width: 300px;
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

const Certificate = styled(Image)`
  width: 100%;
`;

const CertificateWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background: #55beb6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
`;

const CertificateName = styled.div`
  position: absolute;
  left: 50%;
  top: 20%;
  font-weight: bold;
  transform: translateX(-50%);
`;

const transition = {
  repeat: Infinity,
  duration: 2
};

const Certificates = () => {
  const user = useContext(AuthContext);
  const [certificates, updateCertificates] = useState(user?.certificates || []);
  const [isFetching, setIsFetching] = useState(false);

  const handleRefetchCertificate = useCallback(
    async (id?: string | null) => {
      try {
        setIsFetching(true);
        const result = await axios.post('/generate-certificate', {
          courseId: id,
          email: user?.email
        });

        if (result.data?.certificate) {
          updateCertificates(
            certificates.map((item) =>
              item?.courseId === id
                ? { ...item, url: result.data?.certificate }
                : item
            )
          );
        }
        setIsFetching(false);
      } catch (e) {
        console.log(e);
      }
    },
    [setIsFetching, updateCertificates, certificates, user]
  );

  return (
    <Wrapper>
      {certificates?.map((item) =>
        item?.url ? (
          <CertificateLink>
            <Certificate src={item.url} />
          </CertificateLink>
        ) : (
          <CertificateWrapper
            onClick={() => handleRefetchCertificate(item?.courseId)}
          >
            <CertificateName>Сертификат - {item?.name}</CertificateName>
            <motion.div
              animate={isFetching ? { rotate: 360 } : undefined}
              transition={transition}
            >
              <ReloadOutlined style={{ fontSize: '48px' }} />
            </motion.div>
          </CertificateWrapper>
        )
      )}
    </Wrapper>
  );
};

export default Certificates;
