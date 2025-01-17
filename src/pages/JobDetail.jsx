import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
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
  Flag,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Clock,
  Building,
  Mail,
  Phone,
  Award,
  BookOpen,
  CheckCircle,
  UserPlus,
  UserMinus,
} from 'lucide-react';

import JobService from "../services/job.service";
import SendService from "../services/send.service";
import ReportService from "../services/report.service";
import FollowService from "../services/follow.service";

const JobDetail = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");
  const [applicationForm, setApplicationForm] = useState({
    name: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await JobService.getMatchingJobs();
        const jobsArray = response && typeof response === 'object' 
          ? Object.values(response) 
          : Array.isArray(response) 
            ? response 
            : [];
            
        const job = jobsArray.find(j => j.id === parseInt(jobId));
        if (job) {
          setJobDetails(job);
        } else {
          setError("Không tìm thấy công việc");
        }
      } catch (err) {
        setError("Không thể tải thông tin công việc");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleSaveNews = async () => {
    if (saveLoading) return;
    
    setSaveLoading(true);
    try {
      const response = await FollowService.changeFollowNews(jobId);
      setSaved(!saved);
      alert(response.message);
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Vui lòng đăng nhập để lưu tin tuyển dụng');
      } else {
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } finally {
      setSaveLoading(false);
    }
  };

  const handleFollow = async () => {
    if (followLoading) return;
    
    setFollowLoading(true);
    try {
      const response = await FollowService.changeFollow(jobDetails.employer.id);
      setFollowing(!following);
      // Hiển thị thông báo từ API
      alert(response.message);
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Vui lòng đăng nhập để theo dõi nhà tuyển dụng');
      } else {
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } finally {
      setFollowLoading(false);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      await SendService.sendProfile(applicationForm, jobId);
      setSubmitSuccess(true);
      setShowApplicationModal(false);
      setApplicationForm({ name: '' });
      
      alert('Đơn ứng tuyển của bạn đã được gửi thành công!');
    } catch (error) {
      if (error.response?.status === 401) {
        setSubmitError('Vui lòng đăng nhập và tạo hồ sơ trước khi ứng tuyển');
      } else {
        setSubmitError('Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại sau.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportContent.trim()) {
      setReportError("Vui lòng nhập nội dung báo cáo");
      return;
    }

    setReportLoading(true);
    setReportError("");

    try {
      await ReportService.addReport(jobId, reportContent);
      setShowReportModal(false);
      setReportContent("");
      alert("Báo cáo đã được gửi thành công!");
    } catch (error) {
      if (error.response?.status === 401) {
        setReportError("Vui lòng đăng nhập và ứng tuyển trước khi báo cáo");
      } else {
        setReportError(error.response?.data?.message || "Không thể gửi báo cáo. Vui lòng thử lại sau.");
      }
    } finally {
      setReportLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: value
    }));
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

  const { employer } = jobDetails;

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        <Card className="border-0 shadow-sm mb-4 overflow-hidden">
          <Card.Body className="p-4">
            <Row className="align-items-center g-4">
              <Col lg={2} md={3} className="text-center">
                <img
                  src={jobDetails.image_url || `${process.env.REACT_APP_BACKEND_URL}/storage/${employer.image}`}
                  alt={employer.company_name || "Company Logo"}
                  className="rounded-3 img-thumbnail shadow-sm"
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              
              <Col lg={7} md={9}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-primary-subtle text-primary rounded-pill">
                    {jobDetails.workingmodel}
                  </span>
                  <span className="badge bg-info">
                    Phù hợp {jobDetails.match_count}/100
                  </span>
                </div>
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
                onClick={handleSaveNews}
                disabled={saveLoading}
              >
                {saveLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <>
                    <Bookmark size={20} className="me-2" />
                    {saved ? "Đã lưu" : "Lưu tin"}
                  </>
                )}
              </Button>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Báo cáo việc làm không phù hợp</Tooltip>}
              >
                <Button 
                  variant="outline-danger" 
                  className="d-flex align-items-center"
                  onClick={() => setShowReportModal(true)}
                >
                  <Flag size={20} />
                </Button>
              </OverlayTrigger>
            </div>
          </Card.Body>
        </Card>

        {/* Modal Báo cáo */}
        <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Báo cáo việc làm không phù hợp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleReportSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nội dung báo cáo</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Vui lòng nhập lý do báo cáo..."
                  value={reportContent}
                  onChange={(e) => setReportContent(e.target.value)}
                  required
                />
              </Form.Group>
              {reportError && (
                <Alert variant="danger" className="mb-3">
                  {reportError}
                </Alert>
              )}
              <div className="d-flex justify-content-end gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowReportModal(false)}
                  disabled={reportLoading}
                >
                  Hủy
                </Button>
                <Button 
                  variant="danger" 
                  type="submit"
                  disabled={reportLoading || !reportContent.trim()}
                >
                  {reportLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Đang gửi...
                    </>
                  ) : (
                    "Gửi báo cáo"
                  )}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
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
                    {jobDetails.describe?.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="mb-4">Yêu cầu ứng viên</h4>
                  <div className="bg-light rounded-3 p-4">
                    {jobDetails.requirements?.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="mb-4">Quyền lợi</h4>
                  <div className="bg-light rounded-3 p-4">
                    {jobDetails.benefit?.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-4">Địa điểm làm việc</h4>
                  {jobDetails.workplacenews?.map((workplace, index) => (
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
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">
                      <Building size={24} className="me-2 text-primary" />
                      Thông tin công ty
                    </h4>
                    <Button
                      variant={following ? "success" : "outline-primary"}
                      className="d-flex align-items-center"
                      onClick={handleFollow}
                      disabled={followLoading}
                    >
                      {followLoading ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : following ? (
                        <>
                          <UserMinus size={18} className="me-2" />
                          Theo dỗi
                        </>
                      ) : (
                        <>
                          <UserPlus size={18} className="me-2" />
                          Đang theo dõi
                        </>
                      )}
                    </Button>
                  </div>

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
        <Modal
          show={showApplicationModal}
          onHide={() => {
            setShowApplicationModal(false);
            setSubmitError(null);
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Ứng tuyển vị trí {jobDetails.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submitError && (
              <Alert variant="danger" className="mb-3">
                {submitError}
              </Alert>
            )}
            {submitSuccess && (
              <Alert variant="success" className="mb-3">
                Đơn ứng tuyển của bạn đã được gửi thành công!
              </Alert>
            )}
            <Form onSubmit={handleApplicationSubmit}>
              <Row className="g-3">
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Họ và tên <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={applicationForm.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Alert variant="info">
                    <p className="mb-0">
                      <strong>Lưu ý:</strong> Hệ thống sẽ sử dụng thông tin từ hồ sơ của bạn để ứng tuyển. 
                      Vui lòng đảm bảo thông tin hồ sơ của bạn đã được cập nhật đầy đủ trước khi ứng tuyển.
                    </p>
                  </Alert>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowApplicationModal(false);
                setSubmitError(null);
              }}
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