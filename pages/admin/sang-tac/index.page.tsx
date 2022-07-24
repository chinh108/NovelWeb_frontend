import AuthGuard from '@/components/HOC/authGuard'
import AuthLayout from '@/components/layout/authLayout';
import Loader from '@/components/loader';
import React, { Dispatch, useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from 'react-bootstrap-table2-paginator';
import { connect, ConnectedProps } from 'react-redux';
import { CardBody, Container } from 'reactstrap';
import { deleteStory, getOwnStories } from 'redux/actions/storyAction';
import { Action } from 'types';
import { STORY_STATUS, STORY_TYPE } from '../constants';
import { Eye, Trash2, PlusCircle } from 'react-feather';
import { useRouter } from 'next/router';
import RcModalConfirm from '@/components/ConfirmModal';
import { Payload } from 'types/action';

type Props = PropsFromRedux & {
  currentUser: any
}

function Series(props: Props) {
  const { currentUser, getOwnStoriesAction, loading, stories, deleteStoryAction } = props;
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedStory, setSelectedStory] = useState('');

  const onToggleConfirm = () => {
    setOpenDelete(!openDelete);
  };

  const openModal = (id: string) => {
    setSelectedStory(id)
    onToggleConfirm();
  }

  const onDelete = () => {
    deleteStoryAction({
      params: {
        id: selectedStory
      }
    })
    onToggleConfirm();
  };

  useEffect(() => {
    getOwnStoriesAction();
  }, [])

  const columns = [
    {
      dataField: "title",
      text: "Tiêu đề",
    },
    {
      dataField: "author",
      text: "Tác giả",
    },
    {
      dataField: "type",
      text: "Loại truyện",
      formatter: (status: keyof typeof STORY_TYPE) => STORY_TYPE[status],
    },
    {
      dataField: "status",
      text: "Tình trạng dịch",
      formatter: (status: keyof typeof STORY_STATUS) => STORY_STATUS[status],
    },
    {
      dataField: 'action',
      isDummyField: true,
      text: 'Điều khiển',
      formatter: (_: undefined, row: any) => {
        const FormatterComponent = (
          <div className='d-flex jutify-center'>
            <PlusCircle
              style={{ marginRight: 10 }}
              role="button"
              onClick={() => router.push({ pathname: '/admin/sang-tac/[id]/them-chap', query: { id: row.id } })} />
            <Eye
              style={{ marginRight: 10 }}
              role="button"
              onClick={() => router.push({ pathname: '/truyen/[id]', query: { id: row.id } })} />
            <Trash2 role="button" onClick={() => openModal(row.id) } />
          </div>
        );
        return FormatterComponent;
      },
      headerStyle: { width: 200 },
    },
  ];

  const pagination = paginationFactory({
    custom: true,
    hideSizePerPage: true,
    sizePerPage: 20,
    totalSize: stories.length,
    withFirstAndLast: true,
    lastPageText: 'Cuối',
    firstPageText: 'Đầu',
    paginationSize: 20,
    page: 1,
  });
  
  return (
    <AuthLayout>
      <Container fluid='lg' className='mt-5'>
        <div className="basic-section">
          <header className="sect-header"><span className="sect-title">Sáng tác của {currentUser.name || currentUser.username}</span></header>
          <section
            className="board-list has-pagination"
            style={{ marginTop: 20 }}
          >
            <CardBody>
              {loading && <Loader />}
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
                      data={stories}
                      columns={columns}
                      onTableChange={() => {}}
                    />
                    <div className="d-flex justify-content-end align-items-center">
                      <PaginationListStandalone {...paginationProps} />
                    </div>
                  </div>
                )}
              </PaginationProvider>
            </CardBody>
          </section>
          <RcModalConfirm modal={openDelete} closeForm={onToggleConfirm} onSubmit={onDelete} content="Bạn có muốn xoá sáng tác này không ?" />
        </div>
      </Container>
    </AuthLayout>
  )
}

const mapStateToProps = (state: any) => ({
  stories: state.storyReducer.stories,
  loading: state.storyReducer.loading
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getOwnStoriesAction: () => dispatch(getOwnStories()),
  deleteStoryAction: (payload: Payload) => dispatch(deleteStory(payload))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


export default AuthGuard(connector(Series))