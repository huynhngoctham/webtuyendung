// PendingJobCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PendingJobCard = ({ job }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex align-items-center">
          <img src={job.logo} alt="Company Logo" className="me-3" style={{ width: '50px', height: '50px' }} />
          <div style={{ flex: 1 }}>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="text-muted">{job.company}</Card.Subtitle>
            <div className="text-muted">
              <span>{job.salary}</span> | <span>{job.location}</span>
            </div>
            <Card.Text className="mt-2">{job.description}</Card.Text>
          </div>
          {/* Apply button */}
          <Button variant="primary" onClick={() => alert('Apply functionality here')}>Apply</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PendingJobCard;
