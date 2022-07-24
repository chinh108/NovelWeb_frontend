import React, { Fragment } from 'react';
import Head from 'next/head';
import Footer from '../Footer';
import Narbar from '../Navbar';

type Props = {
  headData?: any;
  children: any;
  customClass?: string;
  menuExpanded?: boolean;
};
const MainLayout = (props: Props) => {
  const { headData, children, customClass, menuExpanded } = props;

  return (
    <Fragment>
      <Head>{headData}</Head>
      <Narbar />
      <main id="mainLayout" className={`main-container ${customClass}`}>
        <div id="wrapper">
          {children}
        </div>
      </main>
    </Fragment>
  );
};

export default MainLayout;
