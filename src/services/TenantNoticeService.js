import axios from 'axios';

const BASE_URL = 'http://localhost:8080/notices';

const TenantNoticeService = {
  getAllNotices: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching notices:', error);
      return [];
    }
  },
};

export default TenantNoticeService;