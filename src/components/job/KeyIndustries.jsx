// src/components/job/KeyIndustries.jsx
import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const KeyIndustries = () => {
  const industries = [
    { name: 'IT', link: '/industries/it' },
    { name: 'Marketing', link: '/industries/marketing' },
    { name: 'Sales', link: '/industries/sales' },
    { name: 'Finance', link: '/industries/finance' },
    { name: 'Healthcare', link: '/industries/healthcare' },
    { name: 'Healthcare', link: '/industries/healthcare' },
  ];

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">Ngành nghề trọng điểm</h3>
        <Link to="/jobs"> {/* Link to your job listings page */}
          <Button variant="outline-primary">Xem tất cả</Button>
        </Link>
      </div>
      <Row>
        {industries.map((industry, index) => (
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
    </div>
  );
};

export default KeyIndustries;
