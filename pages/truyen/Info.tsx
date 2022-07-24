import { STORY_STATUS, STORY_TYPE, TAG } from "pages/admin/constants";
import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function Info(props: any) {
  const { story = {} } = props;
  const [genderMap] = useState<any>(
    () => new Map(TAG.map((item: any) => [item.value, item.name]))
  );
  const [showMore, setShowMore] = useState(true);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="feature-section at-series clear">
      <main className="section-body">
        <div className="top-part">
          <Row>
            <Col xs={12} md={3} className="left-column">
              <div className="series-cover">
                <div className="series-type">
                  <span>{STORY_TYPE[story?.type]}</span>
                </div>
                <div className="a6-ratio">
                  <div
                    className="content img-in-ratio"
                    style={{ backgroundImage: `url(${story?.avatar || '/images/Bookcover.png'})` }}
                  ></div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={9}>
              <div className="series-name-group">
                <span className="series-name">
                  <a href={`/truyen/${story.id}`}>{story.title}</a>
                </span>
              </div>
              <div className="series-information">
                <div className="series-gernes" x-data="{ more: false }">
                  {(story.genders || []).map((item: any) => (
                    <a className="series-gerne-item" href="#" key={item}>
                      {genderMap.get(item)}
                    </a>
                  ))}
                </div>{" "}
                <div className="info-item">
                  <span className="info-name">Tác giả:</span>
                  <span className="info-value ">{story?.author || ""}</span>
                </div>
                <div className="info-item">
                  <span className="info-name">Họa sĩ:</span>
                  <span className="info-value">{story.illustrator || ""}</span>
                </div>
                <div className="info-item">
                  <span className="info-name">Tình trạng:</span>
                  <span className="info-value">
                    {STORY_STATUS[story.status]}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bottom-part">
          <Row>
            <Col xs={12}>
              <div className="row statistic-list">
                <div className="col-6 statistic-item block-wide at-mobile">
                  <div className="statistic-name">Lần cuối</div>
                  <div className="statistic-value">
                    <time
                      className="timeago"
                      title={new Date(story.updatedAt | 0).toString()}
                      dateTime={new Date(story.updatedAt | 0).toString()}
                    >
                      {moment(story.updatedAt || 0).fromNow(true)}
                    </time>
                  </div>
                </div>
                <div className="col-6 statistic-item">
                  <div className="statistic-name">Lượt xem</div>
                  <div className="statistic-value">{story.viewCount || 0}</div>
                </div>
              </div>
            </Col>
            <Col xs={12} className="summary-wrapper other-facts">
              <div className="fact-item">
                <div className="fact-name">Tên khác:</div>
                <div className="fact-value">
                  {(story.altname || []).map((item: any) => (
                    <div className="block pad-bottom-5" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col xs={12} className="summary-wrapper">
              <div className="series-summary">
                <h4>Tóm tắt</h4>
                <div
                  style={showMore ? { maxHeight: 100, overflow: "hidden" } : { maxHeight: 'none' }}
                  className="summary-content"
                  dangerouslySetInnerHTML={{ __html: story.summary || "" }}
                ></div>
                <div
                  className={`summary-more ${showMore ? 'more-state' : 'less-state'}`}
                  onClick={toggleShowMore}
                >
                  <div className="see_more">
                    {showMore ? "Xem thêm" : "Ẩn đi"}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </section>
  );
}

export default Info;
