import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const EmployerRegister = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Đăng ký thành công!");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form style={{ width: "400px" }} onSubmit={handleRegister}>
        <h3 className="text-center mb-4">Đăng ký dành cho Nhà tuyển dụng</h3>
        <Form.Group className="mb-3" controlId="formCompanyName">
          <Form.Label>Tên công ty</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên công ty" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email công ty</Form.Label>
          <Form.Control type="email" placeholder="company@email.com" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Số điện thoại liên hệ</Form.Label>
          <Form.Control type="tel" placeholder="0123456789" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Địa chỉ công ty</Form.Label>
          <Form.Control type="text" placeholder="Nhập địa chỉ công ty" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="******" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Xác nhận mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="******" required />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Đăng ký doanh nghiệp
        </Button>
        <div className="mt-3 text-center">
          <span>Đã có tài khoản doanh nghiệp? </span>
          <a href="/Employer/login">Đăng nhập</a>
        </div>
      </Form>
    </Container>
  );
};

export default EmployerRegister;
