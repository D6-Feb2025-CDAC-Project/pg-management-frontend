import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TenantNoticeService = {
  getAllNotices: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/tenant/notices`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching notices:", error);
      return [];
    }
  },
};

export default TenantNoticeService;
