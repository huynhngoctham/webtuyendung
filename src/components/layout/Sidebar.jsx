// src/components/layout/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaFileAlt, FaHeart, FaClock, FaBriefcase, FaBell, FaClipboardList } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar bg-light p-3" style={{ width: '250px' }}>
            {/* Account Management */}
            <div className="mb-4">
                <h5 className="d-flex align-items-center">
                    <FaUser className="me-2" /> Quản lý tài khoản
                </h5>
                {/* Sửa đường dẫn ở đây */}
                <Nav.Link as={Link} to="/user/account" className="text-dark d-flex align-items-center" style={{ marginBottom: '1rem' }}>
                    <FaUser className="me-2" /> Tài khoản của bạn
                </Nav.Link>
            </div>

            {/* Profile Management */}
            <div className="mb-4">
                <h5 className="d-flex align-items-center">
                    <FaFileAlt className="me-2" /> Quản lý hồ sơ
                </h5>
                {/* Đảm bảo đường dẫn dẫn đến ProfilePage hoặc AccountPage */}
                <Nav.Link as={Link} to="/profile" className="text-dark d-flex align-items-center" style={{ marginBottom: '1rem' }}>
                    <FaFileAlt className="me-2" /> Hồ sơ của bạn
                </Nav.Link>
            </div>

            {/* Job Management */}
            <div className="mb-4">
                <h5 className="d-flex align-items-center">
                    <FaBriefcase className="me-2" /> Quản lý việc làm
                </h5>
                <Nav.Link as={Link} to="/applied-jobs" className="text-dark d-flex align-items-center" style={{ marginBottom: '1rem' }}>
                <FaClipboardList className="me-2" /> Việc làm đã ứng tuyển
             </Nav.Link>
                <Nav.Link as={Link} to="/jobs/saved" className="text-dark d-flex align-items-center" style={{ marginBottom: '1rem' }}>
                    <FaHeart className="me-2" /> Việc làm đã lưu
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/jobs/pending" className="text-dark d-flex align-items-center" style={{ marginBottom: '1rem' }}>
                    <FaClock className="me-2" /> Việc làm chờ ứng tuyển
                </Nav.Link> */}
               
            </div>
        </div>
    );
};

export default Sidebar;
