import React from 'react'
import { Col, Row } from 'reactstrap'
import Chuong from './Chuong'

function DanhSachChuong(props: any) {
  const { chappers, avatar } = props;
  return (
    <section className="volume-list at-series basic-section volume-mobile gradual-mobile ">
      <header id="volume_16958" className="sect-header">
        <span className="mobile-icon"><i className="fas fa-chevron-down"></i></span>
        <span className="sect-title">
          Mục lục
        </span>
      </header>

      <main className="d-lg-block" style={{ display: 'none' }}>
        <Row>
          <Col xs={12} md={2}>
            <div className="volume-cover">
              <a href="/truyen/11586-shimotsuki-wa-mob-ga-suki/t16958-phan-mot">
                <div className="a6-ratio">
                <div className="content img-in-ratio" style={{ backgroundImage: `url(${avatar || '/images/Bookcover.png'})` }}>
                </div>
                </div>
              </a>
            </div>
          </Col>
          <Col xs={12} md={10}>
            <ul className="list-chapters at-series">
              {chappers.map((item: any) => (
                <Chuong key={item.id} chapper={item}/>
              ))}
            </ul>
          </Col>
        </Row>
      </main>
    </section>
  )
}

export default DanhSachChuong