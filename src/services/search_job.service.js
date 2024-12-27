import apiClient from './apiClient'; // Import cấu hình axios từ file của bạn

const SearchJobService = {
  /**
 * Tìm kiếm công việc theo tiêu đề.
 * @param {string} title - Từ khóa tiêu đề để tìm kiếm.
 * @returns {Promise<Object[]>} - Kết quả danh sách công việc từ API.
 */
searchJobs(title) {
  return apiClient
    .post('/search', { title }) // Gửi yêu cầu POST với tiêu đề
    .then((response) => response.data.data) // Trả về danh sách công việc từ API (dựa trên định dạng JSON trả về)
    .catch((error) => {
      console.error('Lỗi khi tìm kiếm công việc:', error);
      throw error; // Quăng lỗi để xử lý ở phía gọi hàm
    });
},


  /**
   * Lọc các công việc dựa trên các tiêu chí.
   * @param {Object} filters - Bộ lọc, bao gồm industry_id, workingmodel, salary_min, salary_max, deadline, workplace_id, rank, experience.
   * @returns {Promise<Object[]>} - Danh sách công việc phù hợp.
   */
  filterJobs(filters) {
    return apiClient
      .get('/filter-jobs', { params: filters }) // Gửi yêu cầu GET với tham số lọc
      .then((response) => response.data) // Trả về danh sách công việc đã lọc từ API
      .catch((error) => {
        console.error('Lỗi khi lọc công việc:', error);
        throw error; // Quăng lỗi để xử lý ở phía gọi hàm
      });
  },
};

export default SearchJobService;
