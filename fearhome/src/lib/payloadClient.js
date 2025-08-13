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
  },

  getContentCreationProjects: async () => {
    try {
      const response = await fetch(`${PAYLOAD_API_URL}/api/content-creation-projects?limit=10`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching content creation projects:', error);
      throw error;
    }
  },

  getCreativeBrandingProjects: async (page = 1) => {
    try {
      const response = await fetch(`${PAYLOAD_API_URL}/api/creative-branding-projects?limit=1&page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching creative branding projects:', error);
      throw error;
    }
  },

  getProjects: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/projects?limit=1&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
},

getVideoEditingAnimationProjects: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/video-editing-animation-projects?limit=1&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching video editing animation projects:', error);
        throw error;
    }
},

getSocialMediaManagementProjects: async () => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/social-media-management-projects?limit=10`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching social media management projects:', error);
        throw error;
    }
},
getLogoBrandingProjects: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/logo-branding-projects?limit=1&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching logo branding projects:', error);
        throw error;
    }
}
};
