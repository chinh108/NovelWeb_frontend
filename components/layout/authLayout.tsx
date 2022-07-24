import React, { Fragment } from 'react';
import Head from 'next/head';
import NarbarAuth from '../NavbarAuth';

type Props = {
  headData?: any;
  children: any;
  customClass?: string;
  menuExpanded?: boolean;
};
const AuthLayout = (props: Props) => {
  const { headData, children, customClass, menuExpanded } = props;

  return (
    <Fragment>
      <Head>{headData}</Head>
      <NarbarAuth />
      <hr style={{ margin: 0 }}/>
      <main id="mainLayout" className={`main-container ${customClass}`}>
        <div id="wrapper">
          {children}
        </div>
      </main>
    </Fragment>
  );
};

export default AuthLayout;
