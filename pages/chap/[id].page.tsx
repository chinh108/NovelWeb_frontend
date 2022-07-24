import Comments from "@/components/Comments";
import Loader from "@/components/loader";
import { useRouter } from "next/router";
import React, { Dispatch, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getChapper } from "redux/actions/chapperAction";
import { Action } from "types";
import { Payload } from "types/action";
import { ChevronsLeft, ChevronsRight, Home } from "react-feather";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function Chuong(props: PropsFromRedux) {
  const { isLoadingChapper, chapper, comments, getChapperAction } = props;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getChapperAction({ params: { id } });
  }, []);

  return (
    <main id="mainpart" className="reading-page style-3">
      <div className="container">
        <div className="row">
          {isLoadingChapper && <Loader />}
          <div className="title-top" style={{ paddingTop: 20 }}>
            <h2 className="title-item text-center">{chapper.story?.title}</h2>
            <h4 className="title-item text-center">{chapper.title}</h4>
            <h6 className="title-item text-center">
              Lần cuối:
              <time
                className="timeago"
                title={new Date(chapper.updatedAt || 0).toString()}
                dateTime={new Date(chapper.updatedAt || 0).toString()}
              >
                &nbsp; {moment(chapper.updatedAt || 0).fromNow(true) }&nbsp; 
              </time>
              -&nbsp; 
              <a
                href="#chapter-comments"
                style={{ textDecoration: "underline" }}
              >
                Bình luận: {comments.length}
              </a>
            </h6>
          </div>
          <div
            style={{ textAlign: "center", margin: "20px auto -20px auto" }}
          ></div>
          <div
            id="chapter-content"
            className="long-text no-select"
            style={{ paddingLeft: 0, paddingRight: 0 }}
            dangerouslySetInnerHTML={{ __html: chapper.content }}
          />
          <div
            style={{ textAlign: "center", margin: "20px auto -20px auto" }}
          ></div>
          <section className="rd-basic_icon row">
            <a
              href={`/chap/${chapper.preChap}`}
              className={`col text-center my-auto ${chapper.preChap ? "" : "disabled"}`}
            >
              <ChevronsLeft size={25} />
            </a>
            <a href={`/truyen/${chapper.storyId}`} className="col text-center my-auto">
              <Home size={25} />
            </a>
            <a
              href={`/chap/${chapper.nextChap}`}
              className={`col text-center my-auto ${
                chapper.nextChap ? "" : "disabled"
              }`}
            >
              <ChevronsRight size={25} />
            </a>
          </section>
          <Comments chapperId={chapper.id} ownId={chapper.createBy} type={chapper.story?.type} />
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state: any) => {
  const { isLoadingChapper, chapper } = state.detailStoryReducer;
  const { comments } = state.commentReducer;
  return {
    isLoadingChapper,
    chapper,
    comments,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getChapperAction: (payload: Payload) => dispatch(getChapper(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Chuong);
