import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react"; 
import { Row, Col, Card, Pagination, ListGroup } from "react-bootstrap";
import { FaBriefcase, FaFileAlt, FaUsers, FaLock, FaUserTie } from "react-icons/fa";
import EmployerHeader from "../layout/EmployerHeader";
import MatchProfileService from "../../services/match.profile.service";

const HomeEmployer = () => {
  const [matchingProfiles, setMatchingProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const profilesPerPage = 6;

  useEffect(() => {
    fetchMatchingProfiles();
  }, []);

  const fetchMatchingProfiles = async () => {
    try {
      const response = await MatchProfileService.getMatchingProfiles();
      setMatchingProfiles(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching matching profiles:", error);
      setIsLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = matchingProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
  const totalPages = Math.ceil(matchingProfiles.length / profilesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <EmployerHeader />

      <div className="container-fluid">
        <Row className="bg-white">
          <Col md={{ span: 9, offset: 3 }} className="p-0">
            <div className="text-center">
              <img
                src="https://cdn1.vieclam24h.vn/images/seeker-banner/2024/09/06/Banner-giu%CC%9B%CC%83a-trang-chu%CC%89_-Desktop_1280x320_172559103332.jpg"
                alt="Logo"
                style={{ width: "100%", objectFit: "cover", height: "150px" }}
              />
            </div>
          </Col>
        </Row>

        <Row>
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
                {/* <ListGroup.Item>
                  <Link to="/employer/posting-jobs" className="text-decoration-none text-dark">
                    <FaUsers className="me-2" />
                    Gói dịch vụ
                  </Link>
                </ListGroup.Item> */}
                <ListGroup.Item>
                  <Link to="/employer/change-password" className="text-decoration-none text-dark">
                    <FaLock className="me-2" />
                    Đổi mật khẩu
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>

          <Col md={9} className="p-4">
            <h4 className="mb-3">Hồ sơ phù hợp</h4>
            {isLoading ? (
              <div className="text-center">Đang tải...</div>
            ) : (
              <>
                <Row>
                  {currentProfiles.map((profile, index) => (
                    <Col md={4} key={index} className="mb-3">
                      <Card className="shadow-sm h-100">
                        <Card.Body className="text-center d-flex flex-column">
                          {profile.image_url ? (
                            <img
                              src={profile.image_url}
                              alt={profile.name}
                              className="rounded-circle mx-auto mb-2"
                              style={{ width: "64px", height: "64px", objectFit: "cover" }}
                            />
                          ) : (
                            <FaUserTie size={32} className="text-primary mb-2 mx-auto" />
                          )}
                          <Card.Title>{profile.fullname}</Card.Title>
                          <Card.Text className="text-muted">
                            Điểm phù hợp: {profile.match_count}
                          </Card.Text>
                          <div className="mt-2">
                            <Card.Text className="mb-1">
                              <small>Kinh nghiệm: {profile.experience || "Chưa có"}</small>
                            </Card.Text>
                            <Card.Text className="mb-1">
                              <small>Cấp bậc: {profile.rank}</small>
                            </Card.Text>
                            <Card.Text className="mb-1">
                              <small>Email: {profile.email}</small>
                            </Card.Text>
                            <Card.Text className="mb-1">
                              <small>Điện thoại: {profile.phone_number}</small>
                            </Card.Text>
                            <Card.Text className="mb-1">
                              <small>Địa chỉ: {profile.address}</small>
                            </Card.Text>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {totalPages > 1 && (
                  <Pagination className="justify-content-center mt-4">
                    <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                    <Pagination.Prev
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                      onClick={() => paginate(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomeEmployer;
