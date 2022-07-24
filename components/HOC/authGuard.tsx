import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { isBrowser } from 'shared/utils';
import Loader from 'components/loader';
import { useRouter } from 'next/router';
import { RouterPath } from 'shared/constant/common';
import { CookiesStorage } from 'shared/config/cookie';

const AuthGuard = (Component: any) => {
  const WrappedComponent = (props: any) => {
    const { isGettingMe, currentUser } = props;
    const router = useRouter();

    if (isGettingMe) {
      return <Loader />;
    }

    if (isBrowser()) {
      if (!currentUser?.id) {
        router.replace(RouterPath.Login);
        CookiesStorage.clearAccessToken();
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

export default AuthGuard;
