// UserMenu.jsx
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaUserCircle, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useAuth } from '../../context/AuthContext';

const UserMenu = ({ user }) => {
  const { logout } = useAuth();
  
  return (
    <NavDropdown
      title={
        <div className="d-inline-flex align-items-center">
          <FaUserCircle size={30} className="text-white" />
          <span className="text-white ms-2 d-none d-lg-inline">
            {user?.name || 'Người Tìm Việc'}
          </span>
        </div>
      }
      id="user-dropdown"
      align="end"
      menuVariant="dark"
    >
      <div className="px-3 py-2 border-bottom">
        <div className="fw-bold text-white">{user?.name || 'Người dùng'}</div>
        <div className="text-muted small">{user?.email}</div>
      </div>

      <NavDropdown.Item as={Link} to="/user/account" className="py-2">
        <FaFileAlt className="me-2" />
        Hồ sơ
      </NavDropdown.Item>

      <NavDropdown.Divider />

      <LogoutButton />
    </NavDropdown>
  );
};

export default UserMenu;