import React, { useState, useEffect } from 'react';
import InfoCard from '../sub-components/InfoCard';
import InfoDisplay from '../sub-components/InfoDisplay';
import AlertBox from '../sub-components/AlertBox';
import FormInput from '../sub-components/FormInput';
import CheckboxInput from '../sub-components/CheckboxInput';
import SectionHeader from '../sub-components/SectionHeader';

// Main Leave PG Component
const Leavepg = () => {
  // Get tenant ID from props, context, or localStorage
  const tenantId = 6; // Replace with actual tenant ID from your auth system

  const today = new Date();
  const defaultMoveOutDate = new Date(today);
  defaultMoveOutDate.setDate(today.getDate() + 30);
  const defaultDateStr = defaultMoveOutDate.toISOString().split('T')[0];

  // Form states
  const [moveoutDate, setMoveoutDate] = useState(defaultDateStr);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [confirmations, setConfirmations] = useState({
    confirm1: false,
    confirm2: false,
    confirm3: false
  });

  // API states
  const [leaveNotice, setLeaveNotice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasExistingNotice, setHasExistingNotice] = useState(false);

  // Check for existing leave notice on component mount
  useEffect(() => {
    checkExistingNotice();
  }, []);

  const checkExistingNotice = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9090/tenant/leave-notices/${tenantId}`);

      if (response.ok) {
        const data = await response.json();
        setLeaveNotice(data);
        setHasExistingNotice(true);
      } else if (response.status === 404) {
        // No existing notice found
        setHasExistingNotice(false);
      } else {
        throw new Error('Failed to check existing notice');
      }
    } catch (err) {
      console.error('Error checking existing notice:', err);
      // Don't show error for 404, as it means no existing notice
      if (!err.message.includes('404')) {
        setError('Failed to load leave notice data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (key) => {
    setConfirmations({ ...confirmations, [key]: !confirmations[key] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !moveoutDate ||
      !reason ||
      !confirmations.confirm1 ||
      !confirmations.confirm2 ||
      !confirmations.confirm3
    ) {
      alert('Please complete all required fields and check the confirmations.');
      return;
    }

    const selectedDate = new Date(moveoutDate);
    const diffDays = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 30) {
      if (
        !window.confirm(
          'Your move-out date is less than 30 days from today. This may impact your security deposit. Do you want to proceed?'
        )
      ) {
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      const requestBody = {
        moveOutDate: moveoutDate,
        reasonOfLeave: reason,
        additionalTenantNotes: details || null
      };

      const response = await fetch(`http://localhost:9090/tenant/leave-notices/${tenantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to submit leave notice');
      }

      const result = await response.json();

      // Fetch the created leave notice details
      await checkExistingNotice();

      // Reset form
      setMoveoutDate(defaultDateStr);
      setReason('');
      setDetails('');
      setConfirmations({
        confirm1: false,
        confirm2: false,
        confirm3: false
      });

    } catch (err) {
      console.error('Error submitting leave notice:', err);
      setError('Failed to submit leave notice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelNotice = async () => {
    if (!window.confirm('Are you sure you want to cancel your leave notice?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:9090/tenant/leave-notices/${tenantId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to cancel leave notice');
      }

      setLeaveNotice(null);
      setHasExistingNotice(false);
      alert('Leave notice cancelled successfully');

    } catch (err) {
      console.error('Error cancelling leave notice:', err);
      setError('Failed to cancel leave notice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING_REVIEW':
        return 'text-yellow-600 bg-yellow-100';
      case 'APPROVED':
        return 'text-green-600 bg-green-100';
      case 'REJECTED':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-purpleLighter py-10 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purpleDark mx-auto mb-4"></div>
            <p className="text-purpleDark">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Display existing leave notice
  if (hasExistingNotice && leaveNotice) {
    return (
      <div className="min-h-screen w-full bg-purpleLighter py-10 px-6">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-purpleDark mb-8">Your Leave Notice</h1>

          {/* Error Alert */}
          {error && (
            <AlertBox type="error">
              <strong>Error:</strong> {error}
            </AlertBox>
          )}

          {/* Leave Notice Details */}
          <InfoCard>
            <SectionHeader title="Leave Notice Details" />
            <div className="px-6 py-6 space-y-4">
              <InfoDisplay label="Notice ID" value={`#${leaveNotice.id}`} />
              <InfoDisplay
                label="Status"
                value={
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(leaveNotice.noticeResponseStatus)}`}>
                    {leaveNotice.noticeResponseStatus.replace('_', ' ')}
                  </span>
                }
              />
              <InfoDisplay label="Move-out Date" value={formatDate(leaveNotice.moveOutDate)} />
              <InfoDisplay label="Reason for Leaving" value={leaveNotice.reasonOfLeave} />
              {leaveNotice.additionalTenantNotes && (
                <InfoDisplay label="Additional Notes" value={leaveNotice.additionalTenantNotes} />
              )}
              <InfoDisplay
                label="Settlement Status"
                value={leaveNotice.settlementGenerated ? "Generated" : "Pending"}
              />
            </div>
          </InfoCard>

          {/* Current Status Info */}
          {leaveNotice.noticeResponseStatus === 'PENDING_REVIEW' && (
            <AlertBox type="info">
              <strong>Your leave notice is under review</strong>
              <div className="mt-2 text-blue-800">
                <div>• Management will review your request within 2-3 business days</div>
                <div>• You'll receive notification once a decision is made</div>
                <div>• You can cancel this request if your plans change</div>
              </div>
            </AlertBox>
          )}

          {leaveNotice.noticeResponseStatus === 'APPROVED' && (
            <AlertBox type="success">
              <strong>Your leave notice has been approved</strong>
              <div className="mt-2 text-green-800">
                <div>• Proceed with your move-out preparations</div>
                <div>• Room inspection will be scheduled before your move-out date</div>
                <div>• Settlement process will begin after room handover</div>
              </div>
            </AlertBox>
          )}

          {leaveNotice.noticeResponseStatus === 'REJECTED' && (
            <AlertBox type="error">
              <strong>Your leave notice has been rejected</strong>
              <div className="mt-2 text-red-800">
                <div>• Please contact management for more details</div>
                <div>• You can submit a new request after addressing the issues</div>
              </div>
            </AlertBox>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            {leaveNotice.noticeResponseStatus === 'PENDING_REVIEW' && (
              <button
                onClick={handleCancelNotice}
                disabled={loading}
                className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel Notice
              </button>
            )}

            {(leaveNotice.noticeResponseStatus === 'REJECTED') && (
              <button
                onClick={() => {
                  setLeaveNotice(null);
                  setHasExistingNotice(false);
                }}
                className="bg-purpleDark text-white font-semibold py-3 px-6 rounded-lg hover:bg-purpleDarkScale-600 transition-colors duration-200"
              >
                Submit New Request
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Display form for new leave notice
  return (
    <div className="min-h-screen w-full bg-purpleLighter py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-purpleDark mb-8">Leave PG Request</h1>

        {/* Error Alert */}
        {error && (
          <AlertBox type="error">
            <strong>Error:</strong> {error}
          </AlertBox>
        )}

        {/* Section 1: Current Tenancy Details */}
        <InfoCard>
          <SectionHeader title="Current Tenancy Details" />
          <div className="px-6 py-6 space-y-4">
            <InfoDisplay label="Room Number" value="Room 205 (Double Room)" />
            <InfoDisplay label="Current Month" value="July 2025" />
            <InfoDisplay label="Next Due Date" value="05/08/2025" />
          </div>
        </InfoCard>

        {/* Section 2: Notice Period Warning */}
        <AlertBox type="warning">
          <strong className="text-yellow-900">Notice Period:</strong>
          <span className="text-yellow-800"> Minimum 30 days notice is required before vacating. Early exit may result in forfeiture of your security deposit.</span>
        </AlertBox>

        {/* Section 3: Notice Details Form */}
        <div onSubmit={handleSubmit}>
          <InfoCard>
            <SectionHeader title="Notice Details" bgColor="bg-purpleDarkScale-100" />
            <div className="p-6 space-y-6">
              <FormInput
                label="Intended Move-out Date"
                type="date"
                value={moveoutDate}
                onChange={(e) => setMoveoutDate(e.target.value)}
                min={today.toISOString().split('T')[0]}
                required
              />

              <FormInput
                label="Reason for Leaving"
                type="select"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              >
                <option value="">Select reason</option>
                <option value="Job relocation">Job Relocation</option>
                <option value="Higher studies">Higher Studies</option>
                <option value="Family reasons">Family Reasons</option>
                <option value="Found better accommodation">Found Better Accommodation</option>
                <option value="Financial constraints">Financial Constraints</option>
                <option value="Issues with facilities">Issues with Facilities</option>
                <option value="Other">Other</option>
              </FormInput>

              <FormInput
                label="Additional Details (optional)"
                type="textarea"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Any additional information you'd like to share..."
              />
            </div>
          </InfoCard>

          {/* Section 4: What Happens Next */}
          <AlertBox type="info">
            <strong className="text-blue-900">What happens next:</strong>
            <div className="mt-2 space-y-1 text-blue-800">
              <div>• Your notice will be reviewed by PG management</div>
              <div>• Security deposit refund will begin after room inspection</div>
              <div>• Final settlement within 7–10 days after vacating</div>
              <div>• You'll receive confirmation via email/SMS</div>
            </div>
          </AlertBox>

          {/* Section 5: Confirmation & Submit */}
          <InfoCard className="mt-8">
            <SectionHeader title="Confirmation & Acknowledgment" bgColor="bg-purpleDarkScale-100" />
            <div className="p-6 space-y-5">
              <CheckboxInput
                id="confirm1"
                checked={confirmations.confirm1}
                onChange={() => handleCheckboxChange('confirm1')}
              >
                I confirm I want to vacate the PG accommodation on the specified date.
              </CheckboxInput>

              <CheckboxInput
                id="confirm2"
                checked={confirmations.confirm2}
                onChange={() => handleCheckboxChange('confirm2')}
              >
                I understand the notice period and deposit conditions.
              </CheckboxInput>

              <CheckboxInput
                id="confirm3"
                checked={confirmations.confirm3}
                onChange={() => handleCheckboxChange('confirm3')}
              >
                I agree to leave the room in good condition and follow all move-out procedures.
              </CheckboxInput>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-purpleDark text-white font-semibold py-4 rounded-lg hover:bg-purpleDarkScale-600 transition-colors duration-200 disabled:opacity-50 mt-6"
              >
                {loading ? 'Submitting...' : 'Submit Leave Notice'}
              </button>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Leavepg;