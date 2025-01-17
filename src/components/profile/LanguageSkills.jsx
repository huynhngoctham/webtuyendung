import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown, DropdownButton, ListGroup } from 'react-bootstrap';
import LanguageService from '../../services/language.service';
import LanguageProfileService from '../../services/language_profile.service';

const LanguageSkills = ({ profileId, onSave, onCancel }) => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const scoreOptions = [
    { value: 10, label: "10 điểm" },
    { value: 5, label: "5 điểm" },
    { value: 2, label: "2 điểm" },
    { value: 1, label: "1 điểm" }
  ];

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const allLanguages = await LanguageService.getAllLanguages();
        setLanguages(allLanguages);

        const userLanguages = await LanguageProfileService.getLanguageDetails(profileId);
        setSelectedLanguages(userLanguages);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách ngôn ngữ:', error);
      }
    };
    fetchLanguages();
  }, [profileId]);

  const handleSelectLanguage = (language) => {
    if (
      selectedLanguages.length < 10 &&
      !selectedLanguages.some((item) => item.language_id === language.id)
    ) {
      setSelectedLanguages([...selectedLanguages, { 
        language_id: language.id, 
        level: '', 
        score: null 
      }]);
    }
  };

  const handleRemoveLanguage = async (id) => {
    try {
      await LanguageProfileService.deleteLanguageDetails(id);
      setSelectedLanguages(selectedLanguages.filter((item) => item.id !== id));
      alert('Xóa ngôn ngữ thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa ngôn ngữ:', error);
      alert('Có lỗi xảy ra khi xóa ngôn ngữ.');
    }
  };

  const handleProficiencyChange = (languageId, proficiency) => {
    setSelectedLanguages(
      selectedLanguages.map((item) =>
        item.language_id === languageId ? { ...item, level: proficiency } : item
      )
    );
  };

  const handleScoreChange = (languageId, score) => {
    setSelectedLanguages(
      selectedLanguages.map((item) =>
        item.language_id === languageId ? { ...item, score: score } : item
      )
    );
  };

  const handleSave = async () => {
    const validLanguages = selectedLanguages.filter((item) => item.level && item.score !== null);

    if (validLanguages.length === 0) {
      alert('Vui lòng chọn mức độ thành thạo và điểm cho các ngôn ngữ.');
      return;
    }

    try {
      await Promise.all(
        validLanguages.map(async (language) => {
          const existingLanguages = await LanguageProfileService.getLanguageDetails(profileId);
          const existing = existingLanguages.find(
            (item) => item.language_id === language.language_id
          );

          const languageData = {
            profile_id: profileId,
            language_id: language.language_id,
            level: language.level,
            score: language.score
          };

          if (existing) {
            await LanguageProfileService.updateLanguageDetails(existing.id, languageData);
          } else {
            await LanguageProfileService.addLanguageDetails(languageData);
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

  const getLanguageName = (languageId) => {
    const language = languages.find((lang) => lang.id === languageId);
    return language ? language.language_name : '';
  };

  return (
    <div className="mb-4">
      <h5>Thông tin ngoại ngữ</h5>

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

      <ListGroup className="mt-3">
        {selectedLanguages.map((item) => (
          <ListGroup.Item key={item.id || item.language_id} className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center">
              <span>{getLanguageName(item.language_id)}</span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveLanguage(item.id)}
              >
                Xóa
              </Button>
            </div>

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

            <Form.Group className="mt-2">
              <Form.Label>Điểm đánh giá</Form.Label>
              <Form.Select
                value={item.score || ''}
                onChange={(e) => handleScoreChange(item.language_id, Number(e.target.value))}
              >
                <option value="">Chọn điểm</option>
                {scoreOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-2" onClick={onCancel}>
          Hủy
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={selectedLanguages.some((item) => !item.level || item.score === null)}
        >
          Lưu ngoại ngữ
        </Button>
      </div>
    </div>
  );
};

export default LanguageSkills;