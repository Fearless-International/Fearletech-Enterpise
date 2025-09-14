// Simple fetch-based client instead of axios
const PAYLOAD_API_URL = process.env.VITE_PAYLOAD_URL || 'https://fearletech-enterpise.onrender.com';

export const payloadClient = {
  // Portfolio methods
  getPortfolioItems: async (page = 1, limit = 5) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/portfolio?limit=${limit}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        throw error;
    }
  },

  // Blog methods
  getBlogPosts: async (page = 1, limit = 3) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/blog?limit=${limit}&page=${page}&sort=-publishDate`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
    }
  }
};