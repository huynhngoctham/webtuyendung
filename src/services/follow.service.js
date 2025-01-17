import apiClient from './apiClient'; // Import cấu hình axios từ file của bạn

const FollowService = {
  /**
   * Thay đổi trạng thái theo dõi nhà tuyển dụng.
   * @param {number} employerId - ID của nhà tuyển dụng.
   * @returns {Promise<Object>} - Trả về thông báo thành công hoặc lỗi.
   */
  changeFollow(employerId) {
    return apiClient
      .put(`/candidate/changeFollow/${employerId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi thay đổi trạng thái theo dõi:', error.response?.data || error.message);
        throw error;
      });
  },

  changeFollowNews(newsId) {
    return apiClient
      .put(`/candidate/changeFollowNews/${newsId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi thay đổi trạng thái theo dõi tin tuyển dụng:', error.response?.data || error.message);
        throw error;
      });
  },


   /**
   * Lấy danh sách nhà tuyển dụng mà người dùng đang theo dõi.
  
   */
   getFollowList() {
    return apiClient
      .get('/candidate/getFollow')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách theo dõi nhà tuyển dụng:', error.response?.data || error.message);
        throw error;
      });
  },

  /**
   * Lấy danh sách tin tuyển dụng mà người dùng đang theo dõi.
  
   */
  getFollowNewsList() {
    return apiClient
      .get('/candidate/getFollowNews')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách tin tuyển dụng theo dõi:', error.response?.data || error.message);
        throw error;
      });
  },

  /**
   * Lấy danh sách nhà tuyển dụng sắp xếp theo số lượng được theo dõi.
   */
  getTopFollowedEmployers() {
    return apiClient
      .get('/get/topFollow')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách nhà tuyển dụng theo dõi nhiều nhất:', error.response?.data || error.message);
        throw error;
      });
  }
};

export default FollowService;
