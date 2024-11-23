import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const WorkExperience = ({ experiences, handleChange, handleCancel, handleSave }) => {
  const [currentExperience, setCurrentExperience] = useState({
    title: '',
    company: '',
    isCurrent: false,
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setCurrentExperience((prev) => ({ ...prev, isCurrent: e.target.checked }));
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
              value={currentExperience.title}
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
              value={currentExperience.company}
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
              checked={currentExperience.isCurrent}
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
              value={currentExperience.startMonth}
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
              value={currentExperience.startYear}
              onChange={handleInputChange}
              placeholder="Năm"
            />
          </Form.Group>
        </Col>
        {!currentExperience.isCurrent && (
          <>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Thời gian kết thúc - Tháng</Form.Label>
                <Form.Select
                  name="endMonth"
                  value={currentExperience.endMonth}
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
                  value={currentExperience.endYear}
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
              value={currentExperience.description}
              onChange={handleInputChange}
              rows={3}
            />
          </Form.Group>
        </Col>
      </Row>

     
    </div>
  );
};

export default WorkExperience;
