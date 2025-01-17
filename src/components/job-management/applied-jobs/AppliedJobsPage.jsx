// AppliedJobsPage.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../layout/Sidebar';
import AppliedJobList from './AppliedJobList';

const AppliedJobsPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <Row className="my-4">
            <Col>
              <h2>Việc làm đã ứng tuyển</h2>
              <p className="text-muted">Danh sách các công việc mà bạn đã ứng tuyển</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <AppliedJobList />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AppliedJobsPage;