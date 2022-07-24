import Link from "next/link";
import React, { Dispatch, useEffect } from "react";
import { Col, Row, Container } from "reactstrap";
import Carousel from 'react-multi-carousel';
import PopularThumb from "./PopularThumb";
import { Circle } from 'react-feather';
import { connect, ConnectedProps } from "react-redux";
import { Action } from "types";
import { Payload } from "types/action";
import Loader from "@/components/loader";
import { paginationStories } from "redux/actions/homeAction";
import { StoryConstant } from "redux/constants";
import { getDiscuss } from "redux/actions/discussAction";
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

const DailyRecentViews = (props: PropsFromRedux) => {
  const {
    loadingTopStories,
    topStories,
    getTopStories,
    loadingDiscuss,
    discuss,
    getDisscussAction
  } = props;

  useEffect(() => {
    getTopStories(
      {
        params: {
          page: 1,
          perPage: 8,
          type: [1,2,3],
          status: [1,2,3],
          sort: 'viewCount'
        }
      },
      StoryConstant.TOP_STORIES
    )
    getDisscussAction({ params: { perPage: 8, category: 'all' }})
  }, [])

  return (
    <Container fluid="lg" className="daily-recent-container">
      <Row>
        <Col xs={12} lg={9}>
          <div className="daily-recent_views">
            <header className="title">
              <span className="top-tab_title title-active">Nổi bật</span>
            </header>
            <div className="tns-outer" id="tns1-ow">
              {loadingTopStories && <Loader />}
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024
                    },
                    items: 4,
                    partialVisibilityGutter: 40
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                  }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={true}
                sliderClass=""
                slidesToSlide={2}
                swipeable
              >
                {(topStories as any[]).map((item) => (
                  <PopularThumb key={item.id} story={item} />
                ))}
              </Carousel>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={3}>
          <section className="last-topics index-section">
            <header className="section-title">
              <Link href={{
                pathname: "/thao-luan"
              }}>
                <div>
                  <span className="sts-bold">Thảo</span>
                  <span className="sts-empty">Luận</span>
                </div>
              </Link>
            </header>
            <main>
              {loadingDiscuss && <Loader />}
              {discuss.map((item: any) => (
                <div key={item.id} className="topic-item" style={{ cursor: 'pointer' }}>
                  <Row>
                    <Col xs={9} className="line-ellipsis">
                      <Circle size={18} color="#1ee865" />
                      <Link href={{ pathname: '/thao-luan/[id]', query: { id: item.id }
                      }}>
                        <span>{item.title}</span>
                      </Link>
                    </Col>
                    <Col xs={3} className="topic-data text-right">
                      <time
                        className="timeago"
                        title={new Date(item.createdAt).toString()}
                        dateTime={new Date(item.createdAt).toString()}
                      >
                        {moment(item.createdAt).fromNow(true)}
                      </time>
                    </Col>
                  </Row>
                </div>
              ))}
            </main>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  const {
    loadingTopStories,
    topStories,
  } = state.homeReducer;
  const {
    discuss,
    isLoading
  } = state.discussReducer;
  return {
    loadingTopStories,
    topStories,
    discuss,
    loadingDiscuss: isLoading
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getTopStories: (payload: Payload, type: string) => dispatch(paginationStories(payload, type)),
  getDisscussAction: (payload: Payload) => dispatch(getDiscuss(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DailyRecentViews);
