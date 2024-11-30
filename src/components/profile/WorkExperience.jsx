import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const WorkExperience = ({ currentExperience = {}, handleInputChange, handleCheckboxChange, handleCancel, handleSave }) => {
  // Dự phòng nếu currentExperience chưa được khởi tạo
  const experience = currentExperience || {
    title: '',
    company: '',
    isCurrent: false,
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    description: '',
  };

  return (
    <div className="mb-4">
      <h5>Kinh nghiệm làm việc</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Chức danh</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={experience.title}
              onChange={handleInputChange}
              placeholder="Vd: Quản lý bộ phận"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Công ty</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={experience.company}
              onChange={handleInputChange}
              placeholder="E.g. Công ty Siêu Việt"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="isCurrent"
              label="Tôi đang làm ở đây"
              checked={experience.isCurrent}
              onChange={handleCheckboxChange}
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
              value={experience.startMonth}
              onChange={handleInputChange}
            >
              <option value="">Tháng</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
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
              value={experience.startYear}
              onChange={handleInputChange}
              placeholder="Năm"
            />
          </Form.Group>
        </Col>
        {!experience.isCurrent && (
          <>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Thời gian kết thúc - Tháng</Form.Label>
                <Form.Select
                  name="endMonth"
                  value={experience.endMonth}
                  onChange={handleInputChange}
                >
                  <option value="">Tháng</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
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
                  value={experience.endYear}
                  onChange={handleInputChange}
                  placeholder="Năm"
                />
              </Form.Group>
            </Col>
          </>
        )}
      </Row>
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả công việc</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={experience.description}
              onChange={handleInputChange}
              rows={3}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Buttons */}
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Hủy
        </Button>
        <Button variant="primary" onClick={() => handleSave(experience)}>
          Lưu kinh nghiệm
        </Button>
      </div>
    </div>
  );
};

export default WorkExperience;
