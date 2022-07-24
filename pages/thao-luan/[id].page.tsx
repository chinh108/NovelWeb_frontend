import MainLayout from "@/components/layout/mainLayout";
import PageBreadcrumb from "@/components/pageBreadcrumb";
import TopGroup from "@/components/TopGroup";
import React, { Dispatch, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import Comments from "@/components/Comments";
import { useRouter } from "next/router";
import { Action } from "types";
import { Payload } from "types/action";
import { getdiscussId } from "redux/actions/discussAction";
import { connect, ConnectedProps } from "react-redux";
import Loader from "@/components/loader";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function DiscussDetail(props: PropsFromRedux) {
  const { isLoading, discuss, getDetailDiscuss } = props;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getDetailDiscuss({ params: { id } });
  }, []);
  return (
    <MainLayout customClass="discuss-detail">
      <TopGroup />
      <main id="mainpart" className="custome-page" style={{ minHeight: 782 }}>
        <PageBreadcrumb name="Thảo luận" link="/thao-luan" />
        <Container>
          {isLoading && <Loader />}
          <section className="page-content basic-section">
            <header className="sect-header">
              <span className="sect-title">
                <a href={`/thao-luan/${id}`}>{discuss.title}</a>
              </span>
            </header>
            <main className="sect-body">
              <Row>
                <Col xs={8}>
                  <div className="page-author group-admin">
                    <div className="author_ava">
                      <img src={discuss.user?.avatar || '/images/avatar.png'} />
                    </div>
                    <div className="author-info">
                      <div className="author_name">
                        <a href="#">
                          {discuss.user?.name || discuss.user?.username}
                        </a>
                      </div>
                      {/* <div className="author_role"><span>Administrators</span></div> */}
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <time
                    className="topic-time timeago"
                    title={new Date(discuss.createdA || 0).toString()}
                    dateTime={new Date(discuss.createdAt || 0).toString()}
                  >
                    {moment(discuss.createdAt || 0).fromNow(true)}
                  </time>
                </Col>
              </Row>
              <div className="forum-page-content long-text">
                <p dangerouslySetInnerHTML={{ __html: discuss.content }}></p>
              </div>
            </main>
          </section>
          <Comments ownId={discuss.createBy} discussId={discuss.id} />
        </Container>
      </main>
    </MainLayout>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getDetailDiscuss: (payload: Payload) => dispatch(getdiscussId(payload)),
});

const mapStateToProps = (state: any) => {
  const { isLoading, detailDiscuss } = state.discussReducer;
  return { isLoading, discuss: detailDiscuss };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DiscussDetail);
