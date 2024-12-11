import React, { useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';  // Thêm useNavigate để điều hướng
import { useAuth } from '../../context/AuthContext';
import UserMenu from './UserMenu';
import EmployerHeader from './EmployerHeader'; // Import EmployerHeader

const Header = () => {
  const { isAuthenticated, user, userType, logout } = useAuth();
  const navigate = useNavigate();  // Hook để điều hướng

  // Kiểm tra nếu người dùng là nhà tuyển dụng thì điều hướng tới Dashboard
  useEffect(() => {
    if (isAuthenticated && userType === 'employer') {
      navigate('/employer/dashboard');
    }
  }, [isAuthenticated, userType, navigate]);

  return (
    <Navbar style={{ backgroundColor: '#007bff' }} expand="lg" className="shadow-sm py-3">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold fs-3">
          JobOnline
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="bg-white" />

        <Navbar.Collapse id="navbar-nav">
          {/* Left Navigation */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white fw-semibold">
              Trang chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/job-opportunities" className="text-white fw-semibold">
              Cơ hội việc làm
            </Nav.Link>
          </Nav>

          {/* Right Navigation */}
          <Nav className="ms-auto d-flex align-items-center">
            {isAuthenticated ? (
              <>
                {/* Nếu là nhà tuyển dụng */}
                {userType === 'employer' ? (
                  <EmployerHeader user={user} logout={logout} />
                ) : (
                  // Hiển thị UserMenu nếu người dùng là jobseeker
                  <UserMenu user={user} />
                )}
              </>
            ) : (
              <>
                {/* Menu cho người tìm việc */}
                <NavDropdown
                  title={<span className="text-white fw-semibold">Người tìm việc</span>}
                  id="jobseeker-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/jobseeker/register">Đăng ký</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/jobseeker/login">Đăng nhập</NavDropdown.Item>
                </NavDropdown>

                {/* Menu cho nhà tuyển dụng */}
                <NavDropdown
                  title={<span className="text-white fw-semibold">Nhà tuyển dụng</span>}
                  id="employer-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/employer/register">Đăng ký</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/employer/login">Đăng nhập</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
