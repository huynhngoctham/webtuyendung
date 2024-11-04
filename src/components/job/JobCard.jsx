import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';

const JobCard = ({ job }) => (
  <Col md={6} lg={4}>
    <Card className="shadow-sm h-100">
      <Card.Img variant="top" src={job.companyLogo} />
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Text>
          <strong>{job.companyName}</strong><br />
          {job.location}<br />
          Salary: {job.salary}<br />
          Type: {job.type}
        </Card.Text>
        <Button variant="primary" href={`/jobs/${job.id}`}>View Details</Button>
      </Card.Body>
    </Card>
  </Col>
);

export default JobCard;
