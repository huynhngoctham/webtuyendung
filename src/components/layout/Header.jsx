// src/components/layout/Header.jsx
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar style={{ backgroundColor: '#007bff' }} expand="lg" className="shadow-sm py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold fs-3">
          JobOnline
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="navbar-nav" className="bg-white" />

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white fw-semibold">Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/jobs" className="text-white fw-semibold">Cơ hội việc làm</Nav.Link>
            <NavDropdown title={<span className="text-white">Danh mục</span>} id="category-dropdown" className="fw-semibold">
              <NavDropdown.Item as={Link} to="/jobs?category=it" className="text-dark">IT</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/jobs?category=marketing" className="text-dark">Marketing</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/jobs?category=sales" className="text-dark">Sales</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right-side User and Employer Links */}
          <Nav className="d-flex align-items-center">
            {/* Notification Bell with Hover Effect */}
            <Nav.Link href="#" className="text-white me-3 d-flex align-items-center">
              <FaBell size={20} className="text-white" style={{ transition: 'transform 0.2s' }} />
            </Nav.Link>

            {/* Người Tìm Việc Dropdown */}
            <NavDropdown title={<span className="text-white">Người tìm việc</span>} id="jobseeker-dropdown" className="fw-semibold me-3">
              <NavDropdown.Item as={Link} to="/register" className="text-dark">Đăng ký</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/login" className="text-dark">Đăng nhập</NavDropdown.Item>
            </NavDropdown>

            {/* Nhà Tuyển Dụng Dropdown */}
            <NavDropdown title={<span className="text-white">Nhà tuyển dụng</span>} id="employer-dropdown" className="fw-semibold me-3">
              <NavDropdown.Item as={Link} to="/employer-register" className="text-dark">Đăng ký</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/employer-login" className="text-dark">Đăng nhập</NavDropdown.Item>
            </NavDropdown>

            {/* User Profile with Hover Effect */}
            <Nav.Link href="#" className="text-white d-flex align-items-center">
              <FaUserCircle size={24} className="text-white" style={{ transition: 'transform 0.2s' }} />
              <span className="ms-2 text-white">Hồ sơ</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
