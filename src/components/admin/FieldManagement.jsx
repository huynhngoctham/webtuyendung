import React, { useState } from 'react';
import { Table, Button, Form, Modal, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa'; // Import biểu tượng mũi tên quay lại

const FieldManagement = () => {
  const [fields, setFields] = useState([
    { id: 1, name: 'Công nghệ thông tin' },
    { id: 2, name: 'Kinh doanh' },
    { id: 3, name: 'Giáo dục' },
  ]); // Danh sách lĩnh vực giả lập
  const [searchTerm, setSearchTerm] = useState(''); // Tìm kiếm
  const [showModal, setShowModal] = useState(false); // Hiển thị modal
  const [currentField, setCurrentField] = useState({ id: null, name: '' }); // Lĩnh vực hiện tại
  const [isEditing, setIsEditing] = useState(false); // Chế độ chỉnh sửa hoặc thêm

  // Mở modal
  const handleShowModal = (field = { id: null, name: '' }, editing = false) => {
    setCurrentField(field);
    setIsEditing(editing);
    setShowModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentField({ id: null, name: '' });
  };

  // Xử lý lưu (thêm hoặc sửa)
  const handleSave = () => {
    if (isEditing) {
      // Sửa lĩnh vực
      setFields(fields.map((field) =>
        field.id === currentField.id ? currentField : field
      ));
    } else {
      // Thêm lĩnh vực mới
      setFields([...fields, { id: Date.now(), name: currentField.name }]);
    }
    handleCloseModal();
  };

  // Xử lý xóa lĩnh vực
  const handleDelete = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Lọc danh sách theo tìm kiếm
  const filteredFields = fields.filter((field) =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý quay về trang dashboard (Giả sử là một hàm redirect)
  const handleGoBack = () => {
    // Ví dụ đơn giản quay về trang dashboard
    window.location.href = '/admin/dashboard';
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col className="d-flex align-items-center">
          {/* Nút quay về trang Dashboard */}
          <Button 
            variant="outline-success" 
            className="d-flex align-items-center gap-2 px-3 py-2" 
            onClick={handleGoBack}
            >
            <FaArrowLeft size={18} /> Quay lại
</Button>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <h3 className="text-success mb-4">Quản lý lĩnh vực</h3>

          {/* Tìm kiếm */}
          <InputGroup className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            <Form.Control
              placeholder="Tìm kiếm lĩnh vực..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success">Tìm kiếm</Button>
          </InputGroup>

          {/* Danh sách lĩnh vực */}
          <Table striped bordered hover responsive>
            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Tên lĩnh vực</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredFields.map((field) => (
                <tr key={field.id}>
                  <td>{field.id}</td>
                  <td>{field.name}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal(field, true)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(field.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredFields.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    Không tìm thấy lĩnh vực nào.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Nút thêm lĩnh vực */}
          <Button variant="success" onClick={() => handleShowModal()}>
            Thêm lĩnh vực
          </Button>
        </Col>
      </Row>

      {/* Modal thêm/sửa lĩnh vực */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Sửa lĩnh vực' : 'Thêm lĩnh vực'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFieldName">
              <Form.Label>Tên lĩnh vực</Form.Label>
              <Form.Control
                type="text"
                value={currentField.name}
                onChange={(e) =>
                  setCurrentField({ ...currentField, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!currentField.name.trim()}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FieldManagement;
