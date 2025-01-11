import apiClient from './apiClient'; // Import cấu hình axios từ file của bạn

const JobService = {
  // Lấy tất cả các tin tuyển dụng còn hạn và employer không bị khóa
  // getActiveRecruitments() {
  //   return apiClient
  //     .get('/active-recruitments') // Gọi API showActiveRecruitments
  //     .then((response) => response.data) // Trả về dữ liệu
  //     .catch((error) => {
  //       console.error('Lỗi khi lấy danh sách tin tuyển dụng:', error);
  //       throw error; // Quăng lỗi để hàm gọi xử lý
  //     });
  // },

  
  
  // API lấy tin tuyển dụng theo hồ sơ ứng viên
  getMatchingJobs() {
    return apiClient.get('/getNews')
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching matching jobs:', error.response?.data || error);
        throw error;
      });
  },
};

export default JobService;
