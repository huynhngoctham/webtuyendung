const API_BASE_URL = "YOUR_API_BASE_URL"; // Replace with your API base URL

export const jobService = {
  getFeaturedJobs: async () => {
    const response = await fetch(`${API_BASE_URL}/jobs?featured=true`);
    return response.json();
  },

  getLatestJobs: async () => {
    const response = await fetch(`${API_BASE_URL}/jobs?sortBy=createdAt&order=desc`);
    return response.json();
},
// other job service methods here... e.g. getJobById
};