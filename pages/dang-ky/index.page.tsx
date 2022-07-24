import AuthLayout from '@/components/layout/authLayout';
import React, { Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Input, Button, Form } from 'reactstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Action } from 'types';
import { registerAction } from 'redux/actions';
import NoAuthGuard from '@/components/HOC/noAuthGuard';

const Register = (props: PropsFromRedux) => {
  const { register: registerUser, loading } = props;
  const schema = yup.object().shape({
    username: yup.string().required('Tên đăng nhập là bắt buộc').trim(),
    email: yup.string()
      .required('Địa chỉ email là bắt buộc')
      .email('Email không đúng định dạng'),
    password: yup.string().required('Mật khẩu là bắt buộc').trim(),
    passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không trùng khớp')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onSubmit = (data: any) => {
    delete data.passwordConfirmation;
    registerUser({ params: data });
  };
  
  return (
    <AuthLayout>
      <div className="account-pages my-5">
        <Container>
          <Row className="justify-content-center">
            <Col xl={10}>
              <Card className="">
                <CardBody className="p-0">
                  <Row>
                    <Col md={12} className="p-5 position-relative">
                      <Form onSubmit={handleSubmit(onSubmit)} className="authentication-form">
                        <div className="mb-3">
                          <Label for="username" className="font-weight-bold text-dark">
                            Tên đăng nhập
                          </Label>
                          <input className="form-control" type='text' {...register('username')} />
                          {errors.username && <p className="text-danger mb-0">{(errors as any)?.username?.message}</p>}
                        </div>
                        <div className="mb-3">
                          <Label for="email" className="font-weight-bold text-dark">
                            Địa chỉ email
                          </Label>
                          <input className="form-control" {...register('email')} />
                          {errors.email && <p className="text-danger mb-0">{(errors as any)?.email?.message}</p>}
                        </div>
                        <div className="mb-3">
                          <Label for="password" className="font-weight-bold text-dark">
                            Mật khẩu
                          </Label>
                          <input className="form-control" type="password" {...register('password')} />
                          {errors.password && <p className="text-danger mb-0">{(errors as any)?.password?.message}</p>}
                        </div>
                        <div className="mb-3">
                          <Label for="passwordConfirmation" className="font-weight-bold text-dark">
                            Xác nhận mật khẩu
                          </Label>
                          <input className="form-control" type="password" {...register('passwordConfirmation')} />
                          {errors.passwordConfirmation && <p className="text-danger mb-0">{(errors as any)?.passwordConfirmation?.message}</p>}
                        </div>
                        <FormGroup className="form-group mb-0 pt-2 text-center">
                          <Button className="btn-block btn btn-primary" type="submit" disabled={loading || !isValid}>
                            Đăng ký
                          </Button>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </AuthLayout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  register: (payload: any) => dispatch(registerAction(payload))
}) 

const mapStateToProps = (state: any) => {
  const { loading } = state.authReducer;
  return { loading };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof withConnect>;

export default NoAuthGuard(withConnect(Register));
