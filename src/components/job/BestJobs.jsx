// src/components/job/BestJobs.jsx
import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for navigation

const BestJobs = () => {
  const jobs = [
    {
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        salary: '15-25 triệu',
        logo: 'https://via.placeholder.com/50?text=CA' // Placeholder logo
    },
    {
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        salary: '15-25 triệu',
        logo: 'https://via.placeholder.com/50?text=CA' // Placeholder logo
    },
    {
      title: 'UI/UX Designer',
      company: 'Creative Agency',
      salary: '15-25 triệu',
      logo: 'https://via.placeholder.com/50?text=CA' // Placeholder logo
    },
    {
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        salary: '15-25 triệu',
        logo: 'https://via.placeholder.com/50?text=CA' // Placeholder logo
    },
    {
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        salary: '15-25 triệu',
        logo: 'https://via.placeholder.com/50?text=CA' // Placeholder logo
    },
    {
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        salary: '15-25 triệu',
        logo: 'https://via.placeholder.com/50?text=CA' // Placeholder logo
    },
  ];

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">Việc làm tốt nhất</h3>
        <Link to="/jobs"> {/* Link to your job listings page */}
          <Button variant="outline-primary">Xem tất cả</Button>
        </Link>
      </div>
      <Row>
        {jobs.map((job, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <Card className="shadow border-0 h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="rounded-circle border border-light"
                    style={{ width: '60px', height: '60px' }}
                  />
                </div>
                <Card.Title className="font-weight-bold">{job.title}</Card.Title>
                <Card.Text className="text-muted">{job.company}</Card.Text>
                <Card.Text className="text-success fw-bold">{job.salary}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <button className="btn btn-primary w-100">Apply Now</button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BestJobs;
