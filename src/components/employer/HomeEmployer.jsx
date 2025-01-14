import React from "react";
import { Row, Col, Card, Pagination, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBriefcase, FaFileAlt, FaUsers, FaLock, FaUserTie } from "react-icons/fa";
import EmployerHeader from "../layout/EmployerHeader";

const HomeEmployer = () => {
  // // Mock dữ liệu
  // const suggestedProfiles = [
  //   { name: "Nguyễn Văn A", position: "Frontend Developer" },
  //   { name: "Trần Thị B", position: "Backend Developer" },
  //   { name: "Phạm Văn C", position: "UI/UX Designer" },
  // ];
  // const potentialCandidates = [
  //   { name: "Lê Văn D", position: "QA Engineer" },
  //   { name: "Ngô Thị E", position: "Project Manager" },
  // ];

  return (
    <>
      {/* Header */}
      <EmployerHeader />

      {/* Main Layout */}
      <div className="container-fluid">
        {/* Logo (Row riêng biệt để kéo dài toàn màn hình trừ sidebar) */}
        <Row className="bg-white">
          <Col md={{ span: 9, offset: 3 }} className="p-0">
            <div className="text-center">
              <img
                src="https://cdn1.vieclam24h.vn/images/seeker-banner/2024/09/06/Banner-giu%CC%9B%CC%83a-trang-chu%CC%89_-Desktop_1280x320_172559103332.jpg" // Thay bằng logo của bạn
                alt="Logo"
                style={{ width: "100%", objectFit: "cover", height: "150px" }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          {/* Sidebar */}
          <Col md={3} className="bg-light border-end" style={{ minHeight: "100vh", paddingTop: "20px" }}>
            <div className="px-3">
              <h5 className="mb-4">QUẢN LÝ</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Link to="/employer/post-job" className="text-decoration-none text-dark">
                    <FaBriefcase className="me-2" />
                    Quản lý tin tuyển dụng
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/employer/job-list" className="text-decoration-none text-dark">
                    <FaFileAlt className="me-2" />
                    Danh sách công việc
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/employer/applications" className="text-decoration-none text-dark">
                    <FaUsers className="me-2" />
                    Quản lý ứng viên
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                <Link to="/employer/posting-jobs" className="text-decoration-none text-dark">
                  <FaUsers className="me-2" />
                    Gói dịch vụ
                 </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/employer/change-password" className="text-decoration-none text-dark">
                    <FaLock className="me-2" />
                    Đổi mật khẩu
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>

          
          {/* <Col md={9} className="p-4"> */}
            {/* Hồ sơ phù hợp */}
            {/* <h4 className="mb-3">Hồ sơ phù hợp</h4>
            <Row>
              {suggestedProfiles.map((profile, index) => (
                <Col md={4} key={index} className="mb-3">
                  <Card className="shadow-sm">
                    <Card.Body className="text-center">
                      <FaUserTie size={32} className="text-primary mb-2" />
                      <Card.Title>{profile.name}</Card.Title>
                      <Card.Text className="text-muted">{profile.position}</Card.Text>
                      <Button variant="primary" size="sm">
                        Xem chi tiết
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            {/* <Pagination className="justify-content-center mb-4">
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>  */}

            {/* Ứng viên tiềm năng */}
            {/* <h4 className="mb-3">Ứng viên tiềm năng</h4>
            <Row>
              {potentialCandidates.map((candidate, index) => (
                <Col md={4} key={index} className="mb-3">
                  <Card className="shadow-sm">
                    <Card.Body className="text-center">
                      <FaUserTie size={32} className="text-warning mb-2" />
                      <Card.Title>{candidate.name}</Card.Title>
                      <Card.Text className="text-muted">{candidate.position}</Card.Text>
                      <Button variant="primary" size="sm">
                        Xem chi tiết
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row> */}
          {/* </Col> */}
        </Row>
      </div>
    </>
  );
};

export default HomeEmployer;