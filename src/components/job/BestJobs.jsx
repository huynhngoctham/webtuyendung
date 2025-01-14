import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Pagination, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JobService from '../../services/job.service';

const BestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(salary);
  };

  useEffect(() => {
    JobService.getMatchingJobs()
      .then((data) => {
        const jobsArray = data && typeof data === 'object' 
          ? Object.values(data) 
          : Array.isArray(data) 
            ? data 
            : [];
        setJobs(jobsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">Việc làm phù hợp với bạn</h3>
        <Link to="/job-opportunities">
          <Button variant="outline-primary">Xem tất cả</Button>
        </Link>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Row>
            {currentJobs.map((job) => (
              <Col key={job.id} xs={12} sm={6} md={4} className="mb-4">
                <Card className="shadow border-0 h-100">
                  <Card.Body className="text-center">
                    <div className="mb-3">
                      <img
                        src={job.image_url || 'https://www.vinamilk.com.vn/static/tpl/dist/assets/images/global/logo.webp?v=070723'}
                        alt={`${job.employer?.company_name} logo`}
                        className="rounded-circle border border-light"
                        style={{ width: '60px', height: '60px' }}
                      />
                    </div>
                    <Card.Title className="font-weight-bold">{job.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {job.employer && job.employer.company_name ? job.employer.company_name : 'Chưa có tên công ty'}
                    </Card.Text>
                    <Card.Text className="text-success fw-bold">
                      {formatSalary(job.salary)}
                    </Card.Text>
                    <div className="d-flex justify-content-between mt-2">
                      <small className="text-muted">
                        <i className="bi bi-briefcase me-1"></i>
                        {job.workingmodel}
                      </small>
                      <small className="text-muted">
                        <i className="bi bi-calendar-check me-1"></i>
                        {job.deadline}
                      </small>
                    </div>
                    <div className="mt-2">
                      <span className="badge bg-info text-white">
                        Phù hợp {job.match_count}/9
                      </span>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Link to={`/job/${job.id}`}>
                      <Button variant="primary" className="w-100">Ứng tuyển ngay</Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

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
        </>
      )}
    </div>
  );
};

export default BestJobs;
