import React, { Dispatch, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Label, FormGroup, Col, Input, FormFeedback, Form, Container, CardBody, Button } from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { connect, ConnectedProps } from 'react-redux';
import dynamic from "next/dynamic";
import AuthGuard from '@/components/HOC/authGuard'
import AuthLayout from '@/components/layout/authLayout';
import { Action } from 'types';
import { Payload } from 'types/action';
import { getAllStories } from 'redux/actions/storyAction';
import { createDiscuss } from 'redux/actions/discussAction';

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

interface ICreateStoryProps extends PropsFromRedux {}

const defaultValues = {
  title: '',
  content: '<p></p>',
  category: '1',
}

const CreateStory: React.FC<ICreateStoryProps> = (props) => {
  const {
    createDiscussAction,
    getAllStories,
    stories
  } = props;
  const schema = yup.object().shape({
    title: yup.string().required('Tiêu đề chương là bắt buộc'),
    content: yup.string().required('Tóm tắt là bắt buộc'),
    category: yup.string().required('Chuyên mục là bắt buộc'),
    seriesId: yup.string().required('Truyện là bắt buộc'),
  });

  const { formState: { errors, isValid }, handleSubmit, control, setValue } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  const onSubmit = (data: any) => {
    const params = {
      ...data,
      category: Number(data.category)
    }
    createDiscussAction({ params })
  }
  
  useEffect(() => {
    getAllStories({
      callback: (data) => setValue('seriesId', data?.id)
    });
  }, [])

  return (
    <AuthLayout>
      <Container fluid='lg' className='mt-5'>
        <div className="basic-section">
          <header className="sect-header"><span className="sect-title">Thêm Thảo luận</span></header>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup row className='required'>
                <Label sm={2}>Tiêu đề</Label>
                <Col sm={10} className='pr-4'>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => <input className="form-control" type="text" {...field} />}
                  />
                  <FormFeedback className="d-block">{(errors as any)?.title?.message}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup className='required'>
                <Label className='col-form-label'>Nội dung</Label>
                <Col >
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <SunEditor
                        {...field}
                        lang={'en'}
                        height='300px'
                        setOptions={{
                          buttonList: [
                            ['undo', 'redo'],
                            ['formatBlock', 'align', 'fontSize'],
                            ['bold', 'italic', 'blockquote', 'link', 'list'],
                            ['fullScreen', 'codeView', 'preview', 'image'],
                          ]
                        }}
                        setContents={field.value}
                      />
                    )}
                  />
                  <FormFeedback className="d-block">{(errors as any)?.content?.message}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row className='required'>
                <Label sm={2}>Chọn chuyên mục</Label>
                <Col sm={10} className='pr-4'>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Input invalid={!!errors.category} type="select" {...field} style={{ width: 200 }} >
                        <option value="1">Thông báo</option>
                        <option value="2">Tin tức</option>
                        <option value="3">Hỏi đáp</option>
                        <option value="4">Đánh giá</option>
                        <option value="5">Thảo luận</option>
                      </Input>
                    )}
                  />
                  <FormFeedback className="d-block">{(errors as any)?.category?.message}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row className='required'>
                <Label sm={2}>Chọn truyện</Label>
                <Col sm={10} className='pr-4'>
                  <Controller
                    name="seriesId"
                    control={control}
                    render={({ field }) => (
                      <Input invalid={!!errors.seriesId} type="select" {...field} >
                        {stories.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                      </Input>
                    )}
                  />
                  <FormFeedback className="d-block">{(errors as any)?.seriesId?.message}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup className="form-group mb-0 pt-2 text-center">
                <Button className="btn-block btn btn-primary" type="submit" disabled={!isValid}>
                  Thêm thảo luận
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </div>
      </Container>
    </AuthLayout>
  )
}

const mapStateToProps = (state: any) => ({
  stories: state.storyReducer.stories,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  createDiscussAction: (payload: Payload) => dispatch(createDiscuss(payload)),
  getAllStories: (payload: Payload) => dispatch(getAllStories(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default AuthGuard(connector(CreateStory));