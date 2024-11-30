import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Education = ({ education, updateUser, resetUser }) => {
  const [formState, setFormState] = useState(education);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSave = () => {
    updateUser(formState); // Gửi dữ liệu cập nhật lên cha
    alert('Thông tin học vấn đã được lưu.');
  };

  const handleCancel = () => {
    setFormState(education); // Reset form về dữ liệu từ cha
    alert('Đã hủy chỉnh sửa thông tin học vấn.');
  };

  return (
    <div className="mb-4">
      <h5>Thông tin học vấn</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Trường / Trung tâm đào tạo</Form.Label>
            <Form.Control
              type="text"
              name="schoolName"
              value={formState.schoolName}
              onChange={handleInputChange}
              placeholder="Nhập tên trường / trung tâm đào tạo"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Chuyên ngành đào tạo</Form.Label>
            <Form.Control
              type="text"
              name="major"
              value={formState.major}
              onChange={handleInputChange}
              placeholder="Nhập chuyên ngành đào tạo"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tên bằng cấp / chứng chỉ</Form.Label>
            <Form.Control
              type="text"
              name="degree"
              value={formState.degree}
              onChange={handleInputChange}
              placeholder="E.g. Bằng Cao Đẳng CNTT, Chứng chỉ nghề điện công nghiệp"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Thời gian bắt đầu - Tháng</Form.Label>
            <Form.Select
              name="startMonth"
              value={formState.startMonth}
              onChange={handleInputChange}
            >
              <option value="">Tháng</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Thời gian bắt đầu - Năm</Form.Label>
            <Form.Control
              type="number"
              name="startYear"
              value={formState.startYear}
              onChange={handleInputChange}
              placeholder="Năm"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Thời gian kết thúc - Tháng</Form.Label>
            <Form.Select
              name="endMonth"
              value={formState.endMonth}
              onChange={handleInputChange}
            >
              <option value="">Tháng</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Thời gian kết thúc - Năm</Form.Label>
            <Form.Control
              type="number"
              name="endYear"
              value={formState.endYear}
              onChange={handleInputChange}
              placeholder="Năm"
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Buttons */}
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu học vấn
        </Button>
      </div>
    </div>
  );
};

export default Education;
