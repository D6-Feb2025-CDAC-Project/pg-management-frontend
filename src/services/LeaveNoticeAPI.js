import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const leaveNoticeAPI = {
  // Get all leave notices for admin
  getAllLeaveNotices: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/leave-notices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch leave notices");
    }

    return await response.json();
  },

  // Get specific leave notice
  getLeaveNoticeById: async (noticeId) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/leave-notices/${noticeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch leave notice");
    }

    return await response.json();
  },

  // Update notice status
  updateNoticeStatus: async (noticeId, statusData) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/leave-notices/${noticeId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update notice status");
    }

    return await response.json();
  },

  // Update review notes
  updateReviewNotes: async (noticeId, reviewNotes) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/leave-notices/${noticeId}/review-notes`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewNotes }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update review notes");
    }

    return await response.json();
  },

  // Process deposit settlement
  processDepositSettlement: async (noticeId, settlementData) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/leave-notices/${noticeId}/settlement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settlementData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to process deposit settlement");
    }

    return await response.json();
  },
};

// Helper functions to map between frontend and backend status
const mapBackendStatusToFrontend = (backendStatus) => {
  const statusMap = {
    PENDING_REVIEW: "Pending Review",
    UNDER_REVIEW: "Under Review",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    PAYMENT_PROCESSING: "Payment Processing",
    COMPLETED: "Completed",
  };
  return statusMap[backendStatus] || backendStatus;
};

const mapFrontendStatusToBackend = (frontendStatus) => {
  const statusMap = {
    "Pending Review": "PENDING_REVIEW",
    "Under Review": "UNDER_REVIEW",
    Approved: "APPROVED",
    Rejected: "REJECTED",
    "Payment Processing": "PAYMENT_PROCESSING",
    Completed: "COMPLETED",
  };
  return statusMap[frontendStatus] || frontendStatus;
};

export const useLeaveNoticesHandlers = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle status changes with settlement creation feedback
  const handleStatusChange = async (
    noticeId,
    newFrontendStatus,
    notes = ""
  ) => {
    try {
      setError(null);
      const backendStatus = mapFrontendStatusToBackend(newFrontendStatus);

      const response = await leaveNoticeAPI.updateNoticeStatus(noticeId, {
        newStatus: backendStatus,
        reviewNotes: notes,
      });

      // Show success message if settlement was created
      if (newFrontendStatus === "Approved") {
        console.log("Notice approved and settlement created");
      }

      // Reload notices to get updated data
      await loadNotices();

      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Rest of the handlers remain the same...
  const loadNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leaveNoticeAPI.getAllLeaveNotices();

      const transformedData = data.map((notice) => ({
        id: notice.id,
        referenceId: notice.referenceId,
        tenantName: notice.tenantName,
        tenantId: notice.tenantId.toString(),
        roomNumber: notice.roomNumber,
        submissionDate: notice.createdDate?.split("T")[0] || notice.createdDate,
        moveOutDate: notice.moveOutDate,
        reason:
          notice.reasonOfLeave?.toLowerCase().replace(/ /g, "_") || "other",
        reasonText: notice.reasonOfLeave,
        details: notice.additionalTenantNotes,
        contactNumber: notice.contactNumber,
        emailAddress: notice.tenantEmail,
        status: mapBackendStatusToFrontend(notice.noticeResponseStatus),
        securityDeposit: notice.securityDeposit,
        reviewNotes: notice.reviewNotes,
        settlementGenerated: notice.settlementGenerated,
        depositSettlement: notice.settlementDetails
          ? {
              deductionAmount: notice.settlementDetails.deductionAmount,
              deductionReason: notice.settlementDetails.deductionReason,
              finalAmount: notice.settlementDetails.settlementAmount,
              processedDate: notice.settlementDetails.settlementProcessedDate,
            }
          : null,
      }));

      setNotices(transformedData);
    } catch (err) {
      setError(err.message);
      console.error("Error loading notices:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNotesSubmit = async (noticeId, reviewNotes) => {
    try {
      setError(null);
      await leaveNoticeAPI.updateReviewNotes(noticeId, reviewNotes);
      await loadNotices();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleDepositSettlement = async (noticeId, settlementData) => {
    try {
      setError(null);
      await leaveNoticeAPI.processDepositSettlement(noticeId, {
        deductionAmount: settlementData.deductionAmount,
        deductionReason: settlementData.deductionReason,
      });

      await loadNotices();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    notices,
    loading,
    error,
    loadNotices,
    handleStatusChange,
    handleNotesSubmit,
    handleDepositSettlement,
    setNotices,
  };
};
