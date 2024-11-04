// src/components/layout/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="mb-3">Về chúng tôi</h5>
            <p className="text-muted">
              Kết nối người tìm việc với nhà tuyển dụng, tạo cơ hội việc làm tốt nhất cho mọi người.
            </p>
          </Col>
          <Col md={2}>
            <h5 className="mb-3">Dành cho ứng viên</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/jobs" className="text-muted text-decoration-none">Việc làm</Link>
              </li>
              <li className="mb-2">
                <Link to="/companies" className="text-muted text-decoration-none">Công ty</Link>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h5 className="mb-3">Nhà tuyển dụng</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/post-job" className="text-muted text-decoration-none">Đăng tuyển</Link>
              </li>
              <li className="mb-2">
                <Link to="/pricing" className="text-muted text-decoration-none">Bảng giá</Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="mb-3">Liên hệ</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">Email: contact@jobportal.com</li>
              <li className="mb-2">Điện thoại: (84) 123 456 789</li>
              <li>Địa chỉ: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <div className="text-center text-muted">
          <small>&copy; 2024 JobPortal. Tất cả các quyền được bảo lưu.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;