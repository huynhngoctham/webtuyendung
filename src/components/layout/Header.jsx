import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserMenu from './UserMenu';

const Header = () => {
  const { isAuthenticated, user } = useAuth();

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
                {/* Notifications */}
                <Nav.Link as={Link} to="/notifications" className="text-white me-3 position-relative">
                  <FaBell size={20} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                  </span>
                </Nav.Link>

                {/* User Menu */}
                <UserMenu user={user} />
              </>
            ) : (
              <>
                {/* Jobseeker Menu */}
                <NavDropdown
                  title={<span className="text-white fw-semibold">Người tìm việc</span>}
                  id="jobseeker-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/jobseeker/register">Đăng ký</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/jobseeker/login">Đăng nhập</NavDropdown.Item>
                </NavDropdown>

                {/* Employer Menu */}
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
