import apiClient from './apiClient';

const RecruitmentService = {
  // API thêm tin tuyển dụng
  addRecruitmentNews(data) {
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === 'deadline' || key === 'posteddate') {
          const date = data[key] instanceof Date ? data[key] : new Date(data[key]);
          const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
          formData.append(key, formattedDate);
        } else if (key === 'workplacenews' || key === 'industry' || key === 'language' || key === 'information') {
          data[key].forEach((item, index) => {
            for (const itemKey in item) {
              formData.append(`${key}[${index}][${itemKey}]`, item[itemKey]);
            }
          });
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    return apiClient.post('/employer/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Error adding recruitment news:', error.response?.data || error);
        throw error;
      });
  },

  // // API thay đổi trạng thái khóa của nhà tuyển dụng
  // changeLock(data) {
  //   return apiClient.put('/employer/lock', data)
  //     .then(response => response.data)
  //     .catch(error => {
  //       console.error('Error changing lock status:', error.response?.data || error);
  //       throw error;
  //     });
  // },

  // API cập nhật tin tuyển dụng
  updateRecruitmentNews(id, data) {
    const formData = new FormData();
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Kiểm tra và định dạng các trường ngày tháng (deadline và posteddate)
        if (key === 'deadline' || key === 'posteddate') {
          if (data[key]) {
            const date = new Date(data[key]);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
            formData.append(key, formattedDate);
          } else {
            formData.append(key, ''); // Nếu không có giá trị, gửi chuỗi rỗng
          }
        }
        // Xử lý các mảng đối tượng như workplacenews, industry, language, information
        else if (key === 'workplacenews' || key === 'industry' || key === 'language' || key === 'information') {
          if (Array.isArray(data[key])) {
            data[key].forEach((item, index) => {
              for (const itemKey in item) {
                formData.append(`${key}[${index}][${itemKey}]`, item[itemKey]);
              }
            });
          }
        }
        // Các trường khác (không phải mảng hay ngày tháng)
        else {
          formData.append(key, data[key]);
        }
      }
    }
  
    return apiClient.put(`/employer/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating recruitment news:', error.response?.data || error);
      throw error;
    });
  },
  
  // API lấy tin tuyển dụng theo ID
  
  fetchRecruitmentList() {
    return apiClient
      .get('/employer/list') // Endpoint lấy danh sách tuyển dụng
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách tuyển dụng:', error.response?.data || error.message);
        throw error;
      });
  },
  
   getRecruitmentById(id) {
    return apiClient
      .get(`/recruitment/${id}`) // Sửa endpoint này nếu cần
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching recruitment by ID:', error.response?.data || error);
        throw error;
      });
  },
  
  changeLock(data) {
    return apiClient.put(`/employer/changeActive/${data.newsid}`, data)  // Gọi đúng API
      .then(response => response.data)
      .catch(error => {
        console.error('Error changing lock status:', error.response?.data || error);
        throw error;
      });
  },
  


}  

export default RecruitmentService;