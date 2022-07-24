import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { isBrowser } from 'shared/utils';
import Loader from 'components/loader';
import { useRouter } from 'next/router';
import { RouterPath } from 'shared/constant/common';

const NoAuthGuard = (Component: any) => {
  const WrappedComponent = (props: any) => {
    const { isGettingMe, currentUser } = props;
    const router = useRouter();

    if (isGettingMe) {
      return <Loader />;
    }

    if (isBrowser()) {
      if (currentUser?.id
          && (router.pathname === RouterPath.Login || RouterPath.Register)) {
        router.replace(RouterPath.Admin);
        return <Loader />;
      }
    }

    return <Component {...props} />;
  };

  const mapStateToProps = (state: RootState, ownProps: any) => {
    return {
      ...ownProps,
      currentUser: state.authReducer.user,
      isGettingMe: state.authReducer.isGettingMe,
    }
  };

  const connector = connect(mapStateToProps);
  return connector(WrappedComponent) as any;
};

export default NoAuthGuard;
