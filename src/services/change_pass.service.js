import apiClient from './apiClient';

// Cập nhật thông tin tài khoản employer
export const updateEmployerAccount = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      // Log FormData content before sending
      console.log('Sending FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      const response = await apiClient.post('/employer/updateacc_method=PUT', formData, config);
      return response.data;
    } catch (error) {
      console.error('Update error:', error);
      throw error.response?.data?.message || 'Lỗi cập nhật tài khoản';
    }
  };
  
  

// Lấy thông tin tài khoản employer
export const getEmployerAccount = async () => {
  try {
    const response = await apiClient.post('/employer/getacc'); // Sử dụng POST cho cả hai
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Lỗi lấy thông tin tài khoản';
  }
};
// Cập nhật thông tin tài khoản candidate
export const updateCandidateAccount = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      // Log FormData content before sending
      console.log('Sending FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      const response = await apiClient.post('/candidate/updateacc_method=PUT', formData, config);
      return response.data;
    } catch (error) {
      console.error('Update error:', error);
      throw error.response?.data?.message || 'Lỗi cập nhật tài khoản';
    }
  };
  
  // Lấy thông tin tài khoản candidate
  export const getCandidateAccount = async () => {
    try {
      const response = await apiClient.post('/candidate/getacc'); // Sử dụng POST cho cả hai
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Lỗi lấy thông tin tài khoản';
    }
  };
  // Cập nhật thông tin tài khoản admin
  export const updateAdminAccount = async (data) => {
    try {
      const response = await apiClient.put('/admin/updateacc', data, {
        headers: {
          'Content-Type': 'application/json', // Sử dụng JSON thay vì multipart/form-data
        },
      });
      return response.data;
    } catch (error) {
      console.error('Update error:', error);
      throw error.response?.data?.message || 'Lỗi cập nhật tài khoản';
    }
  };
  // Lấy thông tin tài khoản admin
  export const getAdminAccount = async () => {
    try {
      const response = await apiClient.post('/admin/getacc'); // Sử dụng POST để lấy thông tin tài khoản admin
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Lỗi lấy thông tin tài khoản';
    }
  };
