import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown, DropdownButton, ListGroup } from 'react-bootstrap';
import LanguageService from '../../services/language.service';
import LanguageProfileService from '../../services/language_profile.service';

const LanguageSkills = ({ profileId, onSave, onCancel }) => {
  const [languages, setLanguages] = useState([]); // List of all available languages
  const [selectedLanguages, setSelectedLanguages] = useState([]); // Selected languages for the user

  // Fetch languages and user language details on component mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const allLanguages = await LanguageService.getAllLanguages();
        setLanguages(allLanguages);

        const userLanguages = await LanguageProfileService.getLanguageDetails(profileId);
        setSelectedLanguages(userLanguages); // API trả về danh sách có cả `id`
      } catch (error) {
        console.error('Lỗi khi lấy danh sách ngôn ngữ:', error);
      }
    };
    fetchLanguages();
  }, [profileId]);

  // Handle language selection
  const handleSelectLanguage = (language) => {
    if (
      selectedLanguages.length < 10 &&
      !selectedLanguages.some((item) => item.language_id === language.id)
    ) {
      setSelectedLanguages([...selectedLanguages, { language_id: language.id, level: '' }]);
    }
  };

  // Handle language removal (call API to delete)
  const handleRemoveLanguage = async (id) => {
    try {
      await LanguageProfileService.deleteLanguageDetails(id); // Xóa bản ghi với `id`
      setSelectedLanguages(selectedLanguages.filter((item) => item.id !== id)); // Cập nhật danh sách
      alert('Xóa ngôn ngữ thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa ngôn ngữ:', error);
      alert('Có lỗi xảy ra khi xóa ngôn ngữ.');
    }
  };

  // Handle proficiency level change
  const handleProficiencyChange = (languageId, proficiency) => {
    setSelectedLanguages(
      selectedLanguages.map((item) =>
        item.language_id === languageId ? { ...item, level: proficiency } : item
      )
    );
  };

  // Handle save functionality
  const handleSave = async () => {
    const validLanguages = selectedLanguages.filter((item) => item.level); // Chỉ lưu khi có level

    if (validLanguages.length === 0) {
      alert('Vui lòng chọn mức độ thành thạo cho các ngôn ngữ.');
      return;
    }

    try {
      await Promise.all(
        validLanguages.map(async (language) => {
          const existingLanguages = await LanguageProfileService.getLanguageDetails(profileId);
          const existing = existingLanguages.find(
            (item) => item.language_id === language.language_id
          );

          if (existing) {
            // Update nếu đã tồn tại
            await LanguageProfileService.updateLanguageDetails(existing.id, {
              profile_id: profileId,
              language_id: language.language_id,
              level: language.level,
            });
          } else {
            // Add nếu chưa tồn tại
            await LanguageProfileService.addLanguageDetails({
              profile_id: profileId,
              language_id: language.language_id,
              level: language.level,
            });
          }
        })
      );

      alert('Lưu thông tin ngôn ngữ thành công!');
      if (onSave) {
        onSave(selectedLanguages);
      }
    } catch (error) {
      console.error('Lỗi khi lưu ngôn ngữ:', error);
      alert('Có lỗi xảy ra khi lưu thông tin ngôn ngữ.');
    }
  };

  // Function to get language name from the selected languages list
  const getLanguageName = (languageId) => {
    const language = languages.find((lang) => lang.id === languageId);
    return language ? language.language_name : ''; // Return language name if found, else empty string
  };

  return (
    <div className="mb-4">
      <h5>Thông tin ngoại ngữ</h5>

      {/* Dropdown to select language */}
      <Dropdown>
        <DropdownButton
          id="dropdown-language"
          title="Chọn ngôn ngữ"
          variant="outline-primary"
          disabled={selectedLanguages.length >= 10}
        >
          {languages.map((lang) => (
            <Dropdown.Item key={lang.id} onClick={() => handleSelectLanguage(lang)}>
              {lang.language_name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Dropdown>

      {/* List of selected languages */}
      <ListGroup className="mt-3">
        {selectedLanguages.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center">
              <span>{getLanguageName(item.language_id)}</span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveLanguage(item.id)} // Truyền `id` để xóa
              >
                Xóa
              </Button>
            </div>

            {/* Dropdown for proficiency level */}
            <Form.Group className="mt-2">
              <Form.Label>Mức độ thành thạo</Form.Label>
              <Form.Select
                value={item.level}
                onChange={(e) => handleProficiencyChange(item.language_id, e.target.value)}
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

      {/* Save and Cancel buttons */}
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-2" onClick={onCancel}>
          Hủy
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={selectedLanguages.some((item) => !item.level)}
        >
          Lưu ngoại ngữ
        </Button>
      </div>
    </div>
  );
};

export default LanguageSkills;
