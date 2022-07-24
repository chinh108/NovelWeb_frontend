import React from 'react'
import truncate from 'lodash/truncate';
import { removeTags } from 'shared/utils';

function OtherAuthor({ story }: any) {
  return (
    <li>
      <div className="others-img no-padding">
        <div className="a6-ratio">
          <div className="content img-in-ratio" style={{ backgroundImage: `url(${story.avatar || '/images/Bookcover.png'})` }}>
          </div>
        </div>
      </div>
      <div className="others-info">
        <h5 className="others-name"><a href={`/truyen/${story.id}`}>{story.title}</a></h5>
        <small className="series-summary">{truncate(removeTags(story.summary || '') || '', { length: 55, separator: '...'})}</small>
      </div>
    </li>
  )
}

export default OtherAuthor