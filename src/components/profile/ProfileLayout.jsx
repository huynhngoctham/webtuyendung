import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import PersonalInfo from './PersonalInfo';
import GeneralInfo from './GeneralInfo';
import WorkExperience from './WorkExperience';

const ProfileLayout = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    avatarPreview: '/default-avatar.png',
    birthDate: '',
    gender: '',
    city: '',
    address: '',
    maritalStatus: '',
  });
  const [personalInfoErrors, setPersonalInfoErrors] = useState({});
  const [personalInfoSuccessMessage, setPersonalInfoSuccessMessage] = useState('');
  const [isPersonalInfoSaving, setIsPersonalInfoSaving] = useState(false);

  const [generalInfo, setGeneralInfo] = useState({
    desiredPosition: '',
    profession: '',
    desiredLevel: '',
    currentLevel: '',
    education: '',
    desiredSalary: '',
    workLocation: '',
    yearsOfExperience: '',
    workType: '',
    careerGoals: '',
    skills: '',
    experiences: [],
  });
  const [generalInfoErrors, setGeneralInfoErrors] = useState({});
  const [generalInfoSuccessMessage, setGeneralInfoSuccessMessage] = useState('');
  const [isGeneralInfoSaving, setIsGeneralInfoSaving] = useState(false);

  // Hàm xử lý thay đổi thông tin cá nhân
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setPersonalInfoErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Hàm xử lý thay đổi tệp (ảnh đại diện)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalInfo(prevState => ({
          ...prevState,
          avatarPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Hàm hủy bỏ thay đổi thông tin cá nhân
  const handlePersonalInfoCancel = () => {
    setPersonalInfo({
      fullName: '',
      email: '',
      avatarPreview: '/default-avatar.png',
      birthDate: '',
      gender: '',
      city: '',
      address: '',
      maritalStatus: '',
    });
    setPersonalInfoErrors({});
    setPersonalInfoSuccessMessage('');
  };

  // Hàm lưu thông tin cá nhân
  const handlePersonalInfoSave = async (e) => {
    e.preventDefault();
    if (isPersonalInfoSaving) return;

    setIsPersonalInfoSaving(true);
    let newErrors = {};

    if (!personalInfo.fullName?.trim()) newErrors.fullName = 'Họ và tên không được bỏ trống.';
    if (!personalInfo.birthDate?.trim()) newErrors.birthDate = 'Ngày sinh không được bỏ trống.';
    if (!personalInfo.gender?.trim()) newErrors.gender = 'Giới tính không được bỏ trống.';
    if (!personalInfo.city?.trim()) newErrors.city = 'Tỉnh/Thành phố không được bỏ trống.';
    if (!personalInfo.address?.trim()) newErrors.address = 'Địa chỉ không được bỏ trống.';
    if (!personalInfo.maritalStatus?.trim()) newErrors.maritalStatus = 'Tình trạng hôn nhân không được bỏ trống.';

    if (Object.keys(newErrors).length > 0) {
      setPersonalInfoErrors(newErrors);
      setIsPersonalInfoSaving(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPersonalInfoSuccessMessage('Thông tin cá nhân đã được lưu thành công!');
      setPersonalInfoErrors({});
      setTimeout(() => setPersonalInfoSuccessMessage(''), 3000);
    } catch (error) {
      setPersonalInfoErrors({ submit: 'Có lỗi xảy ra khi lưu thông tin cá nhân.' });
    } finally {
      setIsPersonalInfoSaving(false);
    }
  };

  // Hàm xử lý thay đổi thông tin chung
  const handleGeneralInfoChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setGeneralInfoErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Hàm hủy bỏ thông tin chung
  const handleGeneralInfoCancel = () => {
    setGeneralInfo({
      desiredPosition: '',
      profession: '',
      desiredLevel: '',
      currentLevel: '',
      education: '',
      desiredSalary: '',
      workLocation: '',
      yearsOfExperience: '',
      workType: '',
      careerGoals: '',
      skills: '',
      experiences: [],
    });
    setGeneralInfoErrors({});
    setGeneralInfoSuccessMessage('');
  };

  // Hàm lưu thông tin chung
  const handleGeneralInfoSave = async (e) => {
    e.preventDefault();
    if (isGeneralInfoSaving) return;

    setIsGeneralInfoSaving(true);
    let newErrors = {};

    if (!generalInfo.desiredPosition?.trim()) newErrors.desiredPosition = 'Vị trí mong muốn không được bỏ trống.';
    if (!generalInfo.profession?.trim()) newErrors.profession = 'Nghề nghiệp không được bỏ trống.';
    if (!generalInfo.desiredLevel?.trim()) newErrors.desiredLevel = 'Mức độ mong muốn không được bỏ trống.';
    if (!generalInfo.currentLevel?.trim()) newErrors.currentLevel = 'Mức độ hiện tại không được bỏ trống.';
    if (!generalInfo.education?.trim()) newErrors.education = 'Trình độ học vấn không được bỏ trống.';
    if (!generalInfo.desiredSalary?.trim()) newErrors.desiredSalary = 'Mức lương mong muốn không được bỏ trống.';
    if (!generalInfo.workLocation?.trim()) newErrors.workLocation = 'Địa điểm làm việc không được bỏ trống.';
    if (!generalInfo.yearsOfExperience?.trim()) newErrors.yearsOfExperience = 'Số năm kinh nghiệm không được bỏ trống.';
    if (!generalInfo.workType?.trim()) newErrors.workType = 'Loại hình công việc không được bỏ trống.';
    if (!generalInfo.careerGoals?.trim()) newErrors.careerGoals = 'Mục tiêu nghề nghiệp không được bỏ trống.';
    if (!generalInfo.skills?.trim()) newErrors.skills = 'Kỹ năng không được bỏ trống.';

    if (Object.keys(newErrors).length > 0) {
      setGeneralInfoErrors(newErrors);
      setIsGeneralInfoSaving(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGeneralInfoSuccessMessage('Thông tin chung đã được lưu thành công!');
      setGeneralInfoErrors({});
      setTimeout(() => setGeneralInfoSuccessMessage(''), 3000);
    } catch (error) {
      setGeneralInfoErrors({ submit: 'Có lỗi xảy ra khi lưu thông tin chung.' });
    } finally {
      setIsGeneralInfoSaving(false);
    }
  };

  return (
    <Form>
      <div className="mb-4">
        {personalInfoErrors.submit && (
          <Alert variant="danger" className="mb-3">
            {personalInfoErrors.submit}
          </Alert>
        )}
        {personalInfoSuccessMessage && (
          <Alert variant="success" className="mb-3">
            {personalInfoSuccessMessage}
          </Alert>
        )}
        <PersonalInfo
          user={personalInfo}
          errors={personalInfoErrors}
          handleChange={handlePersonalInfoChange}
          handleFileChange={handleFileChange}
          handleCancel={handlePersonalInfoCancel}
          handleSubmit={handlePersonalInfoSave}
          isLoading={isPersonalInfoSaving}
        />
      </div>

      <hr className="my-4" style={{ borderColor: '#dee2e6' }} />

      <div className="mb-4">
        {generalInfoErrors.submit && (
          <Alert variant="danger" className="mb-3">
            {generalInfoErrors.submit}
          </Alert>
        )}
        {generalInfoSuccessMessage && (
          <Alert variant="success" className="mb-3">
            {generalInfoSuccessMessage}
          </Alert>
        )}
        <GeneralInfo
          user={generalInfo}
          errors={generalInfoErrors}
          handleChange={handleGeneralInfoChange}
          handleCancel={handleGeneralInfoCancel}
          isLoading={isGeneralInfoSaving}
        />
      </div>

      <hr className="my-4" style={{ borderColor: '#dee2e6' }} />

      <WorkExperience
        experiences={generalInfo.experiences}
        handleChange={() => {}}
        handleCancel={() => {}}
        handleSave={() => {}}
      />
    </Form>
  );
};

export default ProfileLayout;
