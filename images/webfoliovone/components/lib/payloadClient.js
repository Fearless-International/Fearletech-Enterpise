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
  getPortfolioBySlug: async (slug) => {
  try {
      const response = await fetch(`${PAYLOAD_API_URL}/api/feaportfolio?where[slug][equals]=${slug}&limit=1`);
      const data = await response.json();
      return data.docs[0] || null;
  } catch (error) {
      console.error('Error fetching portfolio by slug:', error);
      throw error;
  }
},

getFeaturedPortfolio: async (limit = 4) => {
  try {
      const response = await fetch(`${PAYLOAD_API_URL}/api/feaportfolio?where[featured][equals]=true&limit=${limit}&sort=-createdAt`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching featured portfolio:', error);
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
  },
  
  getBlogPostBySlug: async (slug) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/blog?where[slug][equals]=${slug}&limit=1`);
        const data = await response.json();
        return data.docs[0] || null;
    } catch (error) {
        console.error('Error fetching blog post by slug:', error);
        throw error;
    }
  },

  // ADD THIS METHOD - it was missing from your client
  getBlogPostById: async (id) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/blog/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching blog post by id:', error);
        throw error;
    }
  },
  
  getLatestBlogPosts: async (limit = 3) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/blog?limit=${limit}&sort=-publishDate`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching latest blog posts:', error);
        throw error;
    }
  }
};