import Loader from "@/components/loader";
import React, { Dispatch, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getRecentComments } from "redux/actions/commentAction";
import { Action } from "types";
import moment from "moment";
import "moment/locale/vi";
import { cleanHtml } from "shared/utils";
moment.locale("vi");

function RecentComment(props: PropsFromRedux) {
  const { isLoading, comments, getComments } = props;

  useEffect(() => {
    getComments();
  }, []);

  const renderLink = (comment: any) => {
    if (comment.storyId) {
      return `/truyen/${comment.storyId}`;
    }
    if (comment.discussId) {
      return `/thao-luan/${comment.discussId}`;
    }
    if (comment.chapperId) {
      return `/chap/${comment.chapperId}`;
    }
  };

  const renderTitle = (comment: any) => {
    if (comment.storyId) {
      return comment.story?.title;
    }
    if (comment.discussId) {
      return comment.discuss?.title;
    }
    if (comment.chapperId) {
      return comment.discuss?.title;
    }
  };

  return (
    <section id="recent-comments" className="index-section">
      <header className="section-title">
        <span className="sts-bold">Bình luận</span>
        <span className="sts-empty">gần đây</span>
      </header>
      <main className="sect-body pr-5">
        {isLoading && <Loader />}
        {comments.map((item: any) => (
          <div className="comment-item-at-index" key={item.id}>
            <div className="comment-info">
              <span className="series-name">
                <a href={renderLink(item)}>{renderTitle(item)}</a>
              </span>
              <div
                className="comment-content comment-ellipsis"
                style={{ maxHeight: 150 }}
              >
                {cleanHtml(item.content, 100)}
              </div>
              <div className="comment-top">
                <div className="comment-user_ava">
                  <a href="#">
                    <img
                      src={item.createBy.avatar || "images/avatar.png"}
                      alt="Commenter's avatar"
                    />
                  </a>
                </div>
                <a href="#" rel="nofollow" className="comment-user_name strong">
                  {item.createBy.name || item.createBy.username}
                </a>
                <small className="comment-location">
                  <a href="#">
                    <time
                      className="timeago"
                      title={new Date(item.createdAt).toString()}
                      dateTime={new Date(item.createdAt).toString()}
                    >
                      {moment(item.createdAt).fromNow(true)}
                    </time>
                  </a>
                </small>
              </div>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
}

const mapStateToProps = (state: any) => {
  const { isLoading, comments } = state.commentReducer;
  return {
    isLoading,
    comments,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getComments: () => dispatch(getRecentComments()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RecentComment);
