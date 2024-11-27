import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../services/auth.service'; // Import logoutAdmin từ service

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin();  // Gọi hàm logoutAdmin để xóa token và thông tin
      navigate('/admin/login');  // Chuyển hướng người dùng về trang đăng nhập
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Navbar.Brand href="/admin/dashboard" className="ms-3 fs-4 fw-bold">
        Admin Dashboard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex align-items-center">
          {/* Add a profile icon if needed */}
          <Nav.Link className="text-light me-3">Hello, Admin</Nav.Link>
          {/* Nút đăng xuất */}
          <Button variant="outline-light" onClick={handleLogout} className="rounded-pill">
            Đăng xuất
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminHeader;
