// src/components/job/KeyIndustries.jsx
import React, { useState } from 'react';
import { Card, Row, Col, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const KeyIndustries = () => {
  const industries = [
    { name: 'IT', link: '/industries/it' },
    { name: 'Marketing', link: '/industries/marketing' },
    { name: 'Sales', link: '/industries/sales' },
    { name: 'Finance', link: '/industries/finance' },
    { name: 'Healthcare', link: '/industries/healthcare' },
    { name: 'Education', link: '/industries/education' }, // Fixed duplicate industry name
    { name: 'Engineering', link: '/industries/engineering' },
    { name: 'Hospitality', link: '/industries/hospitality' },
    { name: 'Retail', link: '/industries/retail' },
    { name: 'Manufacturing', link: '/industries/manufacturing' },
  ];

  // State to handle the current page
  const [currentPage, setCurrentPage] = useState(1);
  const industriesPerPage = 6; // Number of industries to show per page

  // Get the current industries to display based on the page
  const indexOfLastIndustry = currentPage * industriesPerPage;
  const indexOfFirstIndustry = indexOfLastIndustry - industriesPerPage;
  const currentIndustries = industries.slice(indexOfFirstIndustry, indexOfLastIndustry);

  // Handle pagination click
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(industries.length / industriesPerPage);

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">Ngành nghề trọng điểm</h3>
        {/* Remove the 'Xem tất cả' button and add pagination */}
      </div>
      
      {/* Industry Listings */}
      <Row>
        {currentIndustries.map((industry, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-3">
            <Card className="shadow-sm border-0 h-100 text-center">
              <Card.Body>
                <Card.Title className="fw-bold">{industry.name}</Card.Title>
                <Link to={industry.link} className="btn btn-primary btn-sm mt-2">Khám phá</Link>
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

export default KeyIndustries;
