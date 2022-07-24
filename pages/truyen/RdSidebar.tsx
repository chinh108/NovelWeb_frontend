import Loader from "@/components/loader";
import React, { Dispatch, useEffect } from "react";
import { Plus } from "react-feather";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { otherStories } from "redux/actions/detailStory";
import { getDiscussByStory } from "redux/actions/discussAction";
import { categoryDiscuss, categoryDiscussColor } from "redux/constants";
import { Action } from "types";
import { Payload } from "types/action";
import OtherAuthor from "./OtherAuthor";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function RdSidebar(props: any) {
  const {
    story,
    otherStories,
    getOtherSotriesAction,
    isLoadingOther,
    getDiscussAction,
    isLoadingDiscuss,
    discuss,
  } = props;

  useEffect(() => {
    if (story.id) {
      getOtherSotriesAction({
        params: { id: story.id },
      });
      getDiscussAction({
        params: { storyId: story.id },
      });
    }
  }, [story.id]);

  return (
    <>
      <Row>
        <Col xs={12} md={6} lg={12} className="no-push no-push-l push-3-m">
          <section className="series-users">
            <main>
              <div className="series-owner group-mem">
                <img
                  width="50px"
                  height="50px"
                  src={story.user?.avatar || '/images/avatar.png'}
                  alt={story.user?.name || story.user?.username}
                />
                <div className="series-owner-title">
                  <span className="series-owner_name">
                    <a href="#">{story.user?.name || story.user?.username}</a>
                  </span>
                </div>
              </div>
              <div className="fantrans-section">
                <div className="fantrans-name">Nhóm dịch</div>
                <div className="fantrans-value">
                  <a href="#">{story.group}</a>
                </div>
              </div>
            </main>
          </section>
        </Col>
      </Row>
      <section className="series-note basic-section gradual-mobile">
        <header className="sect-header">
          <span className="sect-title">Chú thích thêm</span>
          <span className="mobile-icon">
            <i className="fas fa-chevron-down"></i>
          </span>
        </header>
        <main className="d-lg-block" style={{ display: "none" }}>
          <div
            className="long-text"
            style={{ wordWrap: "break-word" }}
            dangerouslySetInnerHTML={{ __html: story.extra || "" }}
          />
        </main>
      </section>
      <section className="basic-section gradual-mobile">
        <header className="sect-header">
          <span className="sect-title">Truyện cùng nhóm dịch</span>
          <span className="mobile-icon">
            <i className="fas fa-chevron-down"></i>
          </span>
        </header>
        <main className="d-lg-block" style={{ display: "none" }}>
          <ul className="others-list">
            {isLoadingOther && <Loader />}
            {otherStories.map((item: any) => (
              <OtherAuthor key={item.id} story={item} />
            ))}
          </ul>
        </main>
      </section>

      <section className="basic-section gradual-mobile">
        <header className="sect-header">
          <span className="sect-title">Thảo luận</span>
          <span className="mobile-icon">
            <i className="fas fa-chevron-down"></i>
          </span>
        </header>
        <main className="d-lg-block" style={{ display: "none" }}>
          {isLoadingDiscuss && <Loader />}
          {discuss.map((item: any) => (
            <div
              className="relate-topic clear"
              style={{ borderColor: categoryDiscussColor[item.category] }}
              key={item.id}
            >
              <h6 className="line-ellipsis">
                <a
                  href={`/thao-luan/${item.id}`}
                  className="relate-topic_title line-ellipsis"
                >
                  {item.title}
                </a>
              </h6>
              <div className="sub-line">
                <small
                  className="category-tag"
                  style={{ backgroundColor: categoryDiscussColor[item.category] }}
                >
                  {categoryDiscuss[item.category]}
                </small>

                <time
                  className="topic-time timeago"
                  title={new Date(item.createdAt).toString()}
                  dateTime={new Date(item.createdAt).toString()}
                >
                  {moment(item.createdAt).fromNow(true)}
                </time>
              </div>
            </div>
          ))}
          <div className="text-right pad-10">
            <a
              className="button button-newpost button-green"
              href="/admin/thao-luan/them-thao-luan"
              style={{ color: '#fff' }}
            >
              <Plus size={18} />
              Tạo bài viết
            </a>
          </div>
        </main>
      </section>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getOtherSotriesAction: (payload: Payload) => dispatch(otherStories(payload)),
  getDiscussAction: (payload: Payload) => dispatch(getDiscussByStory(payload)),
});

const mapStateToProps = (state: any) => {
  const { isLoadingOther, otherStories } = state.detailStoryReducer;
  const { isLoading, discuss } = state.discussReducer;
  return { isLoadingOther, otherStories, isLoadingDiscuss: isLoading, discuss };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(RdSidebar);
