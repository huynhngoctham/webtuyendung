import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import ITService from '../../services/it.service'; // Import IT service

const ItManagement = () => {
  const [itList, setItList] = useState([]); // Danh sách IT
  const [filteredItList, setFilteredItList] = useState([]); // Danh sách IT sau khi lọc
  const [searchTerm, setSearchTerm] = useState(''); // Tìm kiếm
  const [showModal, setShowModal] = useState(false); // Hiển thị modal
  const [currentIt, setCurrentIt] = useState({ id: null, name: '' }); // IT hiện tại
  const [isEditing, setIsEditing] = useState(false); // Chế độ chỉnh sửa hoặc thêm
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  // Lấy danh sách IT khi component được mount
  useEffect(() => {
    fetchItList();
  }, []);

  // Lấy danh sách IT từ API
  const fetchItList = async () => {
    setLoading(true);
    try {
      const data = await ITService.getAllIT();
      setItList(data);
      setFilteredItList(data); // Cập nhật danh sách lọc ban đầu
    } catch (error) {
      console.error('Lỗi khi lấy danh sách IT:', error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm tìm kiếm và lọc danh sách IT
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === '') {
      setFilteredItList(itList); // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ danh sách
    } else {
      const filtered = itList.filter((it) =>
        it.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItList(filtered); // Lọc danh sách theo từ khóa tìm kiếm
    }
  };

  // Mở modal
  const handleShowModal = (it = null, editing = false) => {
    setCurrentIt(it || { id: null, name: '' });
    setIsEditing(editing);
    setShowModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentIt({ id: null, name: '' });
  };

  // Thêm hoặc sửa IT
  const handleSave = async () => {
    try {
      if (isEditing) {
        // Sửa IT
        await ITService.updateIT(currentIt.id, { name: currentIt.name });
        alert('Cập nhật thành công!');
      } else {
        // Thêm IT mới
        await ITService.addIT({ name: currentIt.name });
        alert('Thêm thành công!');
      }
      fetchItList(); // Tải lại danh sách
    } catch (error) {
      console.error('Lỗi khi lưu IT:', error);
      alert(error);
    } finally {
      handleCloseModal();
    }
  };

  // Xóa IT
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa IT này?')) return;

    try {
      await ITService.deleteIT(id);
      alert('Xóa thành công!');
      fetchItList(); // Tải lại danh sách
    } catch (error) {
      console.error('Lỗi khi xóa IT:', error);
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
          <h3 className="text-success mb-4">Quản lý IT</h3>

          {/* Tìm kiếm */}
          <InputGroup className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            <Form.Control
              placeholder="Tìm kiếm IT..."
              value={searchTerm}
              onChange={handleSearch} // Gọi hàm khi người dùng thay đổi từ khóa tìm kiếm
            />
          </InputGroup>

          {/* Danh sách IT */}
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredItList.map((it) => (
                  <tr key={it.id}>
                    <td>{it.id}</td>
                    <td>{it.name}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowModal(it, true)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(it.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredItList.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      Không tìm thấy IT nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}

          {/* Nút thêm IT */}
          <Button variant="success" onClick={() => handleShowModal()}>
            Thêm IT
          </Button>
        </Col>
      </Row>

      {/* Modal thêm/sửa IT */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Sửa IT' : 'Thêm IT'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formItName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                value={currentIt?.name || ''}
                onChange={(e) =>
                  setCurrentIt({ ...currentIt, name: e.target.value })
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
            disabled={!currentIt?.name?.trim()}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ItManagement;
