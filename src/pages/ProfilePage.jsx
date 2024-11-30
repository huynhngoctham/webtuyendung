import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from '../components/layout/Sidebar';
import ProfileLayout from '../components/profile/ProfileLayout';

const ProfilePage = () => {
  const initialUserState = {
    email: '....@gmail.com',
    fullName: 'Tham Huynh',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    city: '',
    address: '',
    phone: '',
    avatar: null,
    avatarPreview: null,
    workExperiences: [],
    education: {
      schoolName: '',
      major: '',
      degree: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    },
    languageSkills: {
      language: '',
      proficiency: ''
    },
    itSkills: {
      software: ''   // Thêm thông tin phần mềm tin học
    }
  };

  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState({});

  // Cập nhật thông tin cá nhân
  const handlePersonalInfoSave = (updatedInfo) => {
    setUser((prevState) => ({ ...prevState, ...updatedInfo }));
  };

  const handlePersonalInfoCancel = () => {
    setUser(initialUserState); // Reset lại thông tin cá nhân
  };

  // Cập nhật thông tin chung
  const handleGeneralInfoSave = (updatedInfo) => {
    setUser((prevState) => ({ ...prevState, ...updatedInfo }));
  };

  const handleGeneralInfoCancel = () => {
    setUser(initialUserState); // Reset lại thông tin chung
  };

  // Cập nhật thông tin kinh nghiệm làm việc
  const handleWorkExperienceSave = (updatedExperiences) => {
    setUser((prevState) => ({ ...prevState, workExperiences: updatedExperiences }));
  };

  const handleWorkExperienceCancel = () => {
    setUser(initialUserState); // Reset lại kinh nghiệm làm việc
  };

  // Cập nhật thông tin học vấn
  const handleEducationSave = (updatedEducation) => {
    setUser((prevState) => ({ ...prevState, education: updatedEducation }));
  };

  const handleEducationCancel = () => {
    setUser(initialUserState); // Reset lại thông tin học vấn
  };

  // Cập nhật thông tin ngoại ngữ
  const handleLanguageSkillsSave = (updatedLanguage) => {
    setUser((prevState) => ({ ...prevState, languageSkills: updatedLanguage }));
  };

  const handleLanguageSkillsCancel = () => {
    setUser(initialUserState); // Reset lại thông tin ngoại ngữ
  };

  // Cập nhật thông tin tin học
  const handleITSkillsSave = (updatedSkill) => {
    setUser((prevState) => ({ ...prevState, itSkills: updatedSkill }));
  };

  const handleITSkillsCancel = () => {
    setUser(initialUserState); // Reset lại thông tin tin học
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={3} className="bg-light px-3">
          <Sidebar />
        </Col>
        <Col md={9}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h4>Tạo hồ sơ trực tuyến</h4>
            </Card.Header>
            <Card.Body>
              <ProfileLayout
                user={user}
                errors={errors}
                handlePersonalInfoSave={handlePersonalInfoSave}
                handlePersonalInfoCancel={handlePersonalInfoCancel}
                handleGeneralInfoSave={handleGeneralInfoSave}
                handleGeneralInfoCancel={handleGeneralInfoCancel}
                handleWorkExperienceSave={handleWorkExperienceSave}
                handleWorkExperienceCancel={handleWorkExperienceCancel}
                handleEducationSave={handleEducationSave}
                handleEducationCancel={handleEducationCancel}
                handleLanguageSkillsSave={handleLanguageSkillsSave}
                handleLanguageSkillsCancel={handleLanguageSkillsCancel}
                handleITSkillsSave={handleITSkillsSave}
                handleITSkillsCancel={handleITSkillsCancel}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
