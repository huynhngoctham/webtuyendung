// NotificationsPage.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../layout/Sidebar';
import NotificationList from './NotificationList';

const NotificationsPage = () => {
  const notifications = [
    {
      logo: 'path/to/logo1.png',
      title: 'Nhân Viên IT Audit Thu Nhập Lên Tới 15 Triệu',
      company: 'Công Ty TNHH Yamaha Motor Việt Nam',
      salary: '11 - 15 triệu',
      location: 'Hà Nội',
      date: '21/11/2024'
    },
    {
      logo: 'path/to/logo2.png',
      title: 'Nhân Viên Kinh Doanh Xuất Nhập Khẩu',
      company: 'Công Ty TNHH Sản Xuất Và Xuất Nhập Khẩu Tapp',
      salary: '7 - 30 triệu',
      location: 'Hà Nội',
      date: '06/11/2024'
    }
  ];

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
              <NotificationList notifications={notifications} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationsPage;
