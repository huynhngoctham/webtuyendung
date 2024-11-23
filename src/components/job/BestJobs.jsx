// src/components/job/BestJobs.jsx
import React, { useState } from 'react';
import { Card, Row, Col, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BestJobs = () => {
  const jobs = [
    { id: 1, title: 'UI/UX Designer', company: 'Creative Agency', salary: '15-25 triệu', logo: 'https://via.placeholder.com/50?text=CA' },
    { id: 2, title: 'UI/UX Designer', company: 'Creative Agency', salary: '15-25 triệu', logo: 'https://via.placeholder.com/50?text=CA' },
    { id: 3, title: 'UI/UX Designer', company: 'Creative Agency', salary: '15-25 triệu', logo: 'https://via.placeholder.com/50?text=CA' },
    { id: 4, title: 'UI/UX Designer', company: 'Creative Agency', salary: '15-25 triệu', logo: 'https://via.placeholder.com/50?text=CA' },
    { id: 5, title: 'UI/UX Designer', company: 'Creative Agency', salary: '15-25 triệu', logo: 'https://via.placeholder.com/50?text=CA' },
    { id: 6, title: 'UI/UX Designer', company: 'Creative Agency', salary: '15-25 triệu', logo: 'https://via.placeholder.com/50?text=CA' },
    { id: 7, title: 'UI/UX Designer', company: 'Creative Agency', salary: '15-25 triệu', logo: 'https://via.placeholder.com/50?text=CA' },
    { id: 8, title: 'UI/UX Designer', company: 'Creative Agency', salary: '15-25 triệu', logo: 'https://via.placeholder.com/50?text=CA' },
    { id: 9, title: 'UI/UX Designer', company: 'Creative Agency', salary: '15-25 triệu', logo: 'https://via.placeholder.com/50?text=CA' },
    { id: 10, title: 'UI/UX Designer', company: 'Creative Agency', salary: '15-25 triệu', logo: 'https://via.placeholder.com/50?text=CA' },
  ];

  // State to handle the current page
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // Number of jobs to show per page

  // Get the current jobs to display based on the page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle pagination click
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">Việc làm Đang tuyển</h3>
        <Link to="/job-opportunities">
          <Button variant="outline-primary">Xem tất cả</Button>
        </Link>
      </div>

      {/* Job Listings */}
      <Row>
        {currentJobs.map((job, index) => (
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
                <Link to={`/job/${job.id}`}>
                  <Button variant="primary" className="w-100">Apply Now</Button>
                </Link>
              </Card.Footer>
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

export default BestJobs;
