import React, { useState } from 'react';
import InfoCard from '../sub-components/InfoCard';
import InfoDisplay from '../sub-components/InfoDisplay';
import AlertBox from '../sub-components/AlertBox';
import FormInput from '../sub-components/FormInput';
import CheckboxInput from '../sub-components/CheckboxInput';
import SectionHeader from '../sub-components/SectionHeader';

// Main Leave PG Component
const Leavepg = () => {
  const today = new Date();
  const defaultMoveOutDate = new Date(today);
  defaultMoveOutDate.setDate(today.getDate() + 30);
  const defaultDateStr = defaultMoveOutDate.toISOString().split('T')[0];

  const [moveoutDate, setMoveoutDate] = useState(defaultDateStr);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [confirmations, setConfirmations] = useState({
    confirm1: false,
    confirm2: false,
    confirm3: false
  });

  const handleCheckboxChange = (key) => {
    setConfirmations({ ...confirmations, [key]: !confirmations[key] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !moveoutDate ||
      !reason ||
      !contactNumber ||
      !emailAddress ||
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

    alert(`Leave request submitted! Reference ID: LN${Date.now().toString().slice(-6)}`);
    setMoveoutDate(defaultDateStr);
    setReason('');
    setDetails('');
    setContactNumber('');
    setEmailAddress('');
    setConfirmations({
      confirm1: false,
      confirm2: false,
      confirm3: false
    });
  };

  return (
    <div className="min-h-screen w-full bg-purpleLighter py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-purpleDark mb-8">Leave PG Request</h1>

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
                <option value="job_relocation">Job Relocation</option>
                <option value="higher_studies">Higher Studies</option>
                <option value="family_reasons">Family Reasons</option>
                <option value="better_accommodation">Found Better Accommodation</option>
                <option value="financial_constraints">Financial Constraints</option>
                <option value="facility_issues">Issues with Facilities</option>
                <option value="other">Other</option>
              </FormInput>

              <FormInput
                label="Additional Details (optional)"
                type="textarea"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Any additional information you'd like to share..."
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Contact Number"
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />

                <FormInput
                  label="Email Address"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
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
                className="w-full bg-purpleDark text-white font-semibold py-4 rounded-lg hover:bg-purpleDarkScale-600 transition-colors duration-200 mt-6"
              >
                Submit Leave Notice
              </button>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Leavepg;