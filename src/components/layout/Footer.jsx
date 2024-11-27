// src/components/layout/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: '#007bff' }}>
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="mb-3 text-white">Về chúng tôi</h5>
            <p className="text-white">
              Kết nối người tìm việc với nhà tuyển dụng, tạo cơ hội việc làm tốt nhất cho mọi người.
            </p>
          </Col>
          <Col md={2}>
            <h5 className="mb-3 text-white">Dành cho ứng viên</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/jobs" className="text-white text-decoration-none">Việc làm</Link>
              </li>
              <li className="mb-2">
                <Link to="/companies" className="text-white text-decoration-none">Công ty</Link>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h5 className="mb-3 text-white">Nhà tuyển dụng</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/post-job" className="text-white text-decoration-none">Đăng tuyển</Link>
              </li>
              <li className="mb-2">
                <Link to="/pricing" className="text-white text-decoration-none">Bảng giá</Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="mb-3 text-white">Liên hệ</h5>
            <ul className="list-unstyled text-white">
              <li className="mb-2">Email: </li>
              <li className="mb-2">Điện thoại: </li>
              <li>Địa chỉ:</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" style={{ borderColor: '#f1f1f1' }} />
        <div className="text-center text-white">
          <small>&copy; 2024 
            
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
