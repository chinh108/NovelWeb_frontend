import React from 'react';
import '../assets/scss/theme.scss';
import App, { AppProps } from 'next/app';
import { connect } from 'react-redux';
import { wrapper } from 'redux/store';
import { Store } from 'redux';
import Cookies from 'cookie';
import { END, Task } from 'redux-saga';
import { isBrowser } from 'shared/utils';
import { CookiesStorage } from 'shared/config/cookie';
import { getCurrentUser } from 'redux/actions';
import { ToastContainer } from 'react-toastify';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <ToastContainer />
    <Component {...pageProps} />
  </>
);

const mapDispatchToProps = () => ({});

const withConnect = connect(null, mapDispatchToProps);
interface SagaStore extends Store {
  sagaTask: Task;
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const {
    ctx: { req },
  } = appContext;
  if (isBrowser()) {
    const accessToken = CookiesStorage.getAccessToken();
    if (accessToken) {
      const state = store.getState();
      if (!state.authReducer?.user?.id) {
        store.dispatch(getCurrentUser({ params: { accessToken } }));
      }
    }
  } else {
    const { accessToken } = Cookies.parse(req?.headers.cookie || '');
    if (accessToken) {
      store.dispatch(getCurrentUser({ params: { accessToken } }));
      store.dispatch(END);
      await (store as SagaStore).sagaTask.toPromise();
    }
  }
  return { ...appProps };
});

export default wrapper.withRedux(withConnect(MyApp));
