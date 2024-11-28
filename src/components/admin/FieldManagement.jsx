import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { 
  getAllIndustries, 
  addIndustry, 
  updateIndustry, 
  deleteIndustry, 
  searchIndustry 
} from '../../services/industry.service'; // Import các API

const FieldManagement = () => {
  const [fields, setFields] = useState([]); // Danh sách lĩnh vực
  const [filteredFields, setFilteredFields] = useState([]); // Lĩnh vực sau khi lọc
  const [searchTerm, setSearchTerm] = useState(''); // Tìm kiếm
  const [showModal, setShowModal] = useState(false); // Hiển thị modal
  const [currentField, setCurrentField] = useState({ id: null, name: '' }); // Lĩnh vực hiện tại
  const [isEditing, setIsEditing] = useState(false); // Chế độ chỉnh sửa hoặc thêm
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  // Lấy danh sách lĩnh vực khi component được mount
  useEffect(() => {
    fetchFields();
  }, []);

  // Lấy danh sách lĩnh vực từ API
  const fetchFields = async () => {
    setLoading(true);
    try {
      const data = await getAllIndustries();
      setFields(data);
      setFilteredFields(data); // Cập nhật lại filteredFields với tất cả dữ liệu ban đầu
    } catch (error) {
      console.error('Lỗi khi lấy danh sách lĩnh vực:', error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm tìm kiếm và lọc danh sách lĩnh vực
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === '') {
      setFilteredFields(fields); // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ danh sách
    } else {
      const filtered = fields.filter(field => 
        field.industry_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFields(filtered); // Lọc danh sách theo từ khóa tìm kiếm
    }
  };

  // Mở modal
  const handleShowModal = (field = null, editing = false) => {
    setCurrentField(field || { id: null, name: '' });
    setIsEditing(editing);
    setShowModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentField({ id: null, name: '' });
  };

  // Thêm hoặc sửa lĩnh vực
  const handleSave = async () => {
    try {
      if (isEditing) {
        // Sửa lĩnh vực
        await updateIndustry(currentField.id, { industry_name: currentField.name });
        alert('Cập nhật thành công!');
      } else {
        // Thêm lĩnh vực mới
        await addIndustry({ industry_name: currentField.name });
        alert('Thêm thành công!');
      }
      fetchFields(); // Tải lại danh sách
    } catch (error) {
      console.error('Lỗi khi lưu lĩnh vực:', error);
      alert(error);
    } finally {
      handleCloseModal();
    }
  };

  // Xóa lĩnh vực
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa lĩnh vực này?')) return;

    try {
      await deleteIndustry(id);
      alert('Xóa thành công!');
      fetchFields(); // Tải lại danh sách
    } catch (error) {
      console.error('Lỗi khi xóa lĩnh vực:', error);
      alert(error);
    }
  };

  // Xử lý quay về trang dashboard
  const handleGoBack = () => {
    window.location.href = '/admin/dashboard';
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col className="d-flex align-items-center">
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
              onChange={handleSearch} // Gọi hàm khi người dùng thay đổi từ khóa tìm kiếm
            />
          </InputGroup>

          {/* Danh sách lĩnh vực */}
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
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
                    <td>{field.industry_name}</td>
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
          )}

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
                value={currentField?.name || ''}
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
            disabled={!currentField?.name?.trim()}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FieldManagement;