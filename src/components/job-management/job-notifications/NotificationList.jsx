import React from 'react';
import NotificationCard from './NotificationCard';  // Import NotificationCard

const NotificationList = ({ notifications, type, onStatusChange }) => {
  return (
    <div>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCard 
            key={notification.id} 
            notification={notification} 
            type={type}
            onStatusChange={onStatusChange}
          />
        ))
      ) : (
        <p className="text-center">Chưa có thông tin nào để hiển thị.</p>
      )}
    </div>
  );
};

export default NotificationList; // Default export
