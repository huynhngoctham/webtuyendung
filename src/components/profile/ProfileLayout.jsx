import React from 'react';
import PersonalInfo from './PersonalInfo';
import GeneralInfo from './GeneralInfo';
import WorkExperience from './WorkExperience';
import Education from './Education';
import LanguageSkills from './LanguageSkills';  // Import LanguageSkills
import ITSkills from './ITSkills';  // Import ITSkills

const ProfileLayout = ({
  user,
  errors,
  handlePersonalInfoSave,
  handlePersonalInfoCancel,
  handleGeneralInfoSave,
  handleGeneralInfoCancel,
  handleWorkExperienceSave,
  handleWorkExperienceCancel,
  handleEducationSave,
  handleEducationCancel,
  handleLanguageSkillsSave,
  handleLanguageSkillsCancel,
  handleITSkillsSave,  // Thêm handle cho form tin học
  handleITSkillsCancel,  // Thêm handle cho form tin học
}) => {
  return (
    <div>
      {/* Personal Info Section */}
      <PersonalInfo
        user={user}
        errors={errors}
        onSave={handlePersonalInfoSave}
        onCancel={handlePersonalInfoCancel}
      />
      <hr />
      
      {/* General Info Section */}
      <GeneralInfo
        user={user}
        errors={errors}
        onSave={handleGeneralInfoSave}
        onCancel={handleGeneralInfoCancel}
      />
      <hr />
      
      {/* Work Experience Section */}
      <WorkExperience
        experiences={user.workExperiences}
        onSave={handleWorkExperienceSave}
        onCancel={handleWorkExperienceCancel}
      />
      <hr />
      
      {/* Education Section */}
      <Education
        education={user.education}
        onSave={handleEducationSave}
        onCancel={handleEducationCancel}
      />
      <hr />
      
      {/* Language Skills Section */}
      <LanguageSkills
        languageSkills={user.languageSkills}   // Dữ liệu ngoại ngữ từ user
        onSave={handleLanguageSkillsSave}      // Hàm lưu thông tin ngoại ngữ
        onCancel={handleLanguageSkillsCancel}  // Hàm hủy thông tin ngoại ngữ
      />
      <hr />
      
      {/* IT Skills Section */}
      <ITSkills
        itSkills={user.itSkills}   // Dữ liệu tin học từ user
        onSave={handleITSkillsSave}      // Hàm lưu thông tin tin học
        onCancel={handleITSkillsCancel}  // Hàm hủy thông tin tin học
      />
    </div>
  );
};

export default ProfileLayout;
