import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton, ListGroup } from 'react-bootstrap';
import LanguageService from '../../services/language.service'; // Import LanguageService

const LanguageSkills = ({ onSave, onCancel }) => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await LanguageService.getAllLanguages();
        setLanguages(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách ngôn ngữ:', error);
      }
    };
    fetchLanguages();
  }, []);

  const handleSelectLanguage = (language) => {
    if (selectedLanguages.length < 4 && !selectedLanguages.some((item) => item.language === language)) {
      setSelectedLanguages([...selectedLanguages, { language, proficiency: '' }]);
    }
  };

  const handleRemoveLanguage = (language) => {
    setSelectedLanguages(selectedLanguages.filter((item) => item.language !== language));
  };

  const handleProficiencyChange = (language, proficiency) => {
    setSelectedLanguages(
      selectedLanguages.map((item) =>
        item.language === language ? { ...item, proficiency } : item
      )
    );
  };

  return (
    <div className="mb-4">
      <h5>Thông tin ngoại ngữ</h5>

      {/* Dropdown chọn ngôn ngữ */}
      <Dropdown>
        <DropdownButton
          id="dropdown-language"
          title="Chọn ngôn ngữ"
          variant="outline-primary"
          disabled={selectedLanguages.length >= 4}
          className="text-primary bg-white border-primary"
        >
          {languages.map((lang) => (
            <Dropdown.Item
              key={lang.id}
              onClick={() => handleSelectLanguage(lang.language_name)}
              className="text-primary bg-white border-0"  // Đảm bảo nền là trắng và viền không thay đổi
            >
              {lang.language_name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Dropdown>

      {/* Danh sách ngôn ngữ đã chọn */}
      <ListGroup className="mt-3">
        {selectedLanguages.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center">
              <span>{item.language}</span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveLanguage(item.language)}
              >
                Xóa
              </Button>
            </div>
            {/* Dropdown chọn mức độ thành thạo */}
            <Form.Group className="mt-2">
              <Form.Label>Mức độ thành thạo</Form.Label>
              <Form.Select
                value={item.proficiency}
                onChange={(e) => handleProficiencyChange(item.language, e.target.value)}
              >
                <option value="">Chọn mức độ thành thạo</option>
                <option value="beginner">Mới bắt đầu</option>
                <option value="intermediate">Trung cấp</option>
                <option value="advanced">Nâng cao</option>
                <option value="fluent">Thành thạo</option>
              </Form.Select>
            </Form.Group>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Nút lưu và hủy */}
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-2" onClick={onCancel}>
          Hủy
        </Button>
        <Button
          variant="primary"
          onClick={() => onSave(selectedLanguages)}
          disabled={selectedLanguages.some((item) => !item.proficiency)}
        >
          Lưu ngoại ngữ
        </Button>
      </div>
    </div>
  );
};

export default LanguageSkills;
