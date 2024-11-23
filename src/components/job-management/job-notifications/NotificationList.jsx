// NotificationList.jsx
import React from 'react';
import NotificationCard from './NotificationCard';

const NotificationList = ({ notifications }) => {
  return (
    <div>
      {notifications.map((notification, index) => (
        <NotificationCard key={index} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationList;
