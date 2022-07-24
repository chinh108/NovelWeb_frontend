import React, { Dispatch, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import { paginationStories } from 'redux/actions/homeAction'
import { Payload } from 'types/action'
import { Action } from "types";
import ReadingSeries from './ReadingSeries'
import ReadMore from './ReadMore'
import RecentComment from './RecentComment'
import ThumItemFLow from './ThumItemFLow'
import Loader from '@/components/loader'
import { StoryConstant } from 'redux/constants'
import TopView from './TopView'

function LastChapper(props: PropsFromRedux) {
  const {
    loadingNewChapStories,
    loadingNewStories,
    newChapStories,
    newStories,
    getStories
  } = props;

  useEffect(() => {
    getStories(
      {
        params: {
          page: 1,
          perPage: 17,
          type: [1,2,3],
          status: [1,2,3],
          sort: 'updatedAt'
        }
      },
      StoryConstant.NEW_CHAP_STORIES
    )

    getStories(
      {
        params: {
          page: 1,
          perPage: 5,
          type: [1,2,3],
          status: [1,2,3],
          sort: 'createdAt'
        }
      },
      StoryConstant.NEW_STORIES
    )
  }, [])

  return (
    <Container fluid="lg">
      <Row>
        <Col xs={12} lg={9}>
          <section className="index-section thumb-section-flow last-chapter translation three-row">
            <header className="section-title">
              <span className="sts-bold">Chương</span><span className="sts-empty">mới nhất</span>
            </header>
            <Row>
              {loadingNewChapStories && <Loader />}
              {newChapStories.map((item: any) => (
                <ThumItemFLow key={item.id} story={item} />
              ))}
              {!loadingNewChapStories && <ReadMore url='sort=updatedAt' />}
            </Row>
          </section>
          <section className="index-section thumb-section-flow last-chapter translation one-row">
            <header className="section-title">
              <span className="sts-bold">Sáng tác</span><span className="sts-empty">mới nhất</span>
            </header>
            <Row>
              {loadingNewStories && <Loader />}
              {newStories.map((item: any) => (
                <ThumItemFLow key={item.id} story={item} />
              ))}
              {!loadingNewStories  && <ReadMore url='sort=createdAt' />}
            </Row>
          </section>
        </Col>
        <Col sm={12} lg={3}>
          <ReadingSeries />
          <RecentComment />
          <TopView />
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state: any) => {
  const {
    loadingNewChapStories,
    loadingNewStories,
    newChapStories,
    newStories
  } = state.homeReducer;
  return {
    loadingNewChapStories,
    loadingNewStories,
    newChapStories,
    newStories
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getStories: (payload: Payload, type: string) => dispatch(paginationStories(payload, type)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LastChapper);