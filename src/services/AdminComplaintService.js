// services/AdminComplaintService.js

import { store } from "../redux/store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class AdminComplaintService {
  // Helper method to get auth headers
  static getAuthHeaders() {
    const state = store.getState();
    const token = state.auth?.token;
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  // Helper method to handle API responses
  static async handleResponse(response) {
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;

      // Try to get error message from response
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        // If response is not JSON, use default error message
      }

      throw new Error(errorMessage);
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return [];
    }

    return response.json();
  }

  // Get all complaints (for admin dashboard)
  static async getAllComplaints() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/complaints`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error fetching all complaints:", error);
      throw error;
    }
  }

  // Get complaint details by ID
  static async getComplaintById(complaintId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/complaints/${complaintId}`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error fetching complaint details:", error);
      throw error;
    }
  }

  // Update complaint status
  static async updateComplaintStatus(complaintId, status) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/complaints/${complaintId}/status`,
        {
          method: "PUT",
          headers: this.getAuthHeaders(),
          body: JSON.stringify({
            complaintStatus: status.toUpperCase(),
          }),
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error updating complaint status:", error);
      throw error;
    }
  }

  // Update complaint priority
  static async updateComplaintPriority(complaintId, priority) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/complaints/${complaintId}/priority`,
        {
          method: "PUT",
          headers: this.getAuthHeaders(),
          body: JSON.stringify({
            priorityLevel: priority.toUpperCase(),
          }),
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error updating complaint priority:", error);
      throw error;
    }
  }

  // Add/Update action taken for complaint
  static async updateComplaintAction(complaintId, actionTaken) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/complaints/${complaintId}/action`,
        {
          method: "PUT",
          headers: this.getAuthHeaders(),
          body: JSON.stringify({
            actionTaken: actionTaken,
          }),
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error updating complaint action:", error);
      throw error;
    }
  }

  // Get complaints by status
  static async getComplaintsByStatus(status) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/complaints/status/${status}`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error fetching complaints by status:", error);
      throw error;
    }
  }

  // Get complaints by priority
  static async getComplaintsByPriority(priority) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/complaints/priority/${priority}`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error fetching complaints by priority:", error);
      throw error;
    }
  }

  // Get complaint statistics for dashboard
  static async getComplaintStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/complaints/stats`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error fetching complaint stats:", error);
      throw error;
    }
  }

  static async filterComplaints(status = null, priority = null) {
    try {
      const params = new URLSearchParams();
      if (status && status !== "All") {
        // Replace spaces with underscores
        params.append("status", status.toUpperCase().replace(/\s+/g, "_"));
      }
      if (priority && priority !== "All") {
        params.append("priority", priority.toUpperCase());
      }

      const queryString = params.toString();
      const url = queryString
        ? `${API_BASE_URL}/admin/complaints/filter?${queryString}`
        : `${API_BASE_URL}/admin/complaints`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error filtering complaints:", error);
      throw error;
    }
  }

  // Delete complaint (soft delete)
  static async deleteComplaint(complaintId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/complaints/${complaintId}`,
        {
          method: "DELETE",
          headers: this.getAuthHeaders(),
        }
      );

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error deleting complaint:", error);
      throw error;
    }
  }

  // Helper method to format date for display
  static formatDate(dateString) {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Helper method to get priority level display text
  static getPriorityDisplayText(priority) {
    const priorityMap = {
      HIGH: "High",
      LOW: "Low",
      MODERATE: "Moderate",
      GENERAL: "General",
      IMPORTANT: "Important",
      URGENT: "Urgent",
    };
    return priorityMap[priority] || priority;
  }

  // Helper method to get status display text
  static getStatusDisplayText(status) {
    const statusMap = {
      PENDING: "Pending",
      RESOLVED: "Resolved",
      IN_PROGRESS: "In Progress",
    };
    return statusMap[status] || status;
  }

  // Convert backend response to frontend format
  static formatComplaintForFrontend(complaint) {
    return {
      id: complaint.id,
      title: complaint.title,
      issue: complaint.issue, // Backend uses 'issue', frontend uses 'message'
      date: this.formatDate(complaint.createdAt),
      status: this.getStatusDisplayText(complaint.complaintStatus),
      tenantName: complaint.tenantName || "N/A",
      tenantId: complaint.tenantId || "N/A",
      priority: this.getPriorityDisplayText(complaint.priorityLevel),
      actionTaken: complaint.actionTaken || "",
      resolvedDate: complaint.resolvedDate
        ? this.formatDate(complaint.resolvedDate)
        : null,
      resolvedBy: complaint.resolvedBy || null,
      // Keep original backend fields for API calls
      _original: complaint,
    };
  }

  // Convert multiple complaints to frontend format
  static formatComplaintsForFrontend(complaints) {
    return complaints.map((complaint) =>
      this.formatComplaintForFrontend(complaint)
    );
  }
}

export default AdminComplaintService;
