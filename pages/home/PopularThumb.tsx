import Link from 'next/link';
import React from 'react'

const PopularThumb = (props: any) => {
  const { story } = props;
  return (
    <div
      className="popular-thumb-item mr-1 tns-item tns-slide-active"
    >
      <div className="thumb-wrapper">
        <Link href={
          story?.chapper
            ? { pathname: '/chap/[id]', query: { id: story?.chapper?.id } }
            : { pathname: '/truyen/[id]', query: { id: story?.id } }}
            title={story?.chapper ? story?.chapper?.title : story?.title || 'link'}>
          <div className="a6-ratio">
            <div
              className="content img-in-ratio"
              style={{ backgroundImage: `url(${story?.avatar || '/images/Bookcover.png'})` }}
            ></div>
          </div>
        </Link>
        <div className="thumb-detail">
          <div
            className="thumb_attr series-title"
            title={story?.chapper ? story?.chapper?.title : story?.title }
          >
            <Link href={
              story?.chapper
                ? { pathname: '/chap/[id]', query: { id: story?.chapper?.id } }
                : { pathname: '/truyen/[id]', query: { id: story?.id } }}
                title={story?.chapper ? story?.chapper.title : story?.title }>
              {story?.chapper ? story?.chapper.title : story?.title || 'link' }
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularThumb