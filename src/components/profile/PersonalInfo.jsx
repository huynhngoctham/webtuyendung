import React from 'react';
import { Form, Row, Col, Image, Button } from 'react-bootstrap';

const PersonalInfo = () => {
  return (
    <div className="mb-4">
      <h5>Thông tin cá nhân</h5>

      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Ảnh đại diện</Form.Label>
            <div className="position-relative">
              <Image
                src="/default-avatar.png"
                roundedCircle
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <Form.Control
                type="file"
                accept="image/*"
                className="mt-2"
                disabled
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
                  defaultValue="Nguyễn Văn A"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue="example@gmail.com"
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
                  defaultValue="1990-01-01"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Giới tính</Form.Label>
                <Form.Select name="gender" defaultValue="male" disabled>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tỉnh/Thành phố</Form.Label>
                <Form.Select name="city" defaultValue="hanoi" disabled>
                  <option value="hanoi">Hà Nội</option>
                  <option value="hochiminh">Hồ Chí Minh</option>
                  <option value="danang">Đà Nẵng</option>
                  <option value="hue">Huế</option>
                  <option value="cantho">Cần Thơ</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  defaultValue="123 Đường ABC, Quận 1, TP. Hà Nội"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tình trạng hôn nhân</Form.Label>
                <Form.Select name="maritalStatus" defaultValue="single" disabled>
                  <option value="single">Độc thân</option>
                  <option value="married">Đã kết hôn</option>
                  <option value="divorced">Ly hôn</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" className="me-2" disabled>
              Hủy
            </Button>
            <Button variant="primary" disabled>
              Lưu thông tin
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInfo;
