import React, { useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import Sidebar from '../components/layout/Sidebar';
import ProfileLayout from '../components/profile/ProfileLayout';
import ProfileService from '../services/profile.service';

const ProfilePage = () => {
  const initialUserState = {
    email: '....@gmail.com',
    fullName: 'Tham Huynh',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    city: '',
    address: '',
    phone: '',
    avatar: null,
    avatarPreview: null,
    workExperiences: [],
    education: {
      schoolName: '',
      major: '',
      degree: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    },
    languageSkills: {
      language: '',
      proficiency: ''
    },
    itSkills: {
      software: '' // Thông tin phần mềm tin học
    },
  };

  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState({});

  // Hàm cập nhật thông tin và xử lý thay đổi cho từng phần
  const updateUserSection = (section, updatedData) => {
    setUser((prevState) => ({ ...prevState, [section]: updatedData }));
  };

  const resetUserSection = () => {
    setUser(initialUserState); // Reset về trạng thái ban đầu
    setErrors({}); // Clear any errors on reset
  };

  // Hàm kiểm tra lỗi cho từng phần
  const validateProfile = () => {
    const newErrors = {};

    // Kiểm tra thông tin cá nhân
    if (!user.fullName) newErrors.fullName = "Họ và tên không được để trống";
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Email không hợp lệ";
    if (!user.phone) newErrors.phone = "Số điện thoại không được để trống";
    if (!user.address) newErrors.address = "Địa chỉ không được để trống";
    
    setErrors(newErrors); // Cập nhật lỗi vào trạng thái
    return Object.keys(newErrors).length === 0; // Nếu không có lỗi thì trả về true
  };

  // Hàm gọi API lấy lại dữ liệu mới nhất
  const fetchProfile = async () => {
    try {
      const profileData = await ProfileService.getProfile();
      setUser(profileData);  // Cập nhật thông tin hồ sơ
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu hồ sơ:', err);
    }
  };

  const handleSaveProfile = () => {
    if (validateProfile()) {
      // Handle save logic here, call API or something else.
      console.log("Profile saved successfully:", user);
      fetchProfile();  // Gọi lại fetchProfile để lấy thông tin mới
    } else {
      console.log("Profile validation failed");
    }
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
              {/* Hiển thị lỗi nếu có */}
              {Object.keys(errors).length > 0 && (
                <Alert variant="danger">
                  <ul>
                    {Object.keys(errors).map((key) => (
                      <li key={key}>{errors[key]}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              
              <ProfileLayout
                user={user}           // Truyền thông tin người dùng hiện tại
                onSave={fetchProfile} // Truyền hàm fetchProfile vào onSave để sau khi lưu sẽ gọi lại
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;