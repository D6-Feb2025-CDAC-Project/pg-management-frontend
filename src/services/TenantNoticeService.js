import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ||'http://localhost:8080';

const TenantNoticeService = {
  getAllNotices: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tenant/notices`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notices:', error);
      return [];
    }
  },
};

export default TenantNoticeService;