import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import PostingService from '../../services/posting.service';
import { FaArrowLeft } from 'react-icons/fa';

const PostingManagement = () => {
  const [postings, setPostings] = useState([]);
  const [filteredPostings, setFilteredPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPosting, setCurrentPosting] = useState({
    id: null,
    name: '',
    type: 0,
    price: '',
    describe: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPostings();
  }, []);

  const fetchPostings = async () => {
    setLoading(true);
    try {
      const data = await PostingService.getAllPostings();
      setPostings(data);
      setFilteredPostings(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách gói dịch vụ:', error);
      alert('Không thể tải danh sách gói dịch vụ.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === '') {
      setFilteredPostings(postings);
    } else {
      const filtered = postings.filter((posting) =>
        posting.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPostings(filtered);
    }
  };

  const handleShowModal = (posting = null, editing = false) => {
    setCurrentPosting(
      posting || { id: null, name: '', type: 0, price: '', describe: '' }
    );
    setIsEditing(editing);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPosting({ id: null, name: '', type: 0, price: '', describe: '' });
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await PostingService.updatePosting(currentPosting.id, currentPosting);
        alert('Cập nhật thành công!');
      } else {
        await PostingService.addPosting(currentPosting);
        alert('Thêm thành công!');
      }
      fetchPostings();
    } catch (error) {
      console.error('Lỗi khi lưu gói dịch vụ:', error);
      alert('Có lỗi xảy ra.');
    } finally {
      handleCloseModal();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa gói dịch vụ này?')) return;

    try {
      await PostingService.deletePosting(id);
      alert('Xóa thành công!');
      fetchPostings();
    } catch (error) {
      console.error('Lỗi khi xóa gói dịch vụ:', error);
      alert('Không thể xóa gói dịch vụ này.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <Button
            variant="outline-success"
            className="d-flex align-items-center gap-2"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft size={18} /> Quay lại
          </Button>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => handleShowModal()}>
            Thêm gói dịch vụ
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <h3 className="text-success mb-4">Quản lý gói dịch vụ</h3>

          <InputGroup className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            <Form.Control
              placeholder="Tìm kiếm gói dịch vụ..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>

          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Tên gói</th>
                  <th>Loại</th>
                  <th>Giá</th>
                  <th>Mô tả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredPostings.map((posting) => (
                  <tr key={posting.id}>
                    <td>{posting.id}</td>
                    <td>{posting.name}</td>
                    <td>{posting.type === 1 ? 'Ưu tiên' : 'Bình thường'}</td>
                    <td>{posting.price}</td>
                    <td>{posting.describe}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowModal(posting, true)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(posting.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredPostings.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      Không tìm thấy gói dịch vụ nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Sửa gói dịch vụ' : 'Thêm gói dịch vụ'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên gói dịch vụ</Form.Label>
              <Form.Control
                value={currentPosting.name}
                onChange={(e) =>
                  setCurrentPosting({ ...currentPosting, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại</Form.Label>
              <Form.Select
                value={currentPosting.type}
                onChange={(e) =>
                  setCurrentPosting({ ...currentPosting, type: parseInt(e.target.value, 10) })
                }
              >
                <option value={0}>Bình thường</option>
                <option value={1}>Ưu tiên</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                value={currentPosting.price}
                onChange={(e) =>
                  setCurrentPosting({ ...currentPosting, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentPosting.describe}
                onChange={(e) =>
                  setCurrentPosting({ ...currentPosting, describe: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PostingManagement;
