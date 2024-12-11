import apiClient from './apiClient'; // Import axios client from config

const handleError = (error) => {
  const errorMessage = error.response?.data?.message || 'An error occurred while connecting to the server.';
  const status = error.response?.status || 500;

  // Log error with detailed information
  console.error(`API Error [${status}]:`, error.response?.data || error.message);

  // Throw error with a specific message
  throw new Error(errorMessage);
};

const ReferenceProfileService = {
  // Get all reference information for the candidate
  getReferenceInfo() {
    return apiClient
      .get('/candidate/getReference')
      .then((response) => response.data)
      .catch(handleError); // Handle error
  },

  // Add new reference information
  addReferenceInfo(data) {
    return apiClient
      .post('/candidate/addReference', data)
      .then((response) => response.data)
      .catch(handleError); // Handle error
  },

  // Update reference information
  updateReferenceInfo(id, data) {
    return apiClient
      .put(`/candidate/updateReference/${id}`, data)
      .then((response) => response.data)
      .catch(handleError); // Handle error
  },

  // Delete reference information
  deleteReferenceInfo(id) {
    return apiClient
      .delete(`/candidate/deleteReference/${id}`)
      .then((response) => response.data)
      .catch(handleError); // Handle error
  },
};

export default ReferenceProfileService;
