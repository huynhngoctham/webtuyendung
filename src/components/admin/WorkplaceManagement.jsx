import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import LanguageService from '../../services/language.service';
import { FaArrowLeft } from 'react-icons/fa';

const LanguageManagement = () => {
  const [languages, setLanguages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({ id: null, language_name: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const data = await LanguageService.getAllLanguages();
      setLanguages(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách ngôn ngữ:', error);
      alert('Không thể tải danh sách ngôn ngữ.');
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await LanguageService.updateLanguage(currentLanguage.id, {
          language_name: currentLanguage.language_name,
        });
        alert('Cập nhật thành công!');
      } else {
        await LanguageService.addLanguage({ language_name: currentLanguage.language_name });
        alert('Thêm thành công!');
      }
      fetchLanguages();
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
      alert('Có lỗi xảy ra.');
    } finally {
      setShowModal(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      try {
        await LanguageService.deleteLanguage(id);
        alert('Xóa thành công!');
        fetchLanguages();
      } catch (error) {
        console.error('Lỗi khi xóa ngôn ngữ:', error);
        alert('Không thể xóa ngôn ngữ này.');
      }
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Button variant="outline-success" onClick={() => window.history.back()}>
            <FaArrowLeft /> Quay lại
          </Button>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => setShowModal(true)}>
            Thêm ngôn ngữ
          </Button>
        </Col>
      </Row>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Tìm kiếm ngôn ngữ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên ngôn ngữ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {languages
            .filter((lang) =>
              lang.language_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((lang) => (
              <tr key={lang.id}>
                <td>{lang.id}</td>
                <td>{lang.language_name}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => {
                      setCurrentLanguage(lang);
                      setIsEditing(true);
                      setShowModal(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(lang.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Chỉnh sửa ngôn ngữ' : 'Thêm ngôn ngữ'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tên ngôn ngữ</Form.Label>
              <Form.Control
                value={currentLanguage.language_name}
                onChange={(e) =>
                  setCurrentLanguage({ ...currentLanguage, language_name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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

export default LanguageManagement;
