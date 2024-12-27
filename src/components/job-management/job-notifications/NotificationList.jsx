// src/components/job-management/job-notifications/NotificationList.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

const NotificationList = ({ notifications }) => {
  return (
    <div>
      {notifications.map((job) => (
        <Card key={job.id} className="mb-3 shadow-sm">
          <Card.Body>
            <h5>{job.title}</h5>
            <p>{job.company_name}</p>
            <p>{job.location}</p>
            <Button variant="link">
              <FaHeart color="red" />
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default NotificationList;
