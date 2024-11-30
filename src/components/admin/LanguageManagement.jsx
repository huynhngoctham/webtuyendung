import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import LanguageService from '../../services/language.service'; // Import LanguageService

const LanguageManagement = () => {
  const [languages, setLanguages] = useState([]); // Danh sách ngôn ngữ
  const [filteredLanguages, setFilteredLanguages] = useState([]); // Ngôn ngữ sau khi lọc
  const [searchTerm, setSearchTerm] = useState(''); // Tìm kiếm
  const [showModal, setShowModal] = useState(false); // Hiển thị modal
  const [currentLanguage, setCurrentLanguage] = useState({ id: null, language_name: '' }); // Ngôn ngữ hiện tại
  const [isEditing, setIsEditing] = useState(false); // Chế độ chỉnh sửa hoặc thêm
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  // Lấy danh sách ngôn ngữ khi component được mount
  useEffect(() => {
    fetchLanguages();
  }, []);

  // Lấy danh sách ngôn ngữ từ API
  const fetchLanguages = async () => {
    setLoading(true);
    try {
      const data = await LanguageService.getAllLanguages();
      setLanguages(data);
      setFilteredLanguages(data); // Cập nhật danh sách lọc ban đầu
    } catch (error) {
      console.error('Lỗi khi lấy danh sách ngôn ngữ:', error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm tìm kiếm và lọc danh sách ngôn ngữ
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === '') {
      setFilteredLanguages(languages); // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ danh sách
    } else {
      const filtered = languages.filter((language) =>
        language.language_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLanguages(filtered); // Lọc danh sách theo từ khóa tìm kiếm
    }
  };

  // Mở modal
  const handleShowModal = (language = null, editing = false) => {
    setCurrentLanguage(language || { id: null, language_name: '' });
    setIsEditing(editing);
    setShowModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentLanguage({ id: null, language_name: '' });
  };

  // Thêm hoặc sửa ngôn ngữ
  const handleSave = async () => {
    try {
      if (isEditing) {
        // Sửa ngôn ngữ
        await LanguageService.updateLanguage(currentLanguage.id, { language_name: currentLanguage.language_name });
        alert('Cập nhật thành công!');
      } else {
        // Thêm ngôn ngữ mới
        await LanguageService.addLanguage({ language_name: currentLanguage.language_name });
        alert('Thêm thành công!');
      }
      fetchLanguages(); // Tải lại danh sách
    } catch (error) {
      console.error('Lỗi khi lưu ngôn ngữ:', error);
      alert(error);
    } finally {
      handleCloseModal();
    }
  };

  // Xóa ngôn ngữ
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa ngôn ngữ này?')) return;

    try {
      await LanguageService.deleteLanguage(id);
      alert('Xóa thành công!');
      fetchLanguages(); // Tải lại danh sách
    } catch (error) {
      console.error('Lỗi khi xóa ngôn ngữ:', error);
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
          <h3 className="text-success mb-4">Quản lý ngôn ngữ</h3>

          {/* Tìm kiếm */}
          <InputGroup className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            <Form.Control
              placeholder="Tìm kiếm ngôn ngữ..."
              value={searchTerm}
              onChange={handleSearch} // Gọi hàm khi người dùng thay đổi từ khóa tìm kiếm
            />
          </InputGroup>

          {/* Danh sách ngôn ngữ */}
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Tên ngôn ngữ</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredLanguages.map((language) => (
                  <tr key={language.id}>
                    <td>{language.id}</td>
                    <td>{language.language_name}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowModal(language, true)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(language.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredLanguages.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      Không tìm thấy ngôn ngữ nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}

          {/* Nút thêm ngôn ngữ */}
          <Button variant="success" onClick={() => handleShowModal()}>
            Thêm ngôn ngữ
          </Button>
        </Col>
      </Row>

      {/* Modal thêm/sửa ngôn ngữ */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Sửa ngôn ngữ' : 'Thêm ngôn ngữ'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLanguageName">
              <Form.Label>Tên ngôn ngữ</Form.Label>
              <Form.Control
                type="text"
                value={currentLanguage?.language_name || ''}
                onChange={(e) =>
                  setCurrentLanguage({ ...currentLanguage, language_name: e.target.value })
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
            disabled={!currentLanguage?.language_name?.trim()}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LanguageManagement;
