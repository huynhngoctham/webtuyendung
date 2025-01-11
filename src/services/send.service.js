import apiClient from './apiClient';

// Declare SendService and export it
const SendService = {
  // Gửi hồ sơ ứng viên
  sendProfile(profileData, jobId) {
    return apiClient
      .post(`/candidate/send/${jobId}`, profileData)  // Gửi yêu cầu POST đến API backend với jobId và profileData
      .then((response) => response.data)  // Xử lý dữ liệu trả về từ API
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            console.error('Lỗi: Chưa đăng nhập hoặc chưa có hồ sơ');
          } else {
            console.error('Lỗi khi gửi hồ sơ:', error.response.data);
          }
        } else {
          console.error('Lỗi không xác định khi gửi hồ sơ:', error);
        }
        throw error;  // Ném lỗi ra để có thể xử lý ở nơi gọi API
      });
  },
  // Lấy danh sách các tin tuyển dụng đã gửi
  getSendNews() {
    return apiClient
      .get(`/candidate/getSend`) // Gửi yêu cầu GET đến API backend
      .then((response) => response.data) // Xử lý dữ liệu trả về từ API
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            console.error('Lỗi: Chưa đăng nhập hoặc chưa có dữ liệu');
          } else {
            console.error('Lỗi khi lấy danh sách tin đã gửi:', error.response.data);
          }
        } else {
          console.error('Lỗi không xác định khi lấy danh sách tin đã gửi:', error);
        }
        throw error; // Ném lỗi ra để có thể xử lý ở nơi gọi API
      });
  },
 // Lấy danh sách hồ sơ ứng tuyển
 async getProfileList(newsid) {
    try {
      const response = await apiClient.get(`/employer/getProfile/${newsid}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return error.response.data;
      }
      throw error;
    }
  },
   // Lấy thông tin hồ sơ ứng tuyển chi tiết
  
  async getProfileDetail(sendid) {
    try {
      const response = await apiClient.get(`/employer/detailProfile/${sendid}`);
      return response.data; // Return the profile data
    } catch (error) {
      if (error.response?.status === 404) {
        console.error('Không tìm thấy hồ sơ');
        return error.response.data;
      } else {
        console.error('Lỗi khi lấy thông tin hồ sơ:', error.response?.data || error);
        throw error;
      }
    }
  },


  // Gọi API gửi mail để chấp nhận ứng viên
async acceptApplicant(sendid, interviewDate) {
  try {
    // Gửi yêu cầu POST với sendid và interviewDate
    const response = await apiClient.post(`/employer/accepted/${sendid}`, {
      interview_date: interviewDate, // Gửi ngày phỏng vấn cùng với yêu cầu
    });
    
    // Trả về dữ liệu phản hồi từ backend
    return response.data; 
  } catch (error) {
    throw error; // Nếu có lỗi, ném lỗi ra để xử lý
  }
},

  // Gọi API để từ chối ứng viên
  async rejectApplicant(sendid) {
    try {
      const response = await apiClient.post(`/employer/rejected/${sendid}`);
      return response.data; // Trả về phản hồi từ backend
    } catch (error) {
      throw error;
    }
  },
  
};




export default SendService;
