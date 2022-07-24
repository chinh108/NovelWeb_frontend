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
import { createChapper, getStoryId } from 'redux/actions/storyAction';
import { useRouter } from 'next/router';

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

interface ICreateStoryProps extends PropsFromRedux {}

const defaultValues = {
  title: '',
  content: '<p></p>',
}

const CreateStory: React.FC<ICreateStoryProps> = (props) => {
  const {
    getStoryIdAction,
    createChapperAction
  } = props;
  const router = useRouter();
  const { id } = router.query;
  const schema = yup.object().shape({
    title: yup.string().required('Tiêu đề chương là bắt buộc'),
    content: yup.string().required('Tóm tắt là bắt buộc'),
  });

  const { formState: { errors, isValid }, handleSubmit, control } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  const onSubmit = (data: any) => {
    const params = {
      ...data,
      storyId: id,
    }
    createChapperAction({ params })
  }

  useEffect(() => {
    if (id) {
      getStoryIdAction({ params: { id }})
    }
  }, [])

  return (
    <AuthLayout>
      <Container fluid='lg' className='mt-5'>
        <div className="basic-section">
          <header className="sect-header"><span className="sect-title">Thêm Chương</span></header>
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
                  <FormFeedback className="d-block">{(errors as any)?.title?.message || ''}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup className='required'>
                <Label className='col-form-label'>Nội dung chương</Label>
                <Col >
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <SunEditor
                        {...field}
                        lang={'en'}
                        height='500px'
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
              <FormGroup className="form-group mb-0 pt-2 text-center">
                <Button className="btn-block btn btn-primary" type="submit" disabled={!isValid}>
                  Thêm chương
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </div>
      </Container>
    </AuthLayout>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getStoryIdAction: (payload: Payload) => dispatch(getStoryId(payload)),
  createChapperAction: (payload: Payload) => dispatch(createChapper(payload)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default AuthGuard(connector(CreateStory));