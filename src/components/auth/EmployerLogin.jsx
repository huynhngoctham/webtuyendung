import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const EmployerLogin = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Đăng nhập thành công!");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form style={{ width: "400px" }} onSubmit={handleLogin}>
        <h3 className="text-center mb-4">Đăng nhập dành cho Nhà tuyển dụng</h3>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email công ty</Form.Label>
          <Form.Control type="email" placeholder="company@email.com" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="******" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRemember">
          <Form.Check type="checkbox" label="Ghi nhớ đăng nhập" />
        </Form.Group>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" type="submit">
            Đăng nhập
          </Button>
          <a href="/forgot-password">Quên mật khẩu?</a>
        </div>
        <div className="mt-3 text-center">
          <span>Chưa có tài khoản doanh nghiệp? </span>
          <a href="/Employer/register">Đăng ký ngay</a>
        </div>
      </Form>
    </Container>
  );
};

export default EmployerLogin;
