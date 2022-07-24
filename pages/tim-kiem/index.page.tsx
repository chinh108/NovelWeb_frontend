import MainLayout from "@/components/layout/mainLayout";
import Loader from "@/components/loader";
import TopGroup from "@/components/TopGroup";
import { useRouter } from "next/router";
import { TAG } from "pages/admin/constants";
import ThumItemFLow from "pages/home/ThumItemFLow";
import React, { Dispatch, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Col, Container, Input, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { searchStories } from "redux/actions/storyAction";
import { Action } from "types";
import { Payload } from "types/action";

const SORT_ENUM: any = {
  ASC: 'ASC',
  DESC: 'DESC',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
}

function TimKiem(props: PropsFromRedux) {
  const { isLoading, stories, searchStoriesAction, pagination } = props
  const router = useRouter();
  const { search, sort: sortQuey } = router.query;
  const [searchInput, setSearchInput] = useState((search as string) || '');
  const [type, setType] = useState<any>({ 1: true, 2: true, 3: true });
  const [status, setStatus] = useState<any>({ 1: true, 2: true, 3: true });
  const [sort, setSort] = useState(SORT_ENUM[sortQuey as string] ? sortQuey : 'ASC');
  const [genders, setGenders] = useState<number | undefined>();
  const [page, setPage] = useState(1)

  const onInputChange = (event: any) => {
    const sort = new URLSearchParams(window.location.search).get('sort') as string;
    window.history.pushState(
      router.pathname,
      '',
      `${router.pathname}?search=${encodeURIComponent(event.target.value || '')}&sort=${sort}`
    );
    setSearchInput(event.target.value || "");
  };
  
  const onSearch = () => {
    const searchQuery = new URLSearchParams(window.location.search).get('search') as string;
    const sortQuey = new URLSearchParams(window.location.search).get('sort') as string;
    const search = searchQuery || searchInput;
    const sortRequest = SORT_ENUM[sortQuey] ?? sort;
    const params: any = {
      search,
      sort: sortRequest,
      page,
      type: Object.keys(type).filter(item => type[item]).map(item => Number(item)),
      status: Object.keys(status).filter(item => status[item]).map(item => Number(item)),
    }

    if (genders) {
      params.genders = Number(genders);
    }
    searchStoriesAction({ params });

    window.history.pushState(
      router.pathname,
      '',
      `${router.pathname}?search=${encodeURIComponent(search || '')}&sort=${sortRequest}`
    );
  }

  const onTypeChange = (event: any) => {
    setType({
      ...type,
      [event.target.value]: event.target.checked
    })
  }

  const onStatusChange = (event: any) => {
    setStatus({
      ...status,
      [event.target.value]: event.target.checked
    })
  }

  const onGendersChange = (gender: number) => {
    setGenders(gender);
  }

  const onSortChange = (event: any) => {
    const searchQuery = new URLSearchParams(window.location.search).get('search') as string;
    window.history.pushState(
      router.pathname,
      '',
      `${router.pathname}?search=${encodeURIComponent(searchQuery || '')}&sort=${event.target.value}`
    );
    setSort(event.target.value)
  }

  const handleNext = () => {
    setPage(page => page === pagination?.totalPage ? page : page + 1)
  }

  const handlePre = () => {
    setPage(page => page === 1 ? 1 : page - 1)
  }

  useEffect(() => {
    if (genders || sort) {
      onSearch();
    }
  }, [genders, sort, page])

  return (
    <MainLayout customClass="tim-kiem">
      <TopGroup />
      <main id="mainpart" className="search-page" style={{ minHeight: 545 }}>
        {isLoading && <Loader />}
        <header className="page-title">
          <div className="page-name_wrapper">
            <Container fluid="lg">
              <span className="page-name">
                <i className="fas fa-circle"></i>Tìm kiếm
              </span>
            </Container>
          </div>
        </header>
        <Container fluid="lg">
          <Row>
            <Col lg={9} xs={12}>
              <div className="search-form_wrapper">
                <div className="row" style={{ margin: 0 }}>
                  <input
                    id="search-page-input"
                    className="search-form in col-8 col-md-10 col-lg-10"
                    type="text"
                    placeholder="Tối thiểu 2 kí tự"
                    size={40}
                    onChange={onInputChange}
                    value={searchInput}
                  />
                  <input
                    id="search-go"
                    className="search-go_form search-form submit col-4 col-md-2 col-lg-2"
                    type="submit"
                    value="Tìm kiếm"
                    onClick={onSearch}
                  />
                </div>
                <Input type="select" style={{ width: 200 }} onChange={onSortChange} value={sort}>
                  <option value="ASC">A - Z</option>
                  <option value="DESC">Z - A</option>
                  <option value="updatedAt">Mới cập nhật</option>
                  <option value="createdAt">Truyện mới</option>
                </Input>
              </div>
              <section className="basic-section has-pagination">
                <main className="sect-body">
                  <Row>
                    {(stories || []).map((item: any) => (
                      <ThumItemFLow key={item.id} story={item} />
                    ))}
                  </Row>
                </main>
                <Pagination className='d-flex justify-content-end'>
                  <PaginationItem>
                    <PaginationLink previous onClick={handlePre} />
                  </PaginationItem>

                  {Array(pagination?.totalPage > 6 ? 6 : pagination?.totalPage)
                    .fill(0)
                    .map((_, item) => {
                      const sub = page - 6 > 0 ? page - 6 : 0
                      return (
                        <PaginationItem
                          key={item}
                          active={item + 1 + sub === page}>
                          <PaginationLink
                            onClick={() => setPage(item + 1 + sub)}>
                            {item + 1 + sub}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}
                  {pagination?.totalPage > 6 && page < pagination?.totalPage && (
                    <>
                      <PaginationItem disabled><PaginationLink>...</PaginationLink></PaginationItem>
                      <PaginationItem
                          active={pagination?.totalPage === page}>
                          <PaginationLink
                            onClick={() => setPage(pagination?.totalPage)}>
                            {pagination?.totalPage}
                          </PaginationLink>
                        </PaginationItem>
                    </>
                  )}
                <PaginationItem>
                  <PaginationLink next onClick={handleNext} />
                </PaginationItem>
              </Pagination>
            </section>
          </Col>
          <Col lg={3} xs={12}>
            <section className="sub-index-style filter-section">
              <div className="title-wrapper">
                <div className="section-title">Phân loại</div>
              </div>
              <div className="section-content">
                <ul className="filter-type unstyled">
                  <li>
                    <input type="checkbox" name="truyendich" value="1" checked={type[1]} onChange={onTypeChange} /> Truyện dịch
                  </li>
                  <li>
                    <input type="checkbox" name="sangtac" value="3" checked={type[3]} onChange={onTypeChange} /> Truyện sáng tác
                  </li>
                  <li>
                    <input type="checkbox" name="convert" value="2" checked={type[2]} onChange={onTypeChange} /> Convert
                  </li>
                </ul>
                <div className="submit-wrapper">
                  <input
                    type="submit"
                    className="button button-primary-green"
                    value="Áp dụng"
                    onClick={onSearch}
                  />
                </div>
              </div>
            </section>
            <section className="sub-index-style filter-section">
              <div className="title-wrapper">
                <div className="section-title">Tình trạng</div>
              </div>
              <div className="section-content">
                <ul className="filter-type unstyled">
                  <li>
                    <input type="checkbox" name="dangtienhanh" value="1" checked={status[1]} onChange={onStatusChange} /> Đang tiến hành
                  </li>
                  <li>
                    <input type="checkbox" name="tamngung" value="2" checked={status[2]} onChange={onStatusChange} /> Tạm ngưng
                  </li>
                  <li>
                    <input type="checkbox" name="hoanthanh" value="3" checked={status[3]} onChange={onStatusChange} /> Đã hoàn thành
                  </li>
                </ul>
                <div className="submit-wrapper">
                  <input
                    type="submit"
                    className="button button-primary-green"
                    value="Áp dụng"
                    onClick={onSearch}
                  />
                </div>
              </div>
            </section>
            <section className="sub-index-style filter-section">
              <div className="title-wrapper">
                <div className="section-title">Tình trạng</div>
              </div>
              <div className="section-content">
                <ul className="filter-type unstyled">
                  {TAG.map((item: any) => (
                    <li
                      className={`filter-type_item ${item.value === genders ? "active" : ""}`}
                      key={item.value}
                      onClick={() => onGendersChange(item.value)}
                      role='button'
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </main>
    </MainLayout >
  );
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  searchStoriesAction: (payload: Payload) => dispatch(searchStories(payload)),
});

const mapStateToProps = (state: any) => {
  const { isLoading, stories, pagination } = state.storyReducer;
  return { isLoading, stories, pagination };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TimKiem);
