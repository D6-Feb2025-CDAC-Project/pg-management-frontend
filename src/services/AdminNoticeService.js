import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const NOTICES_ENDPOINT = `${API_BASE_URL}/admin/notices`;

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth headers if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization header if token exists
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("authToken");
      // Redirect to login or handle as needed
    }
    return Promise.reject(error);
  }
);

class AdminNoticeService {
  /**
   * Get all active notices
   * @returns {Promise<Array>} Array of notice objects
   */
  async getAllNotices() {
    try {
      const response = await apiClient.get(NOTICES_ENDPOINT);
      return response.data || [];
    } catch (error) {
      if (error.response?.status === 204) {
        // No content - empty list
        return [];
      }
      console.error("Error fetching notices:", error);
      throw new Error("Failed to fetch notices");
    }
  }

  /**
   * Add a new notice
   * @param {Object} noticeData - Notice data object
   * @param {string} noticeData.title - Notice title
   * @param {string} noticeData.message - Notice message
   * @param {string} noticeData.from - Notice source (ADMIN/OWNER/HOUSEKEEPING)
   * @param {string} noticeData.priorityLevel - Priority level (LOW/MEDIUM/HIGH/URGENT)
   * @returns {Promise<Object>} API response object
   */
  async addNewNotice(noticeData) {
    try {
      const payload = {
        title: noticeData.title,
        message: noticeData.message,
        from: this.mapFromValue(noticeData.from),
        priorityLevel: this.mapPriorityLevel(noticeData.priorityLevel),
      };

      const response = await apiClient.post(NOTICES_ENDPOINT, payload);
      return response.data;
    } catch (error) {
      console.error("Error adding notice:", error);
      if (error.response?.status === 400) {
        throw new Error("Invalid notice data provided");
      }
      throw new Error("Failed to add notice");
    }
  }

  /**
   * Update notice details
   * @param {number} noticeId - Notice ID
   * @param {Object} noticeData - Updated notice data
   * @returns {Promise<Object>} API response object
   */
  async updateNoticeDetails(noticeId, noticeData) {
    try {
      const payload = {
        title: noticeData.title,
        message: noticeData.message,
        from: this.mapFromValue(noticeData.from),
        priorityLevel: this.mapPriorityLevel(noticeData.priorityLevel),
      };

      const response = await apiClient.put(
        `${NOTICES_ENDPOINT}/${noticeId}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error updating notice:", error);
      if (error.response?.status === 404) {
        throw new Error("Notice not found");
      }
      throw new Error("Failed to update notice");
    }
  }

  /**
   * Soft delete a notice
   * @param {number} noticeId - Notice ID
   * @returns {Promise<Object>} API response object
   */
  async deleteNotice(noticeId) {
    try {
      const response = await apiClient.delete(
        `${NOTICES_ENDPOINT}/${noticeId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting notice:", error);
      if (error.response?.status === 404) {
        throw new Error("Notice not found");
      }
      throw new Error("Failed to delete notice");
    }
  }

  /**
   * Map frontend 'from' values to backend enum values
   * @param {string} frontendValue - Frontend from value
   * @returns {string} Backend enum value
   */
  mapFromValue(frontendValue) {
    const mapping = {
      "PG Admin": "ADMIN",
      "PG Owner": "OWNER",
      "Housekeeping Staff": "HOUSEKEEPING",
      ADMIN: "ADMIN",
      OWNER: "OWNER",
      HOUSEKEEPING: "HOUSEKEEPING",
    };
    return mapping[frontendValue] || "ADMIN";
  }

  /**
   * Map frontend priority values to backend enum values
   * @param {string} frontendValue - Frontend priority value
   * @returns {string} Backend enum value
   */
  mapPriorityLevel(frontendValue) {
    const mapping = {
      urgent: "URGENT",
      important: "IMPORTANT",
      general: "GENERAL",
      HIGH: "HIGH",
      LOW: "LOW",
      MODERATE: "MODERATE",
      GENERAL: "GENERAL",
      IMPORTANT: "IMPORTANT",
      URGENT: "URGENT",
    };
    return mapping[frontendValue] || "GENERAL";
  }

  /**
   * Map backend enum values to frontend display values
   * @param {string} backendValue - Backend enum value
   * @returns {string} Frontend display value
   */
  mapFromValueToDisplay(backendValue) {
    const mapping = {
      ADMIN: "PG Admin",
      OWNER: "PG Owner",
      HOUSEKEEPING: "Housekeeping Staff",
    };
    return mapping[backendValue] || backendValue;
  }

  /**
   * Map backend priority enum values to frontend display values
   * @param {string} backendValue - Backend enum value
   * @returns {string} Frontend display value
   */
  mapPriorityLevelToDisplay(backendValue) {
    const mapping = {
      URGENT: "urgent",
      IMPORTANT: "important",
      HIGH: "important",
      MODERATE: "important",
      LOW: "general",
      GENERAL: "general",
    };
    return mapping[backendValue] || "general";
  }

  /**
   * Format notice data for frontend consumption
   * @param {Object} backendNotice - Notice object from backend
   * @returns {Object} Formatted notice object for frontend
   */
  formatNoticeForFrontend(backendNotice) {
    return {
      id: backendNotice.id,
      title: backendNotice.title,
      message: backendNotice.message,
      from: this.mapFromValueToDisplay(backendNotice.from),
      priorityLevel: backendNotice.priorityLevel,
      createdAt: backendNotice.createdAt,
    };
  }

  /**
   * Get formatted notices for frontend
   * @returns {Promise<Array>} Array of formatted notice objects
   */
  async getFormattedNotices() {
    try {
      const notices = await this.getAllNotices();
      return notices.map((notice) => this.formatNoticeForFrontend(notice));
    } catch (error) {
      console.error("Error getting formatted notices:", error);
      throw error;
    }
  }
}

// Export a singleton instance
const adminNoticeService = new AdminNoticeService();
export default adminNoticeService;
