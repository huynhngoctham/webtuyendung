
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  Tab,
  Nav,
  Spinner,
  Alert,
  OverlayTrigger,
  Tooltip,
  ListGroup,
  Modal,
  Form
} from "react-bootstrap";
import {
  Bookmark,
  Share2,
  Flag,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  Clock,
  Building,
  Mail,
  Phone,
  DollarSign,
  Award,
  BookOpen,
  CheckCircle,
  Upload
} from 'lucide-react';
import JobService from "../services/job.service";

const JobDetail = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentJob: '',
    expectedSalary: '',
    message: '',
    resume: null
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const data = await JobService.getJobDetailsById(jobId);
        setJobDetails(data);
      } catch (err) {
        setError("Không thể tải thông tin công việc");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle form submission here
      console.log('Form submitted:', applicationForm);
      
      // Reset form and close modal
      setApplicationForm({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        currentJob: '',
        expectedSalary: '',
        message: '',
        resume: null
      });
      setShowApplicationModal(false);
      
      // Show success message
      alert('Đơn ứng tuyển của bạn đã được gửi thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File không được vượt quá 5MB');
        return;
      }
      setApplicationForm(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(salary);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-2" />
          <p className="text-muted">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Đã có lỗi xảy ra</Alert.Heading>
          <p className="mb-0">{error}</p>
        </Alert>
      </Container>
    );
  }

  if (!jobDetails) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <Alert.Heading>Không tìm thấy công việc</Alert.Heading>
          <p className="mb-0">Công việc này không tồn tại hoặc đã bị gỡ bỏ.</p>
        </Alert>
      </Container>
    );
  }

  const { employer, industry } = jobDetails;

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        {/* Header Card */}
        <Card className="border-0 shadow-sm mb-4 overflow-hidden">
          <Card.Body className="p-4">
            <Row className="align-items-center g-4">
              <Col lg={2} md={3} className="text-center">
                <img
                  src={employer.image || "/default-company-logo.png"}
                  alt={employer.company_name}
                  className="rounded-3 img-thumbnail shadow-sm"
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover"
                  }}
                />
              </Col>
              
              <Col lg={7} md={9}>
                <span className="d-inline-block px-3 py-1 bg-primary-subtle text-primary rounded-pill mb-2">
                  {jobDetails.workingmodel}
                </span>
                <h1 className="display-6 mb-2">{jobDetails.title}</h1>
                <h2 className="h5 text-muted mb-3">{employer.company_name}</h2>
                
                <div className="d-flex flex-wrap gap-3 mb-3">
                  <div className="d-flex align-items-center text-muted">
                    <MapPin size={18} className="me-2" />
                    {employer.address}
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <Clock size={18} className="me-2" />
                    {jobDetails.experience} năm kinh nghiệm
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <Users size={18} className="me-2" />
                    {jobDetails.quantity} vị trí
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-3 mb-3">
                  <div className="d-flex align-items-center text-muted">
                    <Calendar size={18} className="me-2" />
                    Ngày đăng: {formatDate(jobDetails.created_at)}
                  </div>
                </div>
              </Col>
              
              <Col lg={3} className="text-lg-end">
                <div className="bg-light rounded-3 p-3 text-center">
                  <h3 className="text-primary mb-1">
                    {formatSalary(jobDetails.salary)}
                  </h3>
                  <p className="text-muted small mb-0">/tháng</p>
                </div>
                <p className="small text-danger mt-2 mb-0">
                  Hạn nộp: {formatDate(jobDetails.deadline)}
                </p>
              </Col>
            </Row>

            <hr className="my-4" />

            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <Button 
                variant="primary" 
                size="lg" 
                className="px-4 d-flex align-items-center"
                onClick={() => setShowApplicationModal(true)}
              >
                <CheckCircle size={20} className="me-2" />
                Ứng tuyển ngay
              </Button>
              <Button 
                variant={saved ? "success" : "outline-primary"}
                className="d-flex align-items-center"
                onClick={() => setSaved(!saved)}
              >
                <Bookmark size={20} className="me-2" />
                {saved ? "Đã lưu" : "Lưu tin"}
              </Button>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Báo cáo việc làm không phù hợp</Tooltip>}
              >
                <Button variant="outline-danger" className="d-flex align-items-center">
                  <Flag size={20} />
                </Button>
              </OverlayTrigger>
            </div>
          </Card.Body>
        </Card>

        <Row>
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <div className="mb-5">
                  <h4 className="mb-4">
                    <Briefcase size={24} className="me-2 text-primary" />
                    Thông tin công việc
                  </h4>
                  <Row className="g-4">
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="px-0">
                          <div className="d-flex align-items-center">
                            <Award className="text-primary me-3" size={20} />
                            <div>
                              <div className="text-muted small">Cấp bậc</div>
                              <div className="fw-medium">{jobDetails.rank}</div>
                            </div>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="px-0">
                          <div className="d-flex align-items-center">
                            <BookOpen className="text-primary me-3" size={20} />
                            <div>
                              <div className="text-muted small">Trình độ</div>
                              <div className="fw-medium">{jobDetails.qualifications}</div>
                            </div>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </div>
                <div className="mb-5">
                  <h4 className="mb-4">Mô tả công việc</h4>
                  <div className="bg-light rounded-3 p-4">
                    {jobDetails.describe.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="mb-4">Yêu cầu ứng viên</h4>
                  <div className="bg-light rounded-3 p-4">
                    {jobDetails.requirements.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="mb-4">Quyền lợi</h4>
                  <div className="bg-light rounded-3 p-4">
                    {jobDetails.benefit.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>


                <div>
                  <h4 className="mb-4">Địa điểm làm việc</h4>
                  {jobDetails.workplacenews.map((workplace, index) => (
                    <div 
                      key={index}
                      className="d-flex align-items-center mb-2"
                    >
                      <MapPin size={20} className="text-primary me-2" />
                      {workplace.homeaddress}
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <div className="sticky-top" style={{ top: "20px" }}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <h4 className="mb-4">
                    <Building size={24} className="me-2 text-primary" />
                    Thông tin công ty
                  </h4>

                  <ListGroup variant="flush">
                    <ListGroup.Item className="px-0">
                      <div className="text-muted small mb-1">Tên công ty</div>
                      <div className="fw-medium">{employer.company_name}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0">
                      <div className="text-muted small mb-1">Quy mô</div>
                      <div className="fw-medium">{employer.company_size} nhân viên</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0">
                      <div className="text-muted small mb-1">Email</div>
                      <div className="d-flex align-items-center">
                        <Mail size={16} className="me-2 text-primary" />
                        <span>{employer.email}</span>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0">
                      <div className="text-muted small mb-1">Số điện thoại</div>
                      <div className="d-flex align-items-center">
                        <Phone size={16} className="me-2 text-primary" />
                        <span>{employer.phone_number}</span>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0">
                      <div className="text-muted small mb-1">Địa chỉ</div>
                      <div className="d-flex align-items-center">
                        <MapPin size={16} className="me-2 text-primary" />
                        <span>{employer.address}</span>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        {/* Application Modal */}
        <Modal
          show={showApplicationModal}
          onHide={() => setShowApplicationModal(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Ứng tuyển vị trí {jobDetails.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleApplicationSubmit}>
              <Row className="g-3">
{/* Continuing from the Form inside Modal.Body */}
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Họ và tên <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={applicationForm.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={applicationForm.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập địa chỉ email của bạn"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Số điện thoại <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={applicationForm.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập số điện thoại của bạn"
                    />
                  </Form.Group>
                </Col>

                

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Công việc hiện tại</Form.Label>
                    <Form.Control
                      type="text"
                      name="currentJob"
                      value={applicationForm.currentJob}
                      onChange={handleInputChange}
                      placeholder="Nhập công việc hiện tại của bạn"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Mức lương mong muốn <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="expectedSalary"
                      value={applicationForm.expectedSalary}
                      onChange={handleInputChange}
                      required
                      placeholder="VD: 15,000,000 VNĐ"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Thư giới thiệu</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={applicationForm.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Giới thiệu ngắn gọn về bản thân và mong muốn của bạn với vị trí này"
                    />
                  </Form.Group>
                </Col>

                {/* <Col xs={12}>
                  <Form.Group>
                    <Form.Label>
                      CV của bạn <span className="text-danger">*</span>
                      <span className="text-muted ms-2">(PDF, DOCX, tối đa 5MB)</span>
                    </Form.Label>
                    <div className="d-flex align-items-center gap-3">
                      <Button
                        variant="outline-primary"
                        className="d-flex align-items-center gap-2"
                        onClick={() => document.getElementById('resume-upload').click()}
                      >
                        <Upload size={20} />
                        Tải CV lên
                      </Button>
                      {applicationForm.resume && (
                        <span className="text-success">
                          Đã chọn: {applicationForm.resume.name}
                        </span>
                      )}
                    </div>
                    <Form.Control
                      type="file"
                      id="resume-upload"
                      className="d-none"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                    />
                  </Form.Group>
                </Col> */}
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowApplicationModal(false)}
            >
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={handleApplicationSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    className="me-2"
                  />
                  Đang gửi...
                </>
              ) : (
                'Gửi đơn ứng tuyển'
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default JobDetail;