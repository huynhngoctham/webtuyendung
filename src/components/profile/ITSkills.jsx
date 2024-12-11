import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton, ListGroup, Row, Col, Button } from 'react-bootstrap';
import ITService from '../../services/it.service'; // Lấy danh sách chứng chỉ IT
import ITProfileService from '../../services/it_profile.service'; // Quản lý dữ liệu IT cho hồ sơ

const ITSkills = ({ profileId }) => {
  const [softwareList, setSoftwareList] = useState([]); // Danh sách chứng chỉ IT từ API
  const [selectedSkills, setSelectedSkills] = useState([]); // Chứng chỉ IT đã chọn

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách chứng chỉ IT từ API
        const allSoftware = await ITService.getAllIT();
        setSoftwareList(allSoftware);

        // Lấy chứng chỉ IT từ hồ sơ người dùng
        const userSkills = await ITProfileService.getITDetails(profileId);
        setSelectedSkills(userSkills); // API trả về danh sách chứa `id`, `it_id`
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
    fetchData();
  }, [profileId]);

  // Xử lý chọn chứng chỉ IT
  const handleSelectSoftware = async (software) => {
    // Nếu đã chọn chứng chỉ này hoặc vượt quá giới hạn, không thêm mới
    if (selectedSkills.some((item) => item.it_id === software.id)) {
      alert('Chứng chỉ này đã được thêm.');
      return;
    }
    if (selectedSkills.length >= 4) {
      alert('Bạn chỉ có thể chọn tối đa 4 chứng chỉ.');
      return;
    }

    try {
      // Gửi yêu cầu thêm chứng chỉ lên API
      const newSkill = await ITProfileService.addITDetails({
        profile_id: profileId,
        it_id: software.id,
      });

      // Cập nhật danh sách chứng chỉ đã chọn
      setSelectedSkills([...selectedSkills, { id: newSkill.id, it_id: software.id }]);
      alert('Thêm chứng chỉ thành công!');
    } catch (error) {
      console.error('Lỗi khi thêm chứng chỉ:', error);
      alert('Có lỗi xảy ra khi thêm chứng chỉ.');
    }
  };

  // Xử lý xóa chứng chỉ IT
  const handleRemoveSoftware = async (id) => {
    try {
      // Gửi yêu cầu xóa chứng chỉ lên API
      await ITProfileService.deleteITDetails(id);

      // Cập nhật danh sách chứng chỉ đã chọn
      setSelectedSkills(selectedSkills.filter((item) => item.id !== id));
      alert('Xóa chứng chỉ thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa chứng chỉ:', error.response || error);
      alert('Có lỗi xảy ra khi xóa chứng chỉ.');
    }
  };

  // Lấy tên chứng chỉ từ ID
  const getSoftwareName = (itId) => {
    const software = softwareList.find((item) => item.id === itId);
    return software ? software.name : '';
  };

  return (
    <div className="mb-4">
      <h5 className="mb-4">Thông tin tin học</h5>
      <Row className="mb-3">
        <Col md={8}>
          <div className="d-flex flex-column">
            <DropdownButton
              id="dropdown-software"
              title="Chọn chứng chỉ"
              variant="outline-primary"
              disabled={selectedSkills.length >= 4}
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

        <Col md={4}>
          <ListGroup>
            {selectedSkills.map((skill) => (
              <ListGroup.Item
                key={skill.id}
                className="d-flex justify-content-between align-items-center"
              >
                {getSoftwareName(skill.it_id)}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveSoftware(skill.id)}
                >
                  Xóa
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ITSkills;
