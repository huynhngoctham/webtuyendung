import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner, Button, Card } from 'react-bootstrap';
import ProfileService from '../../services/profile.service';
import PersonalInfo from './PersonalInfo';
import WorkExperience from './WorkExperience';
import Education from './Education';
import LanguageSkills from './LanguageSkills';
import ITSkills from './ITSkills';
import IndustryField from './IndustryField';
import Reference from './Reference';

const ProfileLayout = ({ onSave }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile(); // Gọi API khi component được render lần đầu
  }, []);

  // Lấy thông tin hồ sơ từ API
  const fetchProfile = async () => {
    try {
      const profileData = await ProfileService.getProfile();
      setProfile(profileData);  // Cập nhật profile từ API
      setLoading(false);  // Tắt trạng thái loading
    } catch (err) {
      // setError('Không thể tải thông tin hồ sơ. Vui lòng thử lại sau.');
      setLoading(false);  // Tắt trạng thái loading
    }
  };

  // Hàm lưu thông tin hồ sơ
  const handleSaveProfile = async (profileData) => {
    try {
      // Lưu thông tin hồ sơ (có thể là update hoặc tạo mới)
      if (profile) {
        // Cập nhật hồ sơ nếu đã có profile
        await ProfileService.updateProfile(profileData);
      } else {
        // Tạo mới hồ sơ nếu chưa có profile
        await ProfileService.createProfile(profileData);
      }

      // Gọi lại fetchProfile để reload lại hồ sơ sau khi lưu thành công
      await fetchProfile();

      setIsEditing(false);  // Tắt chế độ chỉnh sửa
      onSave();  // Gọi hàm onSave để thực hiện lấy dữ liệu mới nhất từ API

      setError(null); // Đảm bảo không có lỗi hiển thị khi lưu thành công
    } catch (err) {
      // Xử lý lỗi khi lưu không thành công
      console.error("Error while saving profile:", err);
      // setError('Lỗi khi lưu hồ sơ. Vui lòng thử lại sau.');  // Hiển thị thông báo lỗi

      // Gọi lại fetchProfile để reload lại dữ liệu khi lưu không thành công
      await fetchProfile();
    }
  };

  // Hàm xóa hồ sơ
  const handleDeleteProfile = async () => {
    try {
      await ProfileService.deleteProfile();
      setProfile(null);  // Xóa hồ sơ trong state
    } catch (err) {
      setError('Không thể xóa hồ sơ. Vui lòng thử lại sau.');
    }
  };

  // Hàm thay đổi trạng thái khóa hồ sơ
  const handleLockToggle = async () => {
    try {
      // Gọi API để thay đổi trạng thái khóa hồ sơ trên server
      await ProfileService.toggleProfileLock();

      // Cập nhật trạng thái khóa hồ sơ trong state mà không cần gọi lại fetchProfile
      setProfile((prevProfile) => ({
        ...prevProfile,
        isLocked: !prevProfile.isLocked, // Đảo trạng thái khóa hồ sơ
      }));
    } catch (err) {
      setError('Không thể thay đổi trạng thái hồ sơ. Vui lòng thử lại sau.');
    }
  };

  // Nếu đang tải dữ liệu từ API
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Đang tải thông tin hồ sơ...</p>
      </Container>
    );
  }

  return (
    <Container>
      {/* Không hiển thị lỗi mặc định, chỉ hiển thị nếu có lỗi thực sự */}
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <PersonalInfo 
        profile={profile} 
        onSave={handleSaveProfile}  // Truyền handleSaveProfile vào để lưu hồ sơ
        onEdit={(editing) => setIsEditing(editing)}  // Điều chỉnh chế độ chỉnh sửa
        onDelete={handleDeleteProfile}  // Xóa hồ sơ
        onLockToggle={handleLockToggle}  // Thay đổi trạng thái khóa hồ sơ
        isEditing={isEditing} 
      />

      {profile && (
        <>
          <Card.Body>
            <Card.Text>  
              <hr /> {/* Đường gạch ngang giữa các phần */}
            </Card.Text>
          </Card.Body>
          <IndustryField 
            industryField={profile.academy || []} 
          />
          <Card.Body>
            <Card.Text>
              <hr /> {/* Đường gạch ngang giữa các phần */}
            </Card.Text>
          </Card.Body>
          <WorkExperience 
            currentExperience={profile.workExperience || []} 
            handleCancel={() => setIsEditing(false)}  // Hủy chế độ chỉnh sửa
            handleSave={handleSaveProfile}  // Lưu kinh nghiệm làm việc
            profile_id={profile.id}  // Truyền profile_id để lưu dữ liệu
          />
          <Card.Body>
            <Card.Text>
              <hr /> {/* Đường gạch ngang giữa các phần */}
            </Card.Text>
          </Card.Body>
          <Education 
            education={profile.academy || []}  // Truyền thông tin học vấn
          />
          <Card.Body>
            <Card.Text>
              <hr /> {/* Đường gạch ngang giữa các phần */}
            </Card.Text>
          </Card.Body>
          <LanguageSkills 
            languageSkills={profile.languageDetails || []}  // Truyền kỹ năng ngôn ngữ
          />
          <Card.Body>
            <Card.Text>
              <hr /> {/* Đường gạch ngang giữa các phần */}
            </Card.Text>
          </Card.Body>
          <ITSkills 
            itSkills={profile.information_Details || []}  // Truyền kỹ năng IT
          />
          <Card.Body>
            <Card.Text>
              <hr /> {/* Đường gạch ngang giữa các phần */}
            </Card.Text>
          </Card.Body>
          <Reference 
            reference={profile.reference_information || []}  // Truyền thông tin người tham chiếu
          />
        </>
      )}
    </Container>
  );
};

export default ProfileLayout;