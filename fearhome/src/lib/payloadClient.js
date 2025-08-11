import * as axios from 'axios';

// Your Payload CMS URL on Render
const PAYLOAD_API_URL = process.env.VITE_PAYLOAD_URL || 'https://content.fearlessint.com';

// Create axios instance with base configuration
const payloadAPI = axios.create({
  baseURL: `${PAYLOAD_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token if needed
const setAuthToken = (token) => {
  if (token) {
    payloadAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete payloadAPI.defaults.headers.common['Authorization'];
  }
};

// API methods for your CMS collections
export const payloadClient = {
  // Get all posts/articles
  getPosts: async (limit = 10, page = 1) => {
    try {
      const response = await payloadAPI.get(`/posts?limit=${limit}&page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Get single post by slug
  getPostBySlug: async (slug) => {
    try {
      const response = await payloadAPI.get(`/posts?where[slug][equals]=${slug}`);
      return response.data.docs[0];
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // Get portfolio items
  getPortfolioItems: async () => {
    try {
      const response = await payloadAPI.get('/portfolio');
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  },

  // Get pages
  getPages: async () => {
    try {
      const response = await payloadAPI.get('/pages');
      return response.data;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  },

  // Add more methods as needed for your collections
};

export { setAuthToken };
export default payloadClient;
