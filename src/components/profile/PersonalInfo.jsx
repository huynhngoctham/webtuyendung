import React from 'react';
import { Form, Row, Col, Image, Button, Alert } from 'react-bootstrap';

const PersonalInfo = ({ user, errors, handleChange, handleFileChange, handleCancel, handleSubmit, isLoading }) => {
  return (
    <div className="mb-4">
      <h5>Thông tin cá nhân</h5>

      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Ảnh đại diện</Form.Label>
            <div className="position-relative">
              <Image
                src={user.avatarPreview || '/default-avatar.png'}
                roundedCircle
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-2"
              />
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
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  isInvalid={!!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={user.email}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={user.birthDate}
                  onChange={handleChange}
                  isInvalid={!!errors.birthDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.birthDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Giới tính</Form.Label>
                <Form.Select
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tỉnh/Thành phố</Form.Label>
                <Form.Select
                  name="city"
                  value={user.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="hochiminh">Hồ Chí Minh</option>
                  <option value="danang">Đà Nẵng</option>
                  <option value="hue">Huế</option>
                  <option value="cantho">Cần Thơ</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tình trạng hôn nhân</Form.Label>
                <Form.Select
                  name="maritalStatus"
                  value={user.maritalStatus}
                  onChange={handleChange}
                  isInvalid={!!errors.maritalStatus}
                >
                  <option value="">Chọn tình trạng hôn nhân</option>
                  <option value="single">Độc thân</option>
                  <option value="married">Đã kết hôn</option>
                  <option value="divorced">Ly hôn</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.maritalStatus}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleCancel} className="me-2">
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Đang lưu...' : 'Lưu thông tin'}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInfo;
