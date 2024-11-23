import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiGlobe } from 'react-icons/fi';

const Header = () => {
    const [language, setLanguage] = useState('vi'); // 'vi' for Vietnamese, 'en' for English

    const toggleLanguage = () => {
        setLanguage(prevLang => (prevLang === 'vi' ? 'en' : 'vi'));
    };

    return (
        <Navbar style={{ backgroundColor: '#007bff' }} expand="lg" className="shadow-sm py-3">
            <Container>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/" className="text-white fw-bold fs-3">
                    JobOnline
                </Navbar.Brand>

                {/* Toggle Button for Mobile View */}
                <Navbar.Toggle aria-controls="navbar-nav" className="bg-white" />

                {/* Navbar Links */}
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="text-white fw-semibold">Trang chủ</Nav.Link>
                        <Nav.Link as={Link} to="/job-opportunities" className="text-white fw-semibold">Cơ hội việc làm</Nav.Link>
                       
                    </Nav>

                    <Nav className="ms-auto d-flex align-items-center"> {/* Căn phải */}
                        <Nav.Link href="#" className="text-white me-3 position-relative">
                            <FaBell size={20} />
                            {/* Badge thông báo */}
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                            </span>
                        </Nav.Link>

                       {/* Job Seeker Dropdown */}
                    <NavDropdown title={<span className="text-white fw-semibold py-1">Người tìm việc</span>} id="user-dropdown" menuVariant="dark">
                         <NavDropdown.Item as={Link} to="/jobseeker/register">Đăng ký</NavDropdown.Item>
                         <NavDropdown.Item as={Link} to="/jobseeker/login">Đăng nhập</NavDropdown.Item>
                         <NavDropdown.Divider />
                         <NavDropdown.Item as={Link} to="/user/account">Hồ Sơ</NavDropdown.Item> {/* Updated to match the route in App.jsx */}
                    </NavDropdown>


                        <NavDropdown title={<span className="text-white fw-semibold py-1">Nhà tuyển dụng</span>} id="employer-dropdown" menuVariant='dark'>
                            <NavDropdown.Item as={Link} to="/employer/register">Đăng ký</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/employer/login">Đăng nhập</NavDropdown.Item>
                           
                           
                        </NavDropdown>

                        {/* Language Selector */}
                        <Nav.Link onClick={toggleLanguage} className="text-white d-flex align-items-center mx-3" style={{ cursor: 'pointer' }}>
                            {language === 'vi' ? (
                                <img src="./assets/images/icons8-english-48.png" alt="Vietnamese" width={30} height={24} />
                            ) : (
                                <img src="./assets/images/icons8-vietnam-48.png" alt="English" width={30} height={24} />
                            )}
                        </Nav.Link>

                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
