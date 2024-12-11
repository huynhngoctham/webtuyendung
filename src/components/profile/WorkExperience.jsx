import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import WorkExperienceService from '../../services/work_ex.service';

const WorkExperience = ({ currentExperience = [], handleCancel, handleSave, profile_id }) => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [currentExperienceItem, setCurrentExperienceItem] = useState({
    id: null,
    company_name: '',
    job_position: '',
    start_time: '',
    end_time: '',
    description: '',
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);

  // Fetch work experiences from the server
  const handleFetchWorkExperiences = async () => {
    try {
      const response = await WorkExperienceService.getWorkExperience();
      setWorkExperiences(response);
      setErrorMessages([]);
    } catch (error) {
      console.error('Error fetching work experiences:', error);
      setErrorMessages(['Không thể tải danh sách kinh nghiệm làm việc.']);
    }
  };

  useEffect(() => {
    if (profile_id) {
      handleFetchWorkExperiences();
    }
  }, [profile_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperienceItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMessages([]);
  };

  const validateDate = (dateString) => {
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (!dateRegex.test(dateString)) return false;

    const [, day, month, year] = dateString.match(dateRegex);
    const date = new Date(year, month - 1, day);
    return (
      date instanceof Date &&
      !isNaN(date) &&
      date <= new Date() &&
      date.getFullYear() >= 1970
    );
  };

  const validateForm = () => {
    const errors = [];
    const { company_name, job_position, start_time, end_time, description } =
      currentExperienceItem;

    if (!company_name) errors.push('Công ty không được để trống.');
    if (!job_position) errors.push('Chức danh không được để trống.');
    if (!start_time) errors.push('Thời gian bắt đầu không được để trống.');
    if (!description) errors.push('Mô tả công việc không được để trống.');
    if (start_time && !validateDate(start_time))
      errors.push('Thời gian bắt đầu không hợp lệ (dd-mm-yyyy).');
    if (end_time && !validateDate(end_time))
      errors.push('Thời gian kết thúc không hợp lệ (dd-mm-yyyy).');

    if (start_time && end_time) {
      const [startDay, startMonth, startYear] = start_time.split('-').map(Number);
      const [endDay, endMonth, endYear] = end_time.split('-').map(Number);
      const startDate = new Date(startYear, startMonth - 1, startDay);
      const endDate = new Date(endYear, endMonth - 1, endDay);
      if (endDate < startDate) errors.push('Thời gian kết thúc phải sau thời gian bắt đầu.');
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    const payload = {
      profile_id,
      ...currentExperienceItem,
      end_time: currentExperienceItem.end_time || null,
    };

    try {
      if (currentExperienceItem.id) {
        await WorkExperienceService.updateWorkExperience(currentExperienceItem.id, payload);
      } else {
        await WorkExperienceService.addWorkExperience(payload);
      }

      await handleFetchWorkExperiences();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving work experience:', error);
    }
  };

  const resetForm = () => {
    setCurrentExperienceItem({
      id: null,
      company_name: '',
      job_position: '',
      start_time: '',
      end_time: '',
      description: '',
    });
  };

  const handleEdit = (experience) => {
    setCurrentExperienceItem(experience);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (experienceToDelete) {
      try {
        await WorkExperienceService.deleteWorkExperience(experienceToDelete.id);
        await handleFetchWorkExperiences();
        setShowDeleteModal(false);
        setExperienceToDelete(null);
      } catch (error) {
        console.error('Error deleting work experience:', error);
      }
    }
  };

  const confirmDelete = (experience) => {
    setExperienceToDelete(experience);
    setShowDeleteModal(true);
  };

  return (
    <div className="mb-4">
      <h5>Kinh nghiệm làm việc</h5>

      {workExperiences.length > 0 ? (
        workExperiences.map((experience, index) => {
          const startTime = experience.start_time
            ? new Date(experience.start_time).toLocaleDateString('vi-VN')
            : '';
          const endTime = experience.end_time
            ? new Date(experience.end_time).toLocaleDateString('vi-VN')
            : 'Hiện tại';

          return (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center mb-2"
            >
              <div>
                <strong>{experience.company_name}</strong> - {experience.job_position}{' '}
                ({startTime} {experience.end_time ? `- ${endTime}` : ''})
                <div>{experience.description}</div>
              </div>
              <div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(experience)}
                >
                  Sửa
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => confirmDelete(experience)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <p>Không có kinh nghiệm làm việc nào.</p>
      )}

      {!showForm && (
        <Button
          variant="outline-primary"
          className="mt-3"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Thêm Kinh Nghiệm
        </Button>
      )}

      {showForm && (
        <>
          {errorMessages.length > 0 && (
            <div className="alert alert-danger">
              {errorMessages.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Công ty</Form.Label>
                <Form.Control
                  type="text"
                  name="company_name"
                  value={currentExperienceItem.company_name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên công ty"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Chức danh</Form.Label>
                <Form.Control
                  type="text"
                  name="job_position"
                  value={currentExperienceItem.job_position}
                  onChange={handleInputChange}
                  placeholder="Nhập chức danh"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Thời gian bắt đầu</Form.Label>
                <Form.Control
                  type="text"
                  name="start_time"
                  value={currentExperienceItem.start_time}
                  onChange={handleInputChange}
                  placeholder="dd-mm-yyyy"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Thời gian kết thúc</Form.Label>
                <Form.Control
                  type="text"
                  name="end_time"
                  value={currentExperienceItem.end_time}
                  onChange={handleInputChange}
                  placeholder="dd-mm-yyyy (optional)"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả công việc</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={currentExperienceItem.description}
              onChange={handleInputChange}
              placeholder="Mô tả công việc của bạn"
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => setShowForm(false)}
            >
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Lưu
            </Button>
          </div>
        </>
      )}

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa kinh nghiệm làm việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa kinh nghiệm làm việc này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkExperience;
