import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUserTie } from "react-icons/fa";

const LogoutButton = ({ onLogout }) => {
  return (
    <NavDropdown.Item onClick={onLogout} className="text-danger">
      Đăng xuất
    </NavDropdown.Item>
  );
};

const EmployerHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/employer/login");
  };

  return (
    <div className="d-flex justify-content-between align-items-center bg-primary p-3">
      {/* Logo */}
      <div className="text-white fw-bold" style={{ fontSize: "1.8rem" }}>
        JobOnline
      </div>

      {/* Dropdown menu */}
      <Nav>
        <NavDropdown
          title={
            <div className="d-inline-flex align-items-center">
              <FaUserTie size={20} className="text-white me-2" />
              <span className="text-white">{user?.name || "Nhà tuyển dụng"}</span>
            </div>
          }
          id="employer-dropdown"
          align="end"
          menuVariant="dark"
        >
          <LogoutButton onLogout={handleLogout} />
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default EmployerHeader;
