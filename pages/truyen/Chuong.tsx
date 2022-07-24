import React from 'react'
import { formatDate } from 'shared/utils';

function Chuong(props: any) {
  const { chapper } = props;
  return (
    <li className="">
      <div className="chapter-name">
        <a href={`/chap/${chapper?.id}`} title={chapper?.title}>{chapper?.title}</a>
      </div>
      <div className="chapter-time">{formatDate(chapper?.createdAt)}</div>
    </li>
  )
}

export default Chuong