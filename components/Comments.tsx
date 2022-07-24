import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { createComment, getComments } from "redux/actions/commentAction";
import { Action } from "types";
import { Payload } from "types/action";
import Comment from "./Comment";
import CommentInput from "./Input/CommentInput";
import Loader from "./loader";

function Comments(props: any) {
  const {
    currentUser,
    storyId,
    discussId,
    chapperId,
    getCommentsAction,
    comments,
    type,
    isLoading,
    ownId,
    createCommentAction
  } = props;

  useEffect(() => {
    let by = "storyId";
    if (discussId) by = "discussId";
    if (chapperId) by = "chapperId";
    if (storyId || discussId || chapperId) {
      getCommentsAction({
        params: {
          id: storyId ?? discussId ?? chapperId,
          by,
        },
      });
    }
  }, [storyId, discussId, chapperId]);

  const hanldeCreateComment = (content: string) => {
    createCommentAction({
      params: {
        storyId,
        discussId,
        chapperId,
        content
      }
    })
  }

  return (
    <section className="basic-section" id="chapter-comments">
      <main>
        <section className="ln-comment">
          <header>
            <h3>{comments.length} Bình luận </h3>
          </header>
          <main className="ln-comment-body">
            {!currentUser.id ? (
              <div className="ln-comment_sign-in long-text">
                Bạn phải <a href="/dang-nhap">đăng nhập</a> hoặc{" "}
                <a href="/dang-ky">tạo tài khoản</a> để bình luận.
              </div>
            ) : (
              <>{ownId ? <CommentInput onSubmit={hanldeCreateComment} /> : ''}</>
            )}
            {isLoading && <Loader />}
            {comments.map((item: any) => (
              <Comment key={item.id} comment={item} ownId={ownId} type={type} />
            ))}
          </main>
        </section>
      </main>
    </section>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getCommentsAction: (payload: Payload) => dispatch(getComments(payload)),
  createCommentAction: (payload: Payload) => dispatch(createComment(payload)),
});

const mapStateToProps = (state: any) => {
  const { user } = state.authReducer;
  const { comments, isLoading } = state.commentReducer;
  return { currentUser: user, comments, isLoading };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Comments);
