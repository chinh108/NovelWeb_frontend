import Comments from "@/components/Comments";
import MainLayout from "@/components/layout/mainLayout";
import Loader from "@/components/loader";
import TopGroup from "@/components/TopGroup";
import { useRouter } from "next/router";
import React, { Dispatch, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { getDetailStory } from "redux/actions/detailStory";
import { Action } from "types";
import { Payload } from "types/action";
import DanhSachChuong from "./DanhSachChuong";
import Info from "./Info";
import RdSidebar from "./RdSidebar";

function Truyen(props: PropsFromRedux) {
  const { getDetailStoryAction, isLoading, story } = props;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getDetailStoryAction({ params: { id }})
  }, []);

  return (
    <MainLayout>
      <TopGroup />
      <Container className="mt-3">
        <Row className="d-block clearfix">
          <Col xs={12} lg={9} className="float-left">
            {isLoading && <Loader />}
            <Info story={story} />
          </Col>
          <Col xs={12} lg={3} className="float-right" id="rd-sidebar">
            <RdSidebar story={story} />
          </Col>
          <Col xs={12} lg={9} className="float-left">
            <DanhSachChuong chappers={story?.chappers || []} avatar={story?.avatar || ''}/>
            <Comments storyId={story.id} ownId={story.user?.id} type={story.type} />
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getDetailStoryAction: (payload: Payload) => dispatch(getDetailStory(payload))
});

const mapStateToProps = (state: any) => {
  const { isLoading, story } = state.detailStoryReducer;
  return { isLoading, story };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Truyen);
