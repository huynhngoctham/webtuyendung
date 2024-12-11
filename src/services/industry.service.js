import apiClient from './apiClient';

// Lấy danh sách tất cả các ngành nghề
export const getAllIndustries = async () => {
  try {
    const response = await apiClient.get('/admin/getIndustry'); // Đảm bảo đúng endpoint
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh sách ngành:', error);
    throw new Error(error.response?.data?.message || 'Không thể tải danh sách ngành');
  }
};
// Thêm mới ngành nghề
export const addIndustry = async (data) => {
  try {
    const response = await apiClient.post('/admin/addIndustry', data); // Endpoint API
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error('Lỗi khi thêm ngành mới:', error);
    throw new Error(error.response?.data?.message || 'Không thể thêm ngành mới');
  }
};

// Cập nhật thông tin ngành nghề
export const updateIndustry = async (id, data) => {
  try {
    const response = await apiClient.put(`/admin/updateIndustry/${id}`, data); // Endpoint API
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error('Lỗi khi cập nhật ngành:', error);
    throw new Error(error.response?.data?.message || 'Không thể cập nhật ngành');
  }
};

// Xóa ngành nghề
export const deleteIndustry = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/deleteIndustry/${id}`); // Endpoint API
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error('Lỗi khi xóa ngành:', error);
    throw new Error(error.response?.data?.message || 'Không thể xóa ngành');
  }
};

// Tìm kiếm ngành nghề
export const searchIndustry = async (query) => {
  try {
    const response = await apiClient.post('/admin/searchIndustry', null, {
      params: { industry_name: query }, // Truyền query parameters
    });
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error('Lỗi khi tìm kiếm ngành:', error);
    throw new Error(error.response?.data?.message || 'Không thể tìm kiếm ngành');
  }
};
