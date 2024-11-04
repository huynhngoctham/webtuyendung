// src/components/job/RecommendedJobs.jsx
import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RecommendedJobs = () => {
  const recommendedJobs = [
    {
      title: 'Data Scientist',
      company: 'Data Analytics Inc.',
      salary: '30-40 triệu',
      logo: 'https://via.placeholder.com/40' // Placeholder logo
    },
    {
      title: 'Backend Developer',
      company: 'Web Solutions',
      salary: '25-35 triệu',
      logo: 'https://via.placeholder.com/40' // Placeholder logo
    },
    {
        title: 'Backend Developer',
        company: 'Web Solutions',
        salary: '25-35 triệu',
        logo: 'https://via.placeholder.com/40' // Placeholder logo
    },
  ];

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">Việc làm gợi ý</h3>
        <Link to="/jobs"> {/* Link to your job listings page */}
          <Button variant="outline-primary">Xem tất cả</Button>
        </Link>
      </div>
      <Row>
        {recommendedJobs.map((job, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-3">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="text-center">
                <Card.Img
                  variant="top"
                  src={job.logo}
                  style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  className="mb-2"
                />
                <Card.Title className="fw-bold fs-6">{job.title}</Card.Title>
                <Card.Text className="text-muted">{job.company}</Card.Text>
                <Card.Text className="text-success">{job.salary}</Card.Text>
                <Button variant="primary" size="sm">Xem chi tiết</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RecommendedJobs;
