import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart, FaUserCheck } from 'react-icons/fa';
import FollowService from '../../../services/follow.service';

// Hàm định dạng tiền Việt Nam
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const NotificationCard = ({ notification, type, onStatusChange }) => {
  const handleStatusChange = async () => {
    try {
      if (type === 'employer') {
        await FollowService.changeFollow(notification.id);
      } else if (type === 'news') {
        await FollowService.changeFollowNews(notification.id);
      }
      if (onStatusChange) {
        onStatusChange(notification.id);
      }
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center">
          <img
            src={notification.image_url || '/default-image.png'}
            alt="Company Logo"
            className="me-3"
            style={{ width: '50px', height: '50px' }}
          />
          <div style={{ flex: 1 }}>
            <Card.Title>{notification.title}</Card.Title>
            {notification.company_name && (
              <Card.Subtitle className="text-muted mb-1">{notification.company_name}</Card.Subtitle>
            )}
            {notification.email && (
              <Card.Subtitle className="text-muted">{notification.email}</Card.Subtitle>
            )}
            <div className="text-muted">
              {notification.salary && (
                <span>{formatCurrency(notification.salary)} | </span>
              )}
              {notification.rank && <span>{notification.rank} | </span>}
              {notification.workingmodel && <span>{notification.workingmodel}</span>}
            </div>
          </div>
          <Button variant="link" onClick={handleStatusChange}>
            {type === 'employer' ? (
              <>
                <FaUserCheck size={20} color="#0d6efd" />
                <span className="ms-1">Bỏ theo dõi</span>
              </>
            ) : (
              <>
                <FaHeart size={20} color="red" />
                <span className="ms-1">Hủy lưu</span>
              </>
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NotificationCard;
