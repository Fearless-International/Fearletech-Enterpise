// Simple fetch-based client instead of axios
const PAYLOAD_API_URL = process.env.VITE_PAYLOAD_URL || 'https://content.fearlessint.com';

export const payloadClient = {
  // Existing project methods
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
  },

  // Service methods
  getWebServices: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/web-services?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching web services:', error);
        throw error;
    }
  },

  getVideoServices: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/video-services?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching video services:', error);
        throw error;
    }
  },

  getCreativeBrandingServices: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/creative-branding-services?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching creative branding services:', error);
        throw error;
    }
  },

  getUIUXInterfaces: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/uiux-interfaces?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching UI/UX interfaces:', error);
        throw error;
    }
  },

  getMobileAppDevelopment: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/mobile-app-development?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching mobile app development services:', error);
        throw error;
    }
  },

  getSoftwareDevelopment: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/software-development?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching software development services:', error);
        throw error;
    }
  },

  getDatabaseCreationAndManagement: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/database-creation-and-management?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching database services:', error);
        throw error;
    }
  },

  getPhotographyGraphicDesigningContentCreation: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/photography-graphic-designing-content-creation?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching photography graphic designing content creation services:', error);
        throw error;
    }
  },

  getVideoEditingAndAnimation: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/video-editing-and-animation?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching video editing and animation services:', error);
        throw error;
    }
  },

  getCreativeBranding: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/creative-branding?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching creative branding services:', error);
        throw error;
    }
  },

  getSocialMediaManagement: async (page = 1) => {
    try {
        const response = await fetch(`${PAYLOAD_API_URL}/api/social-media-management?limit=1&page=${page}&where[isActive][equals]=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching social media management services:', error);
        throw error;
    }
  }
};