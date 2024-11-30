import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton, ListGroup, Row, Col } from 'react-bootstrap';
import ITService from '../../services/it.service'; // Import IT service

const ITSkills = ({ itSkills, onSave, onCancel }) => {
  const [softwareList, setSoftwareList] = useState([]); // Dữ liệu phần mềm từ API
  const [selectedSkills, setSelectedSkills] = useState([]); // Các phần mềm đã chọn

  useEffect(() => {
    const fetchSoftwareList = async () => {
      try {
        const data = await ITService.getAllIT(); // Lấy dữ liệu từ API
        setSoftwareList(data); // Cập nhật danh sách phần mềm
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phần mềm:', error);
      }
    };

    fetchSoftwareList();
  }, []);

  // Hàm xử lý chọn phần mềm
  const handleSelectSoftware = (software) => {
    if (selectedSkills.length < 4 && !selectedSkills.includes(software)) {
      setSelectedSkills([...selectedSkills, software]);
    }
  };

  // Hàm xử lý xóa phần mềm khỏi danh sách đã chọn
  const handleRemoveSoftware = (software) => {
    setSelectedSkills(selectedSkills.filter((item) => item !== software));
  };

  // Gửi dữ liệu lên cha (onSave)
  const handleSave = () => {
    onSave({ software: selectedSkills });
  };

  return (
    <div className="mb-4">
      <h5 className="mb-4">Thông tin tin học</h5>
      <Row className="mb-3">
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label>Chọn chứng chỉ</Form.Label>
            <div className="d-flex flex-column">
              {/* Dropdown */}
              <DropdownButton
                id="dropdown-software"
                title={selectedSkills.length ? 'Chọn chứng chỉ' : 'Chọn chứng chỉ'}
                variant="outline-primary"
                disabled={selectedSkills.length >= 4}
                style={{ width: '100%' }}
              >
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {softwareList.map((software) => (
                    <Dropdown.Item
                      key={software.id}
                      onClick={() => handleSelectSoftware(software.name)}
                    >
                      {software.name}
                    </Dropdown.Item>
                  ))}
                </div>
              </DropdownButton>
            </div>
          </Form.Group>
        </Col>

        <Col md={4}>
          <div>
            {/* Hiển thị các chứng chỉ đã chọn, gọn bên phải */}
            <ListGroup>
              {selectedSkills.map((software, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    fontSize: '0.85rem',
                    maxWidth: '100%', // Đảm bảo không quá rộng
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {software}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveSoftware(software)}
                    style={{ padding: '0.2rem 0.5rem' }}
                  >
                    Xóa
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-2" onClick={onCancel}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu tin học
        </Button>
      </div>
    </div>
  );
};

export default ITSkills;
