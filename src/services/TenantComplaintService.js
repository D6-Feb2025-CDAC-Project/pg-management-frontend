// services/TenantComplaintService.js

const API_BASE_URL = 'http://localhost:8080';

class TenantComplaintService {
  // Helper method to get auth headers
  static getAuthHeaders() {
    const token = localStorage.getItem('token'); // Adjust based on how you store the auth token
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
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

  // Submit new complaint
  static async submitComplaint(complaintData) {
    try {
      const response = await fetch(`${API_BASE_URL}/tenant/complaints`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          title: complaintData.title,
          issue: complaintData.issue,
          priorityLevel: complaintData.priorityLevel,
        }),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      throw error;
    }
  }

  // Get all my complaints (authenticated tenant)
  static async getMyComplaints() {
    try {
      const response = await fetch(`${API_BASE_URL}/tenant/complaints/my-complaints`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      throw error;
    }
  }

  // Get a specific complaint by ID
  static async getComplaintById(complaintId) {
    try {
      const response = await fetch(`${API_BASE_URL}/tenant/complaints/${complaintId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching complaint:', error);
      throw error;
    }
  }

  // Update an existing complaint (only if status is 'PENDING')
  static async updateComplaint(complaintId, updateData) {
    try {
      const response = await fetch(`${API_BASE_URL}/tenant/complaints/${complaintId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          title: updateData.title,
          issue: updateData.issue,
          priorityLevel: updateData.priorityLevel,
        }),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error updating complaint:', error);
      throw error;
    }
  }

  // Delete a complaint (only if status is 'PENDING')
  static async deleteComplaint(complaintId) {
    try {
      const response = await fetch(`${API_BASE_URL}/tenant/complaints/${complaintId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error deleting complaint:', error);
      throw error;
    }
  }

  // Get complaints by status
  static async getComplaintsByStatus(status) {
    try {
      const response = await fetch(`${API_BASE_URL}/tenant/complaints/status/${status}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching complaints by status:', error);
      throw error;
    }
  }

  // Get complaints by priority
  static async getComplaintsByPriority(priority) {
    try {
      const response = await fetch(`${API_BASE_URL}/tenant/complaints/priority/${priority}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching complaints by priority:', error);
      throw error;
    }
  }

  // Get complaint statistics
  static async getComplaintStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/tenant/complaints/stats`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching complaint stats:', error);
      throw error;
    }
  }

  // Check complaint status
  static async checkComplaintStatus(complaintId) {
    try {
      const response = await fetch(`${API_BASE_URL}/tenant/complaints/check-status/${complaintId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error checking complaint status:', error);
      throw error;
    }
  }

  // Helper method to format date for display
  static formatDate(dateString) {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Helper method to get priority level display text
  static getPriorityDisplayText(priority) {
    const priorityMap = {
      'HIGH': 'High',
      'LOW': 'Low',
      'MODERATE': 'Moderate',
      'GENERAL': 'General',
      'IMPORTANT': 'Important',
      'URGENT': 'Urgent'
    };
    return priorityMap[priority] || priority;
  }

  // Helper method to get status display text
  static getStatusDisplayText(status) {
    const statusMap = {
      'PENDING': 'Pending',
      'RESOLVED': 'Resolved',
      'IN_PROGRESS': 'In Progress'
    };
    return statusMap[status] || status;
  }

  // Helper method to validate complaint data before submission
  static validateComplaintData(complaintData) {
    const errors = [];

    if (!complaintData.title || complaintData.title.trim().length === 0) {
      errors.push('Title is required');
    }
    if (complaintData.title && complaintData.title.length > 100) {
      errors.push('Title cannot exceed 100 characters');
    }

    if (!complaintData.issue || complaintData.issue.trim().length === 0) {
      errors.push('Issue description is required');
    }
    if (complaintData.issue && complaintData.issue.length > 1000) {
      errors.push('Issue description cannot exceed 1000 characters');
    }

    if (!complaintData.priorityLevel) {
      errors.push('Priority level is required');
    }

    const validPriorities = ['HIGH', 'LOW', 'MODERATE', 'GENERAL', 'IMPORTANT', 'URGENT'];
    if (complaintData.priorityLevel && !validPriorities.includes(complaintData.priorityLevel)) {
      errors.push('Invalid priority level');
    }

    return errors;
  }
}

export default TenantComplaintService;