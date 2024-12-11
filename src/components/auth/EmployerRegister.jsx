import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { registerEmployer } from "../../services/auth.service"; // Import hàm API từ auth.service.js

const EmployerRegister = () => {
  // State để lưu dữ liệu form
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    company_size: "", // Tạo state cho company_size
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Cập nhật trạng thái khi người dùng thay đổi thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý đăng ký khi người dùng gửi form
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Gọi hàm API từ auth.service.js
      const response = await registerEmployer(formData);
      setSuccessMessage(response.message); // Hiển thị thông báo thành công
      setErrorMessage(""); // Xóa thông báo lỗi (nếu có)
    } catch (error) {
      // Hiển thị thông báo lỗi khi có lỗi xảy ra
      setErrorMessage(error); // Lấy lỗi từ auth.service.js
      setSuccessMessage(""); // Xóa thông báo thành công (nếu có)
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form style={{ width: "400px" }} onSubmit={handleRegister}>
        <h3 className="text-center mb-4">Đăng ký dành cho Nhà tuyển dụng</h3>

        {/* Hiển thị thông báo lỗi nếu có */}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {/* Hiển thị thông báo thành công nếu có */}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form.Group className="mb-3" controlId="formCompanyName">
          <Form.Label>Tên công ty</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên công ty"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Số điện thoại liên hệ</Form.Label>
          <Form.Control
            type="tel"
            placeholder="0123456789"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Địa chỉ công ty</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập địa chỉ công ty"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
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

        {/* Dropdown cho Quy mô công ty */}
        <Form.Group className="mb-3" controlId="formCompanySize">
          <Form.Label>Quy mô công ty</Form.Label>
          <Form.Control
            as="select"
            name="company_size"
            value={formData.company_size}
            onChange={handleInputChange}
            required
          >
            <option value="">Chọn quy mô công ty</option>
            <option value="1-10">1-10 nhân viên</option>
            <option value="11-50">11-50 nhân viên</option>
            <option value="51-100">51-100 nhân viên</option>
            <option value="101-500">101-500 nhân viên</option>
            <option value="501+">501+ nhân viên</option>
          </Form.Control>
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
