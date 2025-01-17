import apiClient from './apiClient';

const MatchProfileService = {
  /**
   * Fetch matching profiles for the employer
   * @returns {Promise} - API response with the list of matching profiles
   */
  getMatchingProfiles() {
    return apiClient
      .get('/employer/matchProfile')
      .then((response) => {
        if (response.data) {
          console.log('Matching profiles fetched successfully:', response.data);
        }
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching matching profiles:', error.response?.data || error.message);
        throw error;
      });
  },
};

export default MatchProfileService;
