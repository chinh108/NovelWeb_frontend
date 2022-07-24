import Footer from "@/components/Footer";
import MainLayout from "@/components/layout/mainLayout";
import TopGroup from "@/components/TopGroup";
import React, { Dispatch, useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator";
import { Input } from "reactstrap";
import { Eye, Plus } from "react-feather";
import { formatDate } from "shared/utils";
import { useRouter } from "next/router";
import { categoryDiscuss } from "redux/constants";
import { Action } from "types";
import { Payload } from "types/action";
import { connect, ConnectedProps } from "react-redux";
import { getDiscuss } from "redux/actions/discussAction";
import Loader from "@/components/loader";

function ThaoLuan(props: PropsFromRedux) {
  const { getDisscussAction, discuss, isLoading } = props;
  const [category, setCategory] = useState('all');
  const router = useRouter();

  const columns = [
    {
      dataField: "title",
      text: "Tiêu đề",
    },
    {
      dataField: "user.username",
      text: "Người đăng",
    },
    {
      dataField: "category",
      text: "Chuyên mục",
      formatter: (data: keyof typeof categoryDiscuss) => categoryDiscuss[data],
    },
    {
      dataField: "createdAt",
      text: "ngày đăng",
      formatter: (data: number) => formatDate(data),
    },
    {
      dataField: 'action',
      isDummyField: true,
      text: 'Điều khiển',
      formatter: (_: undefined, row: any) => {
        const FormatterComponent = (
          <div className='d-flex justify-content-center'>
            <Eye
              style={{ marginRight: 10 }}
              role="button"
              onClick={() => router.push({ pathname: '/thao-luan/[id]', query: { id: row.id } })} />
          </div>
        );
        return FormatterComponent;
      },
      headerStyle: { width: 100 },
    },
  ];

  const pagination = paginationFactory({
    custom: true,
    hideSizePerPage: true,
    sizePerPage: 20,
    totalSize: discuss.length,
    withFirstAndLast: true,
    lastPageText: 'Cuối',
    firstPageText: 'Đầu',
    paginationSize: 20,
    page: 1,
  });

  const onCategoryChange = (event: any) => {
    setCategory(event.target.value)
  }

  useEffect(() => {
    getDisscussAction({ params: { category: category === 'all' ? category : Number(category) }})
  }, [category])
  
  return (
    <MainLayout customClass="tim-kiem">
      <TopGroup />

      <main id="mainpart" className="page-board">
        <header className="page-title">
          <div className="page-name_wrapper">
            <div className="container relative">
              <span className="page-name">
                <a href="thao-luan">
                  <i className="fas fa-circle"></i>Thảo luận
                </a>
              </span>
            </div>
          </div>
        </header>
        <div className="container clear">
          <section className="board-toolkit clear">
            <div className="board_categ-list">
              <Input
                type="select"
                placeholder="Đánh giá"
                defaultValue="all"
                onChange={onCategoryChange}
              >
                <option value="all">Tất cả</option>
                <option value="1">Thông báo</option>
                <option value="2">Tin tức</option>
                <option value="3">Hỏi đáp</option>
                <option value="4">Đánh giá</option>
                <option value="5">Thảo luận</option>
              </Input>
            </div>
            <a
              className="button button-newpost button-green"
              href="/admin/thao-luan/them-thao-luan"
            >
              <Plus size={18} />Thêm
            </a>
          </section>
          <section
            className="board-list has-pagination"
            style={{ marginTop: 20 }}
          >
            {isLoading && <Loader />}
            <PaginationProvider pagination={pagination}>
              {({ paginationProps, paginationTableProps }) => (
                <div>
                  <BootstrapTable
                    {...paginationTableProps}
                    headerWrapperClasses="thead-light"
                    bodyClasses="text-break"
                    bordered
                    hover
                    keyField='id'
                    data={discuss}
                    columns={columns}
                    onTableChange={() => {}}
                  />
                  <div className="d-flex justify-content-end align-items-center">
                    <PaginationListStandalone {...paginationProps} />
                  </div>
                </div>
              )}
            </PaginationProvider>
          </section>
        </div>
      </main>
      <Footer />
    </MainLayout>
  );
}

const mapStateToProps = (state: any) => ({
  isLoading: state.discussReducer.isLoading,
  discuss: state.discussReducer.discuss,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getDisscussAction: (payload: Payload) => dispatch(getDiscuss(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ThaoLuan);
