import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginEmployer } from "../../services/auth.service"; // Import hàm API từ auth.service.js

const EmployerLogin = () => {
  const navigate = useNavigate(); // Để điều hướng sau khi đăng nhập
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Cập nhật state khi người dùng thay đổi thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý đăng nhập khi người dùng gửi form
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Gọi API từ auth.service.js
      const response = await loginEmployer(formData);

      // Kiểm tra nếu API trả về response hợp lệ và chứa token
      if (response.token) {
        // Lưu token vào localStorage
        localStorage.setItem("employer_token", response.token);

        // Hiển thị thông báo thành công
        setSuccessMessage("Đăng nhập thành công!");

        // Xóa thông báo lỗi nếu có
        setErrorMessage("");

        // Điều hướng đến trang EmployerDashboard khi đăng nhập thành công
        navigate("/employer/HomeEmployer");
      } else {
        // Nếu không có token, hiển thị lỗi
        setErrorMessage("Đăng nhập không thành công, vui lòng thử lại!");
      }
    } catch (error) {
      // Hiển thị thông báo lỗi khi có lỗi xảy ra
      setErrorMessage(error.response?.data?.message || "Đăng nhập thất bại"); // Lấy thông báo lỗi từ API
      setSuccessMessage(""); // Xóa thông báo thành công (nếu có)
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form style={{ width: "400px" }} onSubmit={handleLogin}>
        <h3 className="text-center mb-4">Đăng nhập dành cho Nhà tuyển dụng</h3>

        {/* Hiển thị thông báo lỗi nếu có */}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        {/* Hiển thị thông báo thành công nếu có */}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email công ty</Form.Label>
          <Form.Control
            type="email"
            placeholder="company@email.com"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Đã bỏ phần ghi nhớ mật khẩu */}
        
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
