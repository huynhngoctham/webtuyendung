import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginCandidate } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';

const JobSeekerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Kiểm tra trong localStorage xem người dùng đã chọn ghi nhớ đăng nhập chưa
    const rememberMeStored = localStorage.getItem('rememberMe');
    if (rememberMeStored === 'true') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        login(user, ''); // Gọi hàm login với dữ liệu từ localStorage
        navigate('/'); // Chuyển hướng về trang chủ nếu đã đăng nhập
      }
    }
  }, [login, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginCandidate({ email, password });

      // Lưu thông tin đăng nhập vào context
      login(response.user, response.token);

      // Lưu tùy chọn "Ghi nhớ đăng nhập" vào localStorage
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
      }

      alert('Đăng nhập thành công!');
      navigate('/'); // Chuyển hướng về trang chủ
    } catch (err) {
      console.error('Login Error:', err);
      // Nếu không có response hoặc lỗi không có message
      setError(err.response?.data?.message || 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100" style={{ maxWidth: '400px' }}>
        <Col>
          <div className="text-center mb-4">
            <i className="fas fa-user" style={{ fontSize: '3rem' }}></i>
            <h3 className="mt-2">Đăng nhập Người tìm việc</h3>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                 
              />
            </Form.Group>

            <Form.Group className="mb-3">
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
              <Form.Check 
                type="checkbox" 
                label="Ghi nhớ đăng nhập" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-100" 
              disabled={loading}
            >
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
