// Simple fetch-based client instead of axios
const PAYLOAD_API_URL = process.env.VITE_PAYLOAD_URL || 'https://content.fearlessint.com';

export const payloadClient = {
  getProjects: async () => {
    try {
      const response = await fetch(`${PAYLOAD_API_URL}/api/projects`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  getProjectBySlug: async (slug) => {
    try {
      const response = await fetch(`${PAYLOAD_API_URL}/api/projects?where[slug][equals]=${slug}`);
      const data = await response.json();
      return data.docs[0];
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }
};
