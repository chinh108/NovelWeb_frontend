import React, { useState } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import { Home, User } from 'react-feather';
import { useRouter } from "next/router";
import { CookiesStorage } from "shared/config/cookie";
import { logoutAction } from "redux/actions";

const NarbarAuth = ({ currentUser }: PropsFromRedux) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const router = useRouter();

  const onLogout = () => {
    CookiesStorage.clearAccessToken();
    dispatch(logoutAction())
    router.replace('/dang-nhap')
  }
  return (
    <div className='position-sticky'>
      <Navbar color="light" expand="md" light>
        <NavbarBrand href={currentUser?.id ? '/admin' : '/'}>Bảng điều khiển</NavbarBrand>
        <NavbarBrand href="/">
            <Home />
        </NavbarBrand>
        <NavbarToggler onClick={toggleMenu} />
        <Collapse navbar isOpen={isOpen}>
          {currentUser?.id ? (
            <>
              <Nav className="me-auto" navbar>
                <NavItem>
                  <NavLink href="/admin/them-truyen">
                    Thêm truyện
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/admin/sang-tac">
                    Sáng tác
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown inNavbar nav>
                  <DropdownToggle caret nav>
                    Thảo luận
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <NavLink href="/admin/thao-luan/them-thao-luan">
                        Thêm thảo luận
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/admin/thao-luan">
                        Thảo luận của bạn
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <Nav navbar style={{ marginRight: 20 }}>
                <UncontrolledDropdown>
                  <DropdownToggle caret nav>
                      <User size={23} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        {currentUser?.name || currentUser?.username}
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem href="/thong-bao">
                          Thông báo
                      </DropdownItem>
                      <DropdownItem onClick={onLogout}>
                        Đăng xuất
                      </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </>
          ): (
            <>
              <div className="me-auto" ></div>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/dang-ky">Đăng kí</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/dang-nhap">Đăng nhập</NavLink>
                </NavItem>
              </Nav>
            </>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentUser: state.authReducer.user
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NarbarAuth);
