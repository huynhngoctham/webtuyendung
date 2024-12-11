import apiClient from './apiClient';

// Declare ProfileService and export it
const ProfileService = {
  // Lấy hồ sơ của ứng viên
  getProfile() {
    return apiClient
      .post('/candidate/profile/get')  // Chuyển từ GET thành POST
      .then((response) => response.data)
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          return null;  // Hồ sơ không tồn tại
        }
        console.error('Lỗi khi lấy hồ sơ:', error);
        throw error;
      });
  },

  // Tạo hồ sơ mới cho ứng viên
  createProfile(profileData) {
    const formData = profileData instanceof FormData 
      ? profileData 
      : this._convertToFormData(profileData);

    return apiClient.post('/candidate/profile/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Cập nhật hồ sơ ứng viên
updateProfile(profileData) {
    const formData = profileData instanceof FormData 
      ? profileData 
      : this._convertToFormData(profileData);
  
    return apiClient.post('/candidate/profile/update_method=PUT', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  // Chuyển đổi đối tượng sang FormData
_convertToFormData(data) {
    const formData = new FormData();
  
    Object.keys(data).forEach(key => {
      if (key === 'day_ofbirth') {
        const dateValue = data[key] instanceof Date
          ? data[key]
          : new Date(data[key]);
  
        const year = dateValue.getFullYear();
        const month = String(dateValue.getMonth() + 1).padStart(2, '0');
        const day = String(dateValue.getDate()).padStart(2, '0');
  
        formData.append(key, `${year}-${month}-${day}`);
      } else if (key === 'image' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
  
    return formData;
  },
  

  // Đổi trạng thái khóa hồ sơ
  toggleProfileLock() {
    return apiClient.put('/candidate/profile/lock');
  },

  // Xóa hồ sơ
  deleteProfile() {
    return apiClient.delete('/candidate/profile');
  },
};

export default ProfileService;  // Only export once at the end
