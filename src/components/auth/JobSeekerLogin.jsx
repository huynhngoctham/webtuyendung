import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { loginCandidate } from '../../services/auth.service';

const JobSeekerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Gửi request API đăng nhập
      const response = await loginCandidate({ email, password });
      console.log('Login Success:', response);

      // Xử lý sau khi đăng nhập thành công
      alert('Đăng nhập thành công!');
      // Lưu token hoặc thông tin người dùng nếu cần
      localStorage.setItem('token', response.token);
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.message || 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100" style={{ maxWidth: '400px' }}>
        <Col>
          <div className="text-center mb-4">
            <i className="fas fa-user" style={{ fontSize: '3rem' }}></i>
            <h3 className="mt-2">Đăng nhập dành cho Người tìm việc</h3>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Check type="checkbox" label="Ghi nhớ đăng nhập" />
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </div>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Chưa có tài khoản? <Link to="/jobseeker/register">Đăng ký ngay</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default JobSeekerLogin;
