import React, { useState } from "react";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function Comment(props: any) {
  const { comment, ownId, type } = props;
  const [showMore, setShowMore] = useState(true);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const renderTag = (comment: any) => {
    if (ownId === comment.createBy.id) {
      if (type === 1) { // truyen dich
        return 'Translator'
      }
      return 'Mod'
    }
    return ''
  }

  return (
    <div className="ln-comment-group" id={comment.id}>
      <div id="ln-comment" className="ln-comment-item clear">
        <div className="ln-comment-user_ava">
          <img src={comment.createBy?.avatar || '/images/avatar.png'} />
        </div>
        <div className="ln-comment-info">
          <div className="ln-comment-wrapper">
            <div className="ln-comment-user_name">
              <a href="#" className="strong">
                {comment.createBy?.name || comment.createBy?.username}
              </a>
              <div className="ln-comment-user_badge comment-mod">
                <b>{renderTag(comment)}</b>
              </div>
            </div>
            <div></div>
            <div
              className="ln-comment-content long-text"
              dangerouslySetInnerHTML={{ __html: comment.content }}
              style={
                showMore
                  ? { maxHeight: 100, overflow: "hidden" }
                  : { maxHeight: "none" }
              }
            />
            <div className={`comment_see_more ${showMore ? "expand" : ""}`} onClick={toggleShowMore}>
              {showMore ? "Xem thêm" : ""}
            </div>
          </div>
          <div className="visible-toolkit">
            <span className="ln-comment-time">
              <a href={`#${comment.id}`}>
                <time
                  className="timeago"
                  title={new Date(comment.createdAt).toString()}
                  dateTime={new Date(comment.createdAt).toString()}
                >
                  {moment(comment.createdAt).fromNow(true)}
                </time>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
