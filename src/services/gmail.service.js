import apiClient from './apiClient';

const GmailService = {
  /**
   * Accept an application and send acceptance email
   * @param {string|number} sendId - The sending ID
   * @param {Object} data - The data object containing interview details
   * @param {string} data.interview_date - The interview date in YYYY-MM-DD HH:mm format
   * @returns {Promise} - API response
   */
  acceptStatus(sendId, data) {
    if (!data.interview_date) {
      return Promise.reject(new Error('Interview date is required'));
    }

    return apiClient
      .post(`/employer/accepted/${sendId}`, {
        interview_date: data.interview_date,
      })
      .then((response) => {
        if (response.data && response.data.message) {
          console.log('Success:', response.data.message);
        }
        return response.data;
      })
      .catch((error) => {
        console.error('Error accepting application:', error.response?.data || error.message);
        throw error;
      });
  },

  /**
   * Reject an application and send rejection email
   * @param {string|number} sendId - The sending ID
   * @returns {Promise} - API response
   */
  rejectStatus(sendId) {
    return apiClient
      .post(`/employer/rejected/${sendId}`)
      .then((response) => {
        if (response.data && response.data.message) {
          console.log('Success:', response.data.message);
        }
        return response.data;
      })
      .catch((error) => {
        console.error('Error rejecting application:', error.response?.data || error.message);
        throw error;
      });
  },

  /**
   * Helper method to format date for the API
   * @param {Date} date - Date object to format
   * @returns {string} - Formatted date string
   */
  formatDateForAPI(date) {
    const pad = (num) => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  },

// gửi mail cho nhà tuyển dụng
sendEmailToEmployer(data) {
    if (!data.email || !data.message) {
      return Promise.reject(new Error('Email and message are required'));
    }
  
    return apiClient
      .post('/candidate/sendEmail', {
        email: data.email,
        message: data.message,
      })
      .then((response) => {
        if (response.data && response.data.message) {
          console.log('Success:', response.data.message);
        }
        return response.data;
      })
      .catch((error) => {
        console.error('Error sending email:', error.response?.data || error.message);
        throw error;
      });
  },
  
};

export default GmailService;