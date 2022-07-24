import AuthLayout from "@/components/layout/authLayout";
import React, { Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Action } from "types";
import { loginUser, loginWithGoogle } from "redux/actions";
import GoogleButton from "@/components/auth/google/GoogleButton";
import NoAuthGuard from '@/components/HOC/noAuthGuard';

const Login = (props: PropsFromRedux) => {
  const { login, isLoading, isGettingMe, loginWithGoogle } = props;
  const schema = yup.object().shape({
    email: yup.string().required("Tên đăng nhập là bắt buộc").trim(),
    password: yup.string().required("Mật khẩu là bắt buộc").trim(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    login({ params: data });
  };

  const logInGoogle = (token: string) => {
    loginWithGoogle({
      params: {
        googleToken: token,
      },
    });
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
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="authentication-form"
                      >
                        <div className="mb-3">
                          <Label
                            for="email"
                            className="font-weight-bold text-dark"
                          >
                            Tên đăng nhập hoặc Email
                          </Label>
                          <input className="form-control" {...register("email")} />
                          {errors.email && (
                            <p className="text-danger mb-0">
                              {(errors as any)?.email?.message}
                            </p>
                          )}
                        </div>

                        <div className="mb-3">
                          <Label
                            for="password"
                            className="font-weight-bold text-dark"
                          >
                            Mật khẩu
                          </Label>
                          <input className="form-control" type="password" {...register("password")} />
                          {errors.password && (
                            <p className="text-danger mb-0">
                              {(errors as any)?.password?.message}
                            </p>
                          )}
                        </div>

                        <FormGroup className="form-group mb-0 pt-2 text-center">
                          <Button
                            className="btn-block btn btn-primary"
                            type="submit"
                            disabled={isLoading || !isValid || isGettingMe}
                          >
                            Đăng nhập
                          </Button>
                        </FormGroup>
                      </form>
                      {(isLoading || isGettingMe) ? (
                        <div className="mb-0 pt-2 text-center d-flex justify-content-center">
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Login...</span>
                          </Spinner>
                        </div>
                      ) : (
                        <div className="mb-0 pt-2 text-center d-flex justify-content-center">
                          <GoogleButton handlerLogin={logInGoogle} />
                        </div>
                      )}
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
  login: (payload: any) => dispatch(loginUser(payload)),
  loginWithGoogle: (payload: any) => dispatch(loginWithGoogle(payload)),
});

const mapStateToProps = (state: any) => {
  const { isLoading, isGettingMe } = state.authReducer;
  return { isLoading, isGettingMe };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof withConnect>;

export default NoAuthGuard(withConnect(Login));
