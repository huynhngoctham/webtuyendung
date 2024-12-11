import React, { useState, useEffect } from 'react'; // Import React at the top
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import AcademyProfileService from '../../services/academy_profile.service'; // Import service for API calls

const Education = ({ profile_id }) => {
  const [educationList, setEducationList] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    id: null,
    schoolName: '',
    major: '',
    degree: '',
    start_time: '', // Adjusted to match backend
    end_time: '',   // Adjusted to match backend
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState(null);

  // Fetch education data from the API
  const handleFetchEducation = async () => {
    try {
      const response = await AcademyProfileService.getAcademy(profile_id); // Adjust the service call accordingly
      setEducationList(response);  // Ensure that the response contains schoolName, major, degree, start_time, and end_time
      setErrorMessages([]);
    } catch (error) {
      console.error('Error fetching education:', error);
      setErrorMessages(['Không thể tải danh sách học vấn.']);
    }
  };

  useEffect(() => {
    if (profile_id) {
      handleFetchEducation();
    }
  }, [profile_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMessages([]); // Clear errors on input change
  };

  const validateForm = () => {
    const errors = [];
    const { schoolName, major, degree, start_time, end_time } = currentEducation;

    // Check for missing required fields
    if (!schoolName) errors.push('Trường / Trung tâm đào tạo không được để trống.');
    if (!major) errors.push('Chuyên ngành đào tạo không được để trống.');
    if (!degree) errors.push('Tên bằng cấp / chứng chỉ không được để trống.');
    if (!start_time) errors.push('Thời gian bắt đầu không hợp lệ.');

    // Validate that the end time is after start time
    if (end_time && new Date(end_time) < new Date(start_time)) {
      errors.push('Thời gian kết thúc phải sau thời gian bắt đầu.');
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
      schoolname: currentEducation.schoolName, // Match backend field
      major: currentEducation.major,            // Match backend field
      degree: currentEducation.degree,          // Match backend field
      start_time: currentEducation.start_time,  // Match backend field
      end_time: currentEducation.end_time,      // Match backend field
    };

    try {
      if (currentEducation.id) {
        await AcademyProfileService.updateAcademy(currentEducation.id, payload); // Adjust method name
      } else {
        await AcademyProfileService.addAcademy(payload); // Adjust method name
      }

      await handleFetchEducation();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving education:', error);
      setErrorMessages(['Không thể lưu thông tin học vấn.']);
    }
  };

  const resetForm = () => {
    setCurrentEducation({
      id: null,
      schoolName: '',
      major: '',
      degree: '',
      start_time: '', // Reset to match backend field
      end_time: '',   // Reset to match backend field
    });
  };

  const handleEdit = (education) => {
    setCurrentEducation({
      ...education,
      start_time: education.start_time ? education.start_time.split(' ')[0] : '', // Split to get dd-mm-yyyy
      end_time: education.end_time ? education.end_time.split(' ')[0] : '', // Same here
    });
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (educationToDelete) {
      try {
        await AcademyProfileService.deleteAcademy(educationToDelete.id); // Adjust method name
        await handleFetchEducation();
        setShowDeleteModal(false);
        setEducationToDelete(null);
      } catch (error) {
        console.error('Error deleting education:', error);
        setErrorMessages(['Không thể xóa thông tin học vấn.']);
      }
    }
  };

  const confirmDelete = (education) => {
    setEducationToDelete(education);
    setShowDeleteModal(true);
  };

  return (
    <div className="mb-4">
      <h5>Thông tin học vấn</h5>

      {educationList.length > 0 ? (
        educationList.map((education, index) => (
          <div key={index} className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>{education.schoolName}</strong> - {education.major} ({education.start_time} - {education.end_time || 'Hiện tại'})
              <div>{education.degree}</div>
            </div>
            <div>
              <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(education)}>
                Sửa
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => confirmDelete(education)}>
                Xóa
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>Không có thông tin học vấn nào.</p>
      )}

      {!showForm && (
        <Button variant="outline-primary" className="mt-3" onClick={() => setShowForm(true)}>
          Thêm Học Vấn
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
                <Form.Label>Trường / Trung tâm đào tạo</Form.Label>
                <Form.Control
                  type="text"
                  name="schoolName"
                  value={currentEducation.schoolName}
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
                  value={currentEducation.major}
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
                  value={currentEducation.degree}
                  onChange={handleInputChange}
                  placeholder="E.g. Bằng Cao Đẳng CNTT, Chứng chỉ nghề điện công nghiệp"
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
                  name="start_time"  // Adjusted to match backend field
                  value={currentEducation.start_time}
                  onChange={handleInputChange}
                  placeholder="Nhập thời gian bắt đầu (dd-mm-yyyy)"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Thời gian kết thúc</Form.Label>
                <Form.Control
                  type="text"
                  name="end_time"    // Adjusted to match backend field
                  value={currentEducation.end_time}
                  onChange={handleInputChange}
                  placeholder="Nhập thời gian kết thúc (dd-mm-yyyy)"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => setShowForm(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Lưu
            </Button>
          </div>
        </>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xóa học vấn</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa học vấn này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
          <Button variant="danger" onClick={handleDelete}>Xóa</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Education;
