// PendingJobCardsPage.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../layout/Sidebar';
import PendingJobList from './PendingJobList';

const PendingJobCardsPage = () => {
  const pendingJobs = [
    {
      logo: 'path/to/logo1.png',
      title: 'Frontend Developer',
      company: 'Tech Corp',
      salary: '15 - 20 triệu',
      location: 'Hà Nội',
      description: 'Develop and maintain web applications with React and Redux.'
    },
    {
      logo: 'path/to/logo2.png',
      title: 'Backend Developer',
      company: 'Data Solutions',
      salary: '20 - 30 triệu',
      location: 'Hồ Chí Minh',
      description: 'Build and optimize backend systems and APIs.'
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
              <h2>Việc làm chờ ứng tuyển</h2>
              <p className="text-muted">Danh sách các công việc bạn đã xem nhưng chưa ứng tuyển</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <PendingJobList jobs={pendingJobs} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PendingJobCardsPage;
