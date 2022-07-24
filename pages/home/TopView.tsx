import Loader from "@/components/loader";
import React from "react";
import { connect, ConnectedProps } from "react-redux";

function TopView(props: PropsFromRedux) {
  const { loadingTopStories, topStories } = props;

  return (
    <section id="reading-history" className="index-section">
      <header className="section-title">
        <a href="/tim-kiem">
          <span className="sts-bold">Danh sách</span>
        </a>
      </header>
      <main className="sect-body">
        {loadingTopStories && <Loader />}
        {topStories.slice(0, 5).map((reading: any, index: number) => (
          <div className="row ml-1 mb-3" key={index}>
            <div className="col-2 col-lg-2 a6-ratio">
              <div
                className="img-contain-ratio content"
                style={{ backgroundImage: `url(${reading.avatar || "images/Bookcover.png"})` }}
              />
            </div>
            <div className="col-8 col-lg-8" style={{ minHeight: 50 }}>
              <a
                href={`/truyen/${reading.id}`}
                className="text-truncate block font-weight-bold mb-1"
              >
                {reading.title}
              </a>
              {reading.chapper?.id && (
                <a
                  href={`/chap/${reading.chapper.id}`}
                  className="text-truncate block"
                  >
                  {reading.chapper.title}
                </a>
              )}
            </div>
          </div>
        ))}
      </main>
    </section>
  );
}

const mapStateToProps = (state: any) => {
  const {
    loadingTopStories,
    topStories,
  } = state.homeReducer;
  return {
    loadingTopStories,
    topStories,
  }
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TopView);
