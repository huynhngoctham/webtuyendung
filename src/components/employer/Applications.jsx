import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, ListGroup, Spinner, ListGroupItem, Modal, Form } from 'react-bootstrap';
import { FaBriefcase, FaFileAlt, FaUsers, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import EmployerHeader from '../layout/EmployerHeader';
import apiClient from '../../services/apiClient';
import GmailService from "../../services/gmail.service";
import { toast } from 'react-toastify';

const Applications = () => {
  const [recruitmentList, setRecruitmentList] = useState([]);
  const [selectedRecruitment, setSelectedRecruitment] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [processingAction, setProcessingAction] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  // Modal handlers
  const handleCloseAcceptModal = () => {
    setShowAcceptModal(false);
    setInterviewDate('');
    setInterviewTime('');
    setSelectedApplicationId(null);
  };

  const handleShowAcceptModal = (applicationId) => {
    setSelectedApplicationId(applicationId);
    setShowAcceptModal(true);
  };

  const fetchRecruitments = async () => {
    try {
      const response = await apiClient.get('/employer/list');
      const recruitments = response.data.data || response.data;

      if (Array.isArray(recruitments)) {
        setRecruitmentList(recruitments);
        if (recruitments.length > 0) {
          setSelectedRecruitment(recruitments[0]);
          fetchApplications(recruitments[0].id);
        }
      } else {
        setError('Không có dữ liệu tin tuyển dụng.');
      }
    } catch (error) {
      setError('Không thể tải danh sách tin tuyển dụng. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (recruitmentId) => {
    if (!recruitmentId) return;

    try {
      const response = await apiClient.get(`/employer/getProfile/${recruitmentId}`);
      if (!response.data.error) {
        setApplications(response.data.send || []);
        setError(null);
      } else {
        setApplications([]);
        setError(response.data.message);
      }
    } catch (error) {
      setError('Không thể tải danh sách ứng viên. Vui lòng thử lại sau.');
    }
  };

  const fetchCandidateProfile = async (candidateId) => {
    try {
      const response = await apiClient.get(`/employer/detailProfile/${candidateId}`);
      setSelectedCandidate({
        ...response.data.profile,
        industries: response.data.industry,
        workplace_details: response.data.workplace
      });
    } catch (error) {
      console.error('Error fetching candidate profile:', error);
      setError('Không thể tải hồ sơ ứng viên. Vui lòng thử lại sau.');
    }
  };

  const handleRecruitmentSelect = (recruitment) => {
    setSelectedRecruitment(recruitment);
    fetchApplications(recruitment.id);
    setSelectedCandidate(null);
  };

  const handleCandidateSelect = (candidateId) => {
    fetchCandidateProfile(candidateId);
  };

  // Handle accepting an application
  const handleAcceptApplication = async (e) => {
    e.preventDefault();
    if (!interviewDate || !interviewTime) {
      toast.error('Vui lòng chọn ngày và giờ phỏng vấn');
      return;
    }

    setProcessingAction(true);
    try {
      const formattedDateTime = `${interviewDate} ${interviewTime}`;
      const response = await GmailService.acceptStatus(selectedApplicationId, {
        interview_date: formattedDateTime
      });

      if (response) {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === selectedApplicationId
              ? { ...app, status: 'accepted', interview_date: formattedDateTime }
              : app
          )
        );
        toast.success('Đã chấp nhận ứng viên và gửi email thành công');
        handleCloseAcceptModal();
      }
    } catch (error) {
      toast.error('Không thể chấp nhận ứng viên. Vui lòng thử lại sau.');
    } finally {
      setProcessingAction(false);
    }
  };

  // Handle rejecting an application
  const handleRejectApplication = async (applicationId) => {
    if (!window.confirm('Bạn có chắc chắn muốn từ chối ứng viên này?')) {
      return;
    }

    setProcessingAction(true);
    try {
      const response = await GmailService.rejectStatus(applicationId);
      
      if (response) {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicationId
              ? { ...app, status: 'rejected' }
              : app
          )
        );
        toast.success('Đã từ chối ứng viên và gửi email thành công');
      }
    } catch (error) {
      toast.error('Không thể từ chối ứng viên. Vui lòng thử lại sau.');
    } finally {
      setProcessingAction(false);
    }
  };

  useEffect(() => {
    fetchRecruitments();
  }, []);

  return (
    <>
      <EmployerHeader />
      <div className="container-fluid">
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
                <ListGroup.Item active>
                  <Link to="/employer/applications" className="text-decoration-none text-white">
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

          <Col md={9} className="p-4">
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Đang tải...</span>
                </Spinner>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <Row>
                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Header className="bg-primary text-white">
                      <h5 className="mb-0">Danh sách tin tuyển dụng</h5>
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        {recruitmentList.map((recruitment) => (
                          <ListGroup.Item
                            key={recruitment.id}
                            action
                            active={selectedRecruitment?.id === recruitment.id}
                            onClick={() => handleRecruitmentSelect(recruitment)}
                          >
                            {recruitment.title}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={8}>
                  {selectedRecruitment && (
                    <Card>
                      <Card.Header className="bg-primary text-white">
                        <h5 className="mb-0">Danh sách ứng viên - {selectedRecruitment.title}</h5>
                      </Card.Header>
                      <Card.Body>
                        {applications.length > 0 ? (
                          <Table responsive striped bordered hover>
                            <thead>
                              <tr>
                                <th>Họ và tên</th>
                                <th>Ngày ứng tuyển</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                              </tr>
                            </thead>
                            <tbody>
                              {applications.map((app) => (
                                <tr key={app.id}>
                                  <td>{app.name}</td>
                                  <td>{new Date(app.senddate).toLocaleDateString('vi-VN')}</td>
                                  <td>{app.status}</td>
                                  <td>
                                    <Button 
                                      variant="info" 
                                      size="sm" 
                                      className="text-white me-2"
                                      onClick={() => handleCandidateSelect(app.id)}
                                    >
                                      Xem hồ sơ
                                    </Button>
                                    {app.status !== 'rejected' && app.status !== 'accepted' && (
                                      <>
                                        <Button
                                          variant="success"
                                          size="sm"
                                          className="me-2"
                                          onClick={() => handleShowAcceptModal(app.id)}
                                          disabled={processingAction}
                                        >
                                          Chấp nhận
                                        </Button>
                                        <Button
                                          variant="danger"
                                          size="sm"
                                          onClick={() => handleRejectApplication(app.id)}
                                          disabled={processingAction}
                                        >
                                          Từ chối
                                        </Button>
                                      </>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        ) : (
                          <div className="text-center">Không có ứng viên nào.</div>
                        )}
                      </Card.Body>
                    </Card>
                  )}
                </Col>

                {selectedCandidate && (
                  <Col md={12} className="mt-4">
                    <Card>
                      <Card.Header className="bg-primary text-white">
                        <h5 className="mb-0">Hồ sơ ứng viên - {selectedCandidate.fullname}</h5>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={4}>
                            <Card.Img
                              variant="top"
                              src={selectedCandidate.image_url}
                              alt={selectedCandidate.fullname}
                            />
                          </Col>
                          <Col md={8}>
                            <h4>{selectedCandidate.fullname}</h4>
                            <p><strong>Email:</strong> {selectedCandidate.email}</p>
                            <p><strong>Điện thoại:</strong> {selectedCandidate.phone_number}</p>
                            <p><strong>Giới tính:</strong> {selectedCandidate.gender === 0 ? 'Nam' : 'Nữ'}</p>
                            <p><strong>Ngày sinh:</strong> {new Date(selectedCandidate.day_ofbirth).toLocaleDateString('vi-VN')}</p>
                            <p><strong>Địa chỉ:</strong> {selectedCandidate.address}</p>
                            <p><strong>Vị trí mong muốn:</strong> {selectedCandidate.rank}</p>
                            <p><strong>Kinh nghiệm làm việc:</strong> {selectedCandidate.experience}</p>
                            <p><strong>Kỹ năng:</strong> {selectedCandidate.skills}</p>

                            {/* Work Experience Card */}
                            <Card className="mt-4">
                              <Card.Header><strong>Kinh nghiệm làm việc:</strong></Card.Header>
                              <Card.Body>
                                <ListGroup>
                                  {selectedCandidate.work_ex?.map((work, index) => (
                                    <ListGroupItem key={index}>
                                      <p><strong>Công ty:</strong> {work.company_name}</p>
                                      <p><strong>Vị trí:</strong> {work.job_position}</p>
                                      <p><strong>Thời gian:</strong> {new Date(work.start_time).toLocaleDateString()} đến {new Date(work.end_time).toLocaleDateString()}</p>
                                      <p><strong>Mô tả:</strong> {work.description}</p>
                                    </ListGroupItem>
                                  ))}
                                </ListGroup>
                              </Card.Body>
                            </Card>

                            {/* Education Card */}
                            <Card className="mt-4">
                              <Card.Header><strong>Học vấn:</strong></Card.Header>
                              <Card.Body>
                                <ListGroup>
                                  {selectedCandidate.academy?.map((edu, index) => (
                                    <ListGroupItem key={index}>
                                      <p><strong>Trường:</strong> {edu.schoolname}</p>
                                      <p><strong>Chuyên ngành:</strong> {edu.major}</p>
                                      <p><strong>Bằng cấp:</strong> {edu.degree}</p>
                                      <p><strong>Thời gian:</strong> {edu.start_time} đến {edu.end_time}</p>
                                    </ListGroupItem>
                                  ))}
                                </ListGroup>
                              </Card.Body>
                            </Card>

                            {/* References Card */}
                            <Card className="mt-4">
                              <Card.Header><strong>Tên người tham khảo:</strong></Card.Header>
                              <Card.Body>
                                <ListGroup>
                                  {selectedCandidate.reference?.map((ref, index) => (
                                    <ListGroupItem key={index}>
                                      <p><strong>Họ tên:</strong> {ref.name}</p>
                                      <p><strong>Vị trí:</strong> {ref.position} tại {ref.company_name}</p>
                                      <p><strong>Số điện thoại:</strong> {ref.phone_number}</p>
                                    </ListGroupItem>
                                  ))}
                                </ListGroup>
                              </Card.Body>
                            </Card>

                            {/* Industries and Workplace Card */}
                            <Card className="mt-4">
                              <Card.Header><strong>Thông tin ngành nghề và nơi làm việc:</strong></Card.Header>
                              <Card.Body>
                                <Row>
                                  <Col md={6}>
                                    <h6>Ngành nghề:</h6>
                                    <ListGroup>
                                      {selectedCandidate.industries?.map((industry, index) => (
                                        <ListGroupItem key={index}>
                                          {industry.industry_name}
                                        </ListGroupItem>
                                      ))}
                                    </ListGroup>
                                  </Col>
                                  <Col md={6}>
                                    <h6>Nơi làm việc:</h6>
                                    <ListGroup>
                                      {selectedCandidate.workplace_details?.map((workplace, index) => (
                                        <ListGroupItem key={index}>
                                          {workplace.city}
                                        </ListGroupItem>
                                      ))}
                                    </ListGroup>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </div>

      {/* Accept Application Modal */}
      <Modal show={showAcceptModal} onHide={handleCloseAcceptModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận chấp nhận ứng viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAcceptApplication}>
            <Form.Group className="mb-3">
              <Form.Label>Ngày phỏng vấn</Form.Label>
              <Form.Control
                type="date"
                required
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giờ phỏng vấn</Form.Label>
              <Form.Control
                type="time"
                required
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseAcceptModal}>
                Hủy
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={processingAction}
              >
                {processingAction ? 'Đang xử lý...' : 'Xác nhận'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Applications;