import { useRouter } from "next/router";
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
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import { logoutAction } from "redux/actions";
import { CookiesStorage } from "shared/config/cookie";
import { Search, User } from 'react-feather';
import Notification from "@/components/header/notification";

const Narbar = (props: PropsFromRedux) => {
  const { currentUser } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  }

  const handleSearch = () => {
    router.push({
      pathname: '/tim-kiem',
      query: {
        search
      }
    })
    if (router.pathname === '/tim-kiem') {
      router.reload()
    }
  }

  const onLogout = () => {
    CookiesStorage.clearAccessToken();
    dispatch(logoutAction())
    router.replace('/')
  }
  return (
    <Container className='position-sticky' fluid="md">
      <Navbar color="light" expand="md" light>
        <NavbarToggler onClick={toggleMenu} />
        <NavbarBrand href="/">NovelWeb</NavbarBrand>
        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/tim-kiem">Danh sách</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/thao-luan">Thảo luận</NavLink>
            </NavItem>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                  Hướng dẫn
                </DropdownToggle>
                <DropdownMenu end>
                  <NavLink href="/thao-luan/3">Đăng truyện</NavLink>
                  <NavLink href="/thao-luan/1">Giới thiệu</NavLink>
                  <NavLink href="/thao-luan/2">Góp ý - báo lỗi</NavLink>
                </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <div className='d-flex align-items-center' style={{ marginRight: 10 }}>
            <Input className="search-input" value={search} onChange={handleSearchChange} />
            <Search className='cursor-pointer' onClick={handleSearch} />
          </div>
          <Nav navbar>
            {!currentUser?.id ? (
              <NavItem>
                <NavLink href="/dang-nhap">Đăng nhập</NavLink>
              </NavItem>
            ) : (
                <>
                  <Notification/>
                  <UncontrolledDropdown inNavbar nav>
                    <DropdownToggle caret nav>
                        <User size={23} />
                      </DropdownToggle>
                      <DropdownMenu end>
                        <DropdownItem href="/admin">
                          Hệ thống
                        </DropdownItem>
                        <DropdownItem href="/thong-bao">
                            Thông báo
                        </DropdownItem>
                        <DropdownItem onClick={onLogout}>
                          Đăng xuất
                        </DropdownItem>
                      </DropdownMenu>
                  </UncontrolledDropdown>
                </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  currentUser: state.authReducer.user
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Narbar);
