import React, { useState } from 'react';
import { Card, Row, Col, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RecommendedJobs = () => {
  const recommendedJobs = [
    { id: 1, title: 'Data Scientist', company: 'Data Analytics Inc.', salary: '30-40 triệu', logo: 'https://via.placeholder.com/40' },
    { id: 2, title: 'Backend Developer', company: 'Web Solutions', salary: '25-35 triệu', logo: 'https://via.placeholder.com/40' },
    { id: 3, title: 'Backend Developer', company: 'Web Solutions', salary: '25-35 triệu', logo: 'https://via.placeholder.com/40' },
    { id: 4, title: 'Frontend Developer', company: 'Creative Tech', salary: '20-30 triệu', logo: 'https://via.placeholder.com/40' },
    { id: 5, title: 'UI/UX Designer', company: 'Design Studio', salary: '18-28 triệu', logo: 'https://via.placeholder.com/40' },
    { id: 6, title: 'Product Manager', company: 'Tech Innovators', salary: '35-45 triệu', logo: 'https://via.placeholder.com/40' },
    { id: 7, title: 'Software Engineer', company: 'Tech Enterprises', salary: '30-40 triệu', logo: 'https://via.placeholder.com/40' },
    { id: 8, title: 'QA Tester', company: 'Test Lab', salary: '15-25 triệu', logo: 'https://via.placeholder.com/40' },
    { id: 9, title: 'HR Specialist', company: 'HR Solutions', salary: '20-30 triệu', logo: 'https://via.placeholder.com/40' },
    { id: 10, title: 'Marketing Specialist', company: 'Market Pro', salary: '18-28 triệu', logo: 'https://via.placeholder.com/40' }
  ];

  // State to handle the current page
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // Number of jobs to show per page

  // Get the current jobs to display based on the page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = recommendedJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle pagination click
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(recommendedJobs.length / jobsPerPage);

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">Việc làm gợi ý</h3>
      </div>
      <Row>
        {currentJobs.map((job, index) => (
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
                <Link to={`/jobs/${job.id}`}>
                  <Button variant="primary" size="sm">Xem chi tiết</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default RecommendedJobs;
