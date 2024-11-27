import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Để điều hướng sau khi đăng nhập
import axios from "axios"; // Để gọi API đăng nhập

const EmployerLogin = () => {
  const navigate = useNavigate(); // Dùng hook navigate của react-router-dom để điều hướng
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
      // Gửi request POST đến API đăng nhập nhà tuyển dụng
      const response = await axios.post("http://127.0.0.1:8000/api/loginEmployer", formData);
      
      // Lưu token vào localStorage (hoặc sessionStorage tùy theo yêu cầu)
      localStorage.setItem("employer_token", response.data.token);
      
      setSuccessMessage(response.data.message); // Hiển thị thông báo thành công
      setErrorMessage(""); // Xóa thông báo lỗi (nếu có)

      // Điều hướng đến trang EmployerDashboard khi đăng nhập thành công
      navigate("/EmployerDashboard");
    } catch (error) {
      // Hiển thị thông báo lỗi khi có lỗi xảy ra
      setErrorMessage("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
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
