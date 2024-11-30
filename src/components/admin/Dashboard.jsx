import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AdminHeader from '../layout/AdminHeader';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Khai báo navigate

  return (
    <div>
      <AdminHeader />
      
      {/* Greeting Section */}
      <Container className="my-5">
        <Row>
          <Col>
            <h1 className="text-center text-success">Chào mừng, {user?.name || 'Admin'}</h1>
            <p className="text-center text-secondary">Email: {user?.email}</p>
          </Col>
        </Row>
      </Container>

      {/* Dashboard Actions */}
      <Container>
        <Row className="my-4">
          {/* Card for Candidate Management */}
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-success text-center">Quản lý hồ sơ ứng viên</Card.Title>
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={() => navigate('/admin/candidate-management')}
                >
                  Xem danh sách
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card for Account Management */}
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-success text-center">Quản lý tài khoản</Card.Title>
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={() => navigate('/admin/account-management')}
                >
                  Xem danh sách
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card for Job Management */}
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-success text-center">Quản lý tin tuyển dụng</Card.Title>
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={() => navigate('/admin/job-management')}
                >
                  Xem danh sách
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card for Billing Management */}
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-success text-center">Quản lý dịch vụ và hóa đơn</Card.Title>
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={() => navigate('/admin/billing-management')}
                >
                  Xem danh sách
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="my-4">
          {/* Card for Field Management */}
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-success text-center">Quản lý lĩnh vực</Card.Title>
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={() => navigate('/admin/field-management')}
                >
                  Xem danh sách
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card for Feedback Management */}
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-success text-center">Quản lý phản hồi</Card.Title>
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={() => navigate('/admin/feedback-management')}
                >
                  Xem danh sách
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card for Company Management */}
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-success text-center">Quản lý tin học</Card.Title>
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={() => navigate('/admin/it-management')}
                >
                  Xem danh sách
                </Button>
              </Card.Body>
            </Card>
          </Col>
          {/* Card for Feedback Management */}
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-success text-center">Quản lý thành phố</Card.Title>
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={() => navigate('/admin/workplace-management')}
                >
                  Xem danh sách
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 shadow-lg border-light">
              <Card.Body>
                <Card.Title className="text-success text-center">Quản lý ngôn ngữ</Card.Title>
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={() => navigate('/admin/language-management')}
                >
                  Xem danh sách
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
