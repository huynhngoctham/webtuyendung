import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton, ListGroup, Row, Col, Button, Form } from 'react-bootstrap';
import ITService from '../../services/it.service';
import ITProfileService from '../../services/it_profile.service';

const ITSkills = ({ profileId, onSave, onCancel }) => {
  const [softwareList, setSoftwareList] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [tempSkills, setTempSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const scoreOptions = [
    { value: 10, label: "10 điểm" },
    { value: 5, label: "5 điểm" },
    { value: 2, label: "2 điểm" },
    { value: 1, label: "1 điểm" }
  ];

  const loadUserSkills = async () => {
    try {
      const userSkills = await ITProfileService.getITDetails(profileId);
      const formattedSkills = userSkills.map(skill => ({
        ...skill,
        isTemp: false
      }));
      setSelectedSkills(formattedSkills);
      setTempSkills(formattedSkills);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin kỹ năng:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSoftware = await ITService.getAllIT();
        setSoftwareList(allSoftware);
        await loadUserSkills();
        setIsLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [profileId]);

  const handleSelectSoftware = (software) => {
    if (tempSkills.some((item) => item.it_id === software.id)) {
      alert('Chứng chỉ này đã được thêm.');
      return;
    }
    if (tempSkills.length >= 4) {
      alert('Bạn chỉ có thể chọn tối đa 4 chứng chỉ.');
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const newSkill = {
      id: tempId,
      it_id: software.id,
      score: null,
      isTemp: true
    };

    setTempSkills([...tempSkills, newSkill]);
  };

  const handleRemoveSoftware = async (skill) => {
    if (skill.isTemp) {
      setTempSkills(tempSkills.filter(item => item.id !== skill.id));
      return;
    }

    try {
      await ITProfileService.deleteITDetails(skill.id);
      setTempSkills(tempSkills.filter(item => item.id !== skill.id));
      setSelectedSkills(selectedSkills.filter(item => item.id !== skill.id));
      alert('Xóa chứng chỉ thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa chứng chỉ:', error);
      alert('Có lỗi xảy ra khi xóa chứng chỉ.');
    }
  };

  const handleScoreChange = (skillId, score) => {
    setTempSkills(
      tempSkills.map((item) =>
        item.id === skillId ? { ...item, score: score } : item
      )
    );
  };

  const getSoftwareName = (itId) => {
    const software = softwareList.find((item) => item.id === itId);
    return software ? software.name : '';
  };

  const handleSave = async () => {
    if (tempSkills.some(skill => skill.score === null)) {
      alert('Vui lòng chọn điểm cho tất cả các chứng chỉ.');
      return;
    }

    try {
      // Handle new skills
      const savePromises = tempSkills
        .filter(skill => skill.isTemp)
        .map(skill => ITProfileService.addITDetails({
          profile_id: profileId,
          it_id: skill.it_id,
          score: skill.score
        }));

      // Handle existing skills updates
      const updatePromises = tempSkills
        .filter(skill => !skill.isTemp)
        .map(skill => ITProfileService.updateITDetails(skill.id, {
          profile_id: profileId,
          it_id: skill.it_id,
          score: skill.score
        }));

      await Promise.all([...savePromises, ...updatePromises]);
      
      // Reload the skills from the server to get the updated data
      await loadUserSkills();
      
      alert('Lưu thông tin tin học thành công!');
      if (onSave) {
        onSave(selectedSkills);
      }
    } catch (error) {
      console.error('Lỗi khi lưu thông tin:', error);
      alert('Có lỗi xảy ra khi lưu thông tin tin học.');
    }
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="mb-4">
      <h5 className="mb-4">Thông tin tin học</h5>
      <Row className="mb-3">
        <Col md={12}>
          <div className="d-flex flex-column">
            <DropdownButton
              id="dropdown-software"
              title="Chọn chứng chỉ"
              variant="outline-primary"
              disabled={tempSkills.length >= 4}
              style={{ width: '100%' }}
            >
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {softwareList.map((software) => (
                  <Dropdown.Item
                    key={software.id}
                    onClick={() => handleSelectSoftware(software)}
                  >
                    {software.name}
                  </Dropdown.Item>
                ))}
              </div>
            </DropdownButton>
          </div>
        </Col>
      </Row>

      <ListGroup className="mt-3">
        {tempSkills.map((skill) => (
          <ListGroup.Item
            key={skill.id}
            className="d-flex flex-column"
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>{getSoftwareName(skill.it_id)}</span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveSoftware(skill)}
              >
                Xóa
              </Button>
            </div>

            <Form.Group className="mt-2">
              <Form.Label>Điểm đánh giá</Form.Label>
              <Form.Select
                value={skill.score || ''}
                onChange={(e) => handleScoreChange(skill.id, Number(e.target.value))}
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
          disabled={tempSkills.length === 0 || tempSkills.some(item => item.score === null)}
        >
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
};

export default ITSkills;