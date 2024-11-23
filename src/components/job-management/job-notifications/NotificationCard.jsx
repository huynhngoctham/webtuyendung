// NotificationCard.jsx
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa'; // Import heart icon from react-icons

const NotificationCard = ({ notification }) => {
  const [isSaved, setIsSaved] = useState(false); // Track saved state

  const toggleSave = () => {
    setIsSaved(!isSaved); // Toggle saved state
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex align-items-center">
          <img src={notification.logo} alt="Company Logo" className="me-3" style={{ width: '50px', height: '50px' }} />
          <div style={{ flex: 1 }}>
            <Card.Title>{notification.title}</Card.Title>
            <Card.Subtitle className="text-muted">{notification.company}</Card.Subtitle>
            <div className="text-muted">
              <span>{notification.salary}</span> | <span>{notification.location}</span> | <span>{notification.date}</span>
            </div>
          </div>
          {/* Heart icon button */}
          <Button variant="link" onClick={toggleSave}>
            <FaHeart color={isSaved ? 'red' : 'lightgray'} /> {/* Toggle color based on saved state */}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NotificationCard;
