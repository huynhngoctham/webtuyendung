import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import WorkplaceService from '../../services/workplace.service'; // Import WorkplaceService

const WorkplaceManagement = () => {
  const [workplaces, setWorkplaces] = useState([]); // Danh sách workplace
  const [filteredWorkplaces, setFilteredWorkplaces] = useState([]); // Workplace sau khi lọc
  const [searchTerm, setSearchTerm] = useState(''); // Tìm kiếm theo thành phố
  const [showModal, setShowModal] = useState(false); // Hiển thị modal
  const [currentWorkplace, setCurrentWorkplace] = useState({ id: null, city: '' }); // Workplace hiện tại
  const [isEditing, setIsEditing] = useState(false); // Chế độ chỉnh sửa hoặc thêm
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  // Lấy danh sách workplace khi component được mount
  useEffect(() => {
    fetchWorkplaces();
  }, []);

  // Lấy danh sách workplace từ API
  const fetchWorkplaces = async () => {
    setLoading(true);
    try {
      const data = await WorkplaceService.getAllWorkplace();
      console.log('Dữ liệu workplace:', data); // Kiểm tra dữ liệu trả về từ API
      setWorkplaces(data);
      setFilteredWorkplaces(data); // Cập nhật danh sách lọc ban đầu
    } catch (error) {
      console.error('Lỗi khi lấy danh sách workplace:', error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm tìm kiếm và lọc danh sách workplace theo thành phố
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === '') {
      setFilteredWorkplaces(workplaces); // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ danh sách
    } else {
      const filtered = workplaces.filter((workplace) =>
        workplace.city.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredWorkplaces(filtered); // Lọc danh sách theo từ khóa tìm kiếm
    }
  };

  // Mở modal
  const handleShowModal = (workplace = null, editing = false) => {
    setCurrentWorkplace(workplace || { id: null, city: '' });
    setIsEditing(editing);
    setShowModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentWorkplace({ id: null, city: '' });
  };

  // Thêm hoặc sửa workplace
  const handleSave = async () => {
    console.log('Dữ liệu hiện tại khi lưu:', currentWorkplace); // Kiểm tra dữ liệu workplace khi lưu
    try {
      if (isEditing) {
        // Sửa workplace
        await WorkplaceService.updateWorkplace(currentWorkplace.id, { city: currentWorkplace.city });
        alert('Cập nhật thành công!');
      } else {
        // Thêm workplace mới
        await WorkplaceService.addWorkplace({ city: currentWorkplace.city });
        alert('Thêm thành công!');
      }
      fetchWorkplaces(); // Tải lại danh sách
    } catch (error) {
      console.error('Lỗi khi lưu workplace:', error);
      alert(error);
    } finally {
      handleCloseModal();
    }
  };

  // Xóa workplace
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa workplace này?')) return;

    try {
      await WorkplaceService.deleteWorkplace(id);
      alert('Xóa thành công!');
      fetchWorkplaces(); // Tải lại danh sách
    } catch (error) {
      console.error('Lỗi khi xóa workplace:', error);
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
          <h3 className="text-success mb-4">Quản lý Workplace</h3>

          {/* Tìm kiếm */}
          <InputGroup className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            <Form.Control
              placeholder="Tìm kiếm theo thành phố..."
              value={searchTerm}
              onChange={handleSearch} // Gọi hàm khi người dùng thay đổi từ khóa tìm kiếm
            />
          </InputGroup>

          {/* Danh sách workplace */}
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Thành phố</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkplaces.length > 0 ? (
                  filteredWorkplaces.map((workplace) => (
                    <tr key={workplace.id}>
                      <td>{workplace.id}</td>
                      <td>{workplace.city}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowModal(workplace, true)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(workplace.id)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      Không tìm thấy workplace nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}

          {/* Nút thêm workplace */}
          <Button variant="success" onClick={() => handleShowModal()}>
            Thêm workplace
          </Button>
        </Col>
      </Row>

      {/* Modal thêm/sửa workplace */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Sửa workplace' : 'Thêm workplace'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCity">
              <Form.Label>Thành phố</Form.Label>
              <Form.Control
                type="text"
                value={currentWorkplace?.city || ''}
                onChange={(e) =>
                  setCurrentWorkplace({ ...currentWorkplace, city: e.target.value })
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
            disabled={!currentWorkplace?.city?.trim()}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default WorkplaceManagement;
