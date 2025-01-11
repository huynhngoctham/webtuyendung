import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { updateAdminAccount, getAdminAccount } from '../../services/change_pass.service'; // Import API functions

const AdminAccountPage = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [errors, setErrors] = useState({});

  // Load admin account info when the component mounts
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getAdminAccount();
        setUser({
          name: data.name,
          email: data.email,
          password: '', // Ensure password is not pre-filled
        });
      } catch (error) {
        setMessage(error.message || 'Lỗi khi lấy thông tin tài khoản');
        setMessageType('danger');
      }
    };
    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = 'Họ và tên là bắt buộc';
    if (!user.email) newErrors.email = 'Email là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      setMessage('Vui lòng kiểm tra lại thông tin');
      setMessageType('danger');
      return;
    }

    try {
      const updatedUser = {
        name: user.name,
        email: user.email,
        password: user.password || undefined, // Only send password if it's provided
      };

      // Log dữ liệu để kiểm tra
      console.log('Dữ liệu trước khi gửi:', updatedUser);

      const response = await updateAdminAccount(updatedUser);  // Gửi dữ liệu dưới dạng JSON
      setMessage(response.message || 'Cập nhật thành công');
      setMessageType('success');
    } catch (error) {
      console.error('Lỗi khi cập nhật tài khoản:', error.response || error.message);
      setMessage(error.message || 'Lỗi cập nhật tài khoản');
      setMessageType('danger');
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h4>Cập nhật thông tin tài khoản</h4>
            </Card.Header>
            <Card.Body>
              {message && <Alert variant={messageType}>{message}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Mật khẩu mới (nếu có)</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Lưu thay đổi
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAccountPage;
