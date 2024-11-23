import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerCandidate } from '../../services/auth.service';


const JobSeekerRegister = () => {
  const [formData, setFormData] = useState({
    name: '', // Đổi từ fullName thành name
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Gửi dữ liệu đến API
      const response = await registerCandidate(formData);
      console.log('Đăng ký thành công:', response);

      // Reset form và thông báo thành công
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      setSuccess(true);
      setError(null);
    } catch (err) {
      console.error('Lỗi đăng ký:', err);
      setError(err.message || 'Đăng ký thất bại');
      setSuccess(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100" style={{ maxWidth: '400px' }}>
        <Col>
          <div className="text-center mb-4">
            <i className="fas fa-user-plus" style={{ fontSize: '3rem' }}></i>
            <h3 className="mt-2">Đăng ký ứng viên</h3>
          </div>
          {success && <div className="alert alert-success">Đăng ký thành công!</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên của bạn"
                name="name" // Trường dữ liệu khớp với backend
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                name="email" // Trường dữ liệu khớp với backend
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                name="password" // Trường dữ liệu khớp với backend
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Đăng ký
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Đã có tài khoản? <Link to="/jobseeker/login">Đăng nhập</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default JobSeekerRegister;
