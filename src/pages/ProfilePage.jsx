import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Sidebar from '../components/layout/Sidebar';
import ProfileLayout from '../components/profile/ProfileLayout';

const ProfilePage = () => {
  // Khởi tạo dữ liệu người dùng ban đầu
  const initialUserState = {
    email: 'nguyentronlhl@gmail.com',
    fullName: 'Tham Huynh',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    city: '',
    address: '',
    phone: '',
    avatar: null,
    avatarPreview: null,
  };

  const [user, setUser] = useState(initialUserState); // Trạng thái của người dùng
  const [errors, setErrors] = useState({});

  // Hàm xử lý thay đổi thông tin
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Hàm xử lý thay đổi ảnh đại diện
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser({
      ...user,
      avatar: file,
      avatarPreview: URL.createObjectURL(file),
    });
  };

  // Kiểm tra tính hợp lệ của form
  const validateForm = () => {
    const newErrors = {};

    if (!user.fullName) newErrors.fullName = 'Họ và tên là bắt buộc';
    if (!user.birthDate) newErrors.birthDate = 'Ngày sinh là bắt buộc';
    if (!user.gender) newErrors.gender = 'Giới tính là bắt buộc';
    if (!user.maritalStatus) newErrors.maritalStatus = 'Tình trạng hôn nhân là bắt buộc';
    if (!user.city) newErrors.city = 'Tỉnh / Thành phố là bắt buộc';
    if (!user.address) newErrors.address = 'Địa chỉ là bắt buộc';
    if (!user.phone) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(user.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi người dùng nhấn nút "Lưu thông tin"
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Thông tin cập nhật:', user);
      alert('Thông tin tài khoản đã được cập nhật');
    } else {
      alert('Vui lòng nhập đúng và đầy đủ thông tin.');
    }
  };

  // Hàm xử lý khi người dùng nhấn nút "Hủy"
  const handleCancel = () => {
    setUser(initialUserState); // Khôi phục lại trạng thái ban đầu
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={3} className="bg-light px-3">
          <Sidebar />
        </Col>
        <Col md={9}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h4>Tạo hồ sơ trực tuyến</h4>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <ProfileLayout
                  user={user}
                  errors={errors}
                  handleChange={handleChange}
                  handleFileChange={handleFileChange}
                />
                <div className="d-flex justify-content-end mt-3">
                  <Button variant="secondary" className="me-2" onClick={handleCancel}>
                    Hủy
                  </Button>
                  <Button variant="primary" type="submit">
                    Lưu thông tin
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
