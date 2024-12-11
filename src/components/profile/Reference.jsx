import React, { useState, useEffect } from 'react'; // Import React
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'; // Import các component từ react-bootstrap
import ReferenceInfoService from '../../services/reference_info.service'; // Import service cho API gọi

const Reference = ({ profile_id }) => {
  const [referenceList, setReferenceList] = useState([]); // Danh sách người tham chiếu
  const [currentReference, setCurrentReference] = useState({
    id: null,
    name: '',
    company_name: '',
    phone_number: '',
    position: '',
    profile_id: profile_id,
  }); // Thông tin người tham chiếu hiện tại
  const [errorMessages, setErrorMessages] = useState([]); // Lỗi cần hiển thị
  const [showForm, setShowForm] = useState(false); // Trạng thái hiển thị form
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Trạng thái hiển thị modal xóa
  const [referenceToDelete, setReferenceToDelete] = useState(null); // Tham chiếu cần xóa

  // Lấy danh sách người tham chiếu từ API
  const handleFetchReferences = async () => {
    try {
      const response = await ReferenceInfoService.getReferenceInfo(); // Gọi API lấy dữ liệu
      setReferenceList(response); // Cập nhật danh sách người tham chiếu
      setErrorMessages([]); // Xóa lỗi trước khi tải dữ liệu mới
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người tham chiếu:', error);
      setErrorMessages(['Không thể tải danh sách người tham chiếu.']); // Hiển thị lỗi nếu có
    }
  };

  useEffect(() => {
    if (profile_id) {
      handleFetchReferences(); // Gọi API khi profile_id có giá trị
    }
  }, [profile_id]);

  // Xử lý thay đổi giá trị trường input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentReference((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMessages([]); // Xóa lỗi khi người dùng thay đổi input
  };

  // Kiểm tra tính hợp lệ của form
  const validateForm = () => {
    const errors = [];
    const { name, phone_number, company_name, position } = currentReference;

    // Kiểm tra tên (chỉ cho phép chữ cái và khoảng trắng)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name) {
      errors.push('Họ và tên không được để trống.');
    } else if (!nameRegex.test(name)) {
      errors.push('Họ và tên không hợp lệ. Chỉ chứa chữ cái và khoảng trắng.');
    }

    // Kiểm tra các trường khác
    if (!phone_number) errors.push('Số điện thoại không được để trống.');
    if (!company_name) errors.push('Tên công ty không được để trống.');
    if (!position) errors.push('Chức vụ không được để trống.');

    return errors;
  };

  // Xử lý khi gửi form
  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setErrorMessages(errors); // Hiển thị lỗi nếu có
      return;
    }

    const payload = {
      profile_id,
      name: currentReference.name,
      company_name: currentReference.company_name,
      phone_number: currentReference.phone_number,
      position: currentReference.position,
    };

    try {
      if (currentReference.id) {
        await ReferenceInfoService.updateReferenceInfo(currentReference.id, payload); // Cập nhật
      } else {
        await ReferenceInfoService.addReferenceInfo(payload); // Thêm mới
      }

      await handleFetchReferences(); // Làm mới danh sách
      resetForm();
      setShowForm(false); // Ẩn form sau khi gửi
    } catch (error) {
      console.error('Lỗi khi lưu thông tin:', error);

      // Kiểm tra lỗi từ phía backend
      if (error.response && error.response.data) {
        const backendErrors = error.response.data;
        const formattedErrors = Object.keys(backendErrors).map(field => `${field}: ${backendErrors[field].join(', ')}`);
        setErrorMessages(formattedErrors); // Hiển thị lỗi từ backend
      } else {
        setErrorMessages(['Không thể lưu thông tin người tham chiếu.']); // Lỗi chung nếu không có phản hồi chi tiết
      }
    }
  };

  // Đặt lại form
  const resetForm = () => {
    setCurrentReference({
      id: null,
      name: '',
      company_name: '',
      phone_number: '',
      position: '',
      profile_id: profile_id,
    });
  };

  // Xử lý khi chỉnh sửa thông tin người tham chiếu
  const handleEdit = (reference) => {
    setCurrentReference({
      ...reference,
    });
    setShowForm(true); // Hiển thị form chỉnh sửa
  };

  // Xử lý khi xóa thông tin người tham chiếu
  const handleDelete = async () => {
    if (referenceToDelete) {
      try {
        await ReferenceInfoService.deleteReferenceInfo(referenceToDelete.id); // Xóa
        await handleFetchReferences(); // Làm mới danh sách
        setShowDeleteModal(false);
        setReferenceToDelete(null);
      } catch (error) {
        console.error('Lỗi khi xóa người tham chiếu:', error);
        setErrorMessages(['Không thể xóa thông tin người tham chiếu.']); // Hiển thị lỗi khi xóa
      }
    }
  };

  // Xác nhận xóa
  const confirmDelete = (reference) => {
    setReferenceToDelete(reference);
    setShowDeleteModal(true); // Hiển thị modal xác nhận xóa
  };

  return (
    <div className="mb-4">
      <h5>Thông tin người tham chiếu</h5>

      {referenceList.length > 0 ? (
        referenceList.map((reference, index) => (
          <div key={index} className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>{reference.name}</strong> - {reference.company_name} ({reference.position})
              <div>{reference.phone_number}</div>
            </div>
            <div>
              <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(reference)}>
                Sửa
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => confirmDelete(reference)}>
                Xóa
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>Không có thông tin người tham chiếu nào.</p>
      )}

      {!showForm && (
        <Button variant="outline-primary" className="mt-3" onClick={() => setShowForm(true)}>
          Thêm Người Tham Chiếu
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
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentReference.name}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  value={currentReference.phone_number}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên công ty</Form.Label>
                <Form.Control
                  type="text"
                  name="company_name"
                  value={currentReference.company_name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên công ty"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Chức vụ</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={currentReference.position}
                  onChange={handleInputChange}
                  placeholder="Nhập chức vụ"
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
          <Modal.Title>Xóa người tham chiếu</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa người tham chiếu này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
          <Button variant="danger" onClick={handleDelete}>Xóa</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reference;
