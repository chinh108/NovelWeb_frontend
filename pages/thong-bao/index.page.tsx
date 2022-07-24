import Footer from '@/components/Footer'
import MainLayout from '@/components/layout/mainLayout'
import Loader from '@/components/loader'
import TopGroup from '@/components/TopGroup'
import Link from 'next/link'
import React, { Dispatch, useEffect } from 'react'
import { connect } from 'react-redux'
import { Alert, Container } from 'reactstrap'
import { getNotification } from 'redux/actions/notificationActions'
import { cleanHtml } from 'shared/utils'
import { Action } from 'types'
import { Payload } from 'types/action'

function Notification(props: any) {
  const { getNotification, currentUser, notifications = [], isLoading } = props;

  const getComments = (key: string, id: string) => {
    getNotification();
  };

  useEffect(() => {
    getComments("createBy._id", currentUser?.id);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

  return (
    <MainLayout customClass="tim-kiem">
      <TopGroup />
        <main id="mainpart" className="search-page" style={{ minHeight: 500 }}>
          <Container fluid='lg'>
            {isLoading && <Loader />}
          <section className="basic-section noti-section">
            {!notifications.length ? (
              <main className="sect-body">
                Không có thông báo
              </main>
            ) : notifications.map((item: any) => (
              <Link href={item.url} key={item.id}>
                <Alert color="secondary" className='m-2' style={{ cursor: 'pointer' }}>
                  {cleanHtml(item.content)}
                </Alert>
              </Link>
            ))}
            </section>
          </Container>
        </main>
      <Footer />
    </MainLayout>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getNotification: (payload: Payload) => dispatch(getNotification(payload)),
});

const mapStateToProps = (state: any) => {
  const { user } = state.authReducer;
  const { notifications, isLoading } = state.notificationReducer;
  return { currentUser: user, notifications, isLoading };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Notification);
