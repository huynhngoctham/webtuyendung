import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Image, Button } from 'react-bootstrap';
import ProfileService from '../../services/profile.service';

const PersonalInfo = ({ profile, onSave, onEdit, onLockToggle, isEditing = false }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    gender: 'Nam',
    skills: '',
    day_ofbirth: '',
    salary: '',
    experience: '',
    address: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Convert the backend date format (yyyy-mm-dd) to the desired dd-mm-yyyy format
  const formatBackendDate = (dateString) => {
    if (!dateString) return '';
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
      return dateString; // Already in dd-mm-yyyy format
    }
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Convert display date format (dd-mm-yyyy) to backend (yyyy-mm-dd)
  const parseDisplayDate = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname || '',
        email: profile.email || '',
        phone_number: profile.phone_number || '',
        gender: profile.gender === 1 ? 'Nữ' : 'Nam',
        skills: profile.skills || '',
        day_ofbirth: profile.day_ofbirth ? formatBackendDate(profile.day_ofbirth) : '',
        salary: profile.salary || '',
        experience: profile.experience || '',
        address: profile.address || '',
        image: null
      });
      setPreviewImage(profile.image_url || '/default-avatar.png');
      setIsProfileSaved(true);
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    const errors = [];

    // Validate the form fields
    if (!formData.fullname) errors.push('Họ và tên là bắt buộc.');
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.push('Email không hợp lệ.');
    if (!formData.phone_number || !/^0[0-9]{9}$/.test(formData.phone_number)) errors.push('Số điện thoại không hợp lệ.');
    if (!formData.day_ofbirth) errors.push('Ngày sinh là bắt buộc.');
    if (!formData.skills) errors.push('Kỹ năng là bắt buộc.');
    if (!formData.salary) errors.push('Lương là bắt buộc.');
    if (!formData.experience) errors.push('Kinh nghiệm là bắt buộc.');
    if (!formData.address) errors.push('Địa chỉ là bắt buộc.');

    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (formData.day_ofbirth && !dateRegex.test(formData.day_ofbirth)) {
      errors.push('Ngày sinh không hợp lệ. Vui lòng nhập theo định dạng: dd-mm-yyyy.');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    // Start the loading state
    setIsLoading(true);
    const submitData = new FormData();
    
    // Append form data
    Object.keys(formData).forEach(key => {
      if (key !== 'image' && formData[key] !== null && formData[key] !== undefined) {
        submitData.append(key, formData[key]);
      }
    });

    // If there's an image, append it as well
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    try {
      const response = !profile
        ? await ProfileService.createProfile(submitData) // Create new profile
        : await ProfileService.updateProfile(submitData); // Update existing profile
      
      // After successful save/update, update the state and UI
      onSave(response.data);
      setIsProfileSaved(true);
      setErrorMessages([]);
      
      // Exit editing mode if in editing mode
      if (isEditing) {
        onEdit(false);
      }
    } catch (error) {
      console.error('Lỗi khi xử lý hồ sơ:', error.response?.data || error.message);
      setErrorMessages([error.response?.data?.message || 'Đã xảy ra lỗi khi xử lý hồ sơ.']);
    } finally {
      // End the loading state
      setIsLoading(false);
    }
  };

  if (!profile && !isEditing) {
    return (
      <div className="text-center">
        <p>Chưa có thông tin hồ sơ</p>
        <Button onClick={() => onEdit(true)}>Tạo hồ sơ</Button>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h5>Thông tin cá nhân</h5>

      {errorMessages.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Ảnh đại diện</Form.Label>
            <div className="position-relative">
              <Image
                src={previewImage || '/default-avatar.png'}
                roundedCircle
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              {isEditing && (
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  className="mt-2"
                  onChange={handleImageChange}
                />
              )}
            </div>
          </Form.Group>
        </Col>
        <Col md={9}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  placeholder="Họ và tên"
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="text"
                  name="day_ofbirth"
                  value={formData.day_ofbirth}
                  onChange={handleInputChange}
                  placeholder="dd-mm-yyyy"
                  disabled={!isEditing}
                />
                {isEditing && (
                  <small className="text-muted">Nhập ngày theo định dạng dd-mm-yyyy.</small>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Kỹ năng</Form.Label>
                <Form.Control
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="Kỹ năng"
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Giới tính</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Lương</Form.Label>
                <Form.Control
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="Lương"
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Kinh nghiệm</Form.Label>
                <Form.Control
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Kinh nghiệm"
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Địa chỉ"
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Buttons */}
      <div className="d-flex justify-content-start mt-3">
        {isEditing && (
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="me-2"
            disabled={isLoading}
          >
            {isLoading ? 'Đang lưu...' : 'Lưu Hồ Sơ'}
          </Button>
        )}

        {isProfileSaved && !isEditing && (
          <Button variant="secondary" onClick={() => onEdit(true)} className="me-2">
            Cập nhật
          </Button>
        )}

        {profile && !isEditing && (
          <Button variant="danger" onClick={onLockToggle}>
            {profile.isLocked ? 'Mở khóa hồ sơ' : 'Khóa hồ sơ'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
