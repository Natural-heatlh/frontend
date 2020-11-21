import React, { Fragment } from 'react';
import Header from '../../components/Header';
import PageHead from '../../components/PageHead';

type Props = {
  pageTitle?: string;
  children?: React.ReactNode;
};

const PageContainer = ({ pageTitle, children, ...otherProps }: Props) => {
  return (
    <Fragment>
      <Header {...otherProps} />
      <PageHead>{pageTitle}</PageHead>
      {children}
    </Fragment>
  );
};

export default PageContainer;
