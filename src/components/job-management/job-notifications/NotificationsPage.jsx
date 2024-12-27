// src/components/job-management/job-notifications/NotificationsPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';  // Nhớ nhập các thành phần từ react-bootstrap
import Sidebar from '../../layout/Sidebar';  // Đảm bảo Sidebar được nhập đúng
import NotificationList from './NotificationList';  // Đảm bảo NotificationList được nhập đúng

const NotificationsPage = () => {
  const location = useLocation();
  const favorites = location.state?.favorites || [];  // Nhận favorites từ location.state hoặc mặc định là []

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <Row className="my-4">
            <Col>
              <h2>Việc làm đã lưu</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              {favorites.length > 0 ? (
                <NotificationList notifications={favorites} />
              ) : (
                <p className="text-center">Chưa có việc làm yêu thích nào.</p>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationsPage;
