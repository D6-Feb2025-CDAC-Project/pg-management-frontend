import React, { useState } from 'react';

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
    confirm3: false,
    confirm4: false,
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
      confirm3: false,
      confirm4: false,
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-purple-700">Leave PG Request</h1>

        {/* Section 1: Current Tenancy Details */}
        <section className="bg-white border border-gray-300 rounded shadow">
          <h2 className="bg-gray-100 text-lg font-semibold px-6 py-3 border-b border-gray-300">Current Tenancy Details</h2>
          <div className="px-6 py-4 text-gray-700 text-sm space-y-3">
            <div className="flex"><span className="w-48 font-medium">Room Number:</span> <span>Room 205 (Double Room)</span></div>
            <div className="flex"><span className="w-48 font-medium">Current Month:</span> <span>July 2025</span></div>
            <div className="flex"><span className="w-48 font-medium">Next Due Date:</span> <span>05/08/2025</span></div>
          </div>
        </section>

        {/* Section 2: Notice Period Warning */}
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 text-sm rounded p-5">
          <strong>Notice Period:</strong> Minimum 30 days notice is required before vacating. Early exit may result in forfeiture of your security deposit.
        </div>

        {/* Section 3: Notice Details Form */}
        <form onSubmit={handleSubmit}>
          <section className="bg-white border border-gray-300 rounded shadow">
            <h2 className="bg-gray-100 text-lg font-semibold px-6 py-3 border-b border-gray-300">Notice Details</h2>
            <div className="p-6 space-y-6">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Intended Move-out Date</label>
                <input
                  type="date"
                  className="w-full border px-4 py-2 rounded"
                  value={moveoutDate}
                  min={today.toISOString().split('T')[0]}
                  onChange={(e) => setMoveoutDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Reason for Leaving</label>
                <select
                  className="w-full border px-4 py-2 rounded bg-white"
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
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Additional Details (optional)</label>
                <textarea
                  className="w-full border px-4 py-2 rounded min-h-[80px]"
                  placeholder="Any extra info..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Enter your phone number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Enter your email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          {/* Section 4: What Happens Next */}
          <div className="bg-blue-100 border border-blue-300 text-blue-900 text-sm rounded p-5">
            <strong>What happens next:</strong><br />
            • Your notice will be reviewed by PG management<br />
            • Security deposit refund will begin after room inspection<br />
            • Final settlement within 7–10 days after vacating<br />
            • You’ll receive confirmation via email/SMS
          </div>

          {/* Section 5: Confirmation & Submit */}
          <section className="bg-white border border-gray-300 rounded shadow mt-6">
            <h2 className="bg-gray-100 text-lg font-semibold px-6 py-3 border-b border-gray-300">Confirmation & Acknowledgment</h2>
            <div className="p-6 space-y-4 text-sm text-gray-800">
              {[
                { id: 'confirm1', text: 'I confirm I want to vacate the PG accommodation on the specified date.' },
                { id: 'confirm2', text: 'I understand the notice period and deposit conditions.' },
                { id: 'confirm3', text: 'I agree to leave the room in good condition and follow procedures.' },
                { id: 'confirm4', text: 'I would like help finding a replacement tenant.' },
              ].map((item) => (
                <div key={item.id} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={confirmations[item.id]}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="mt-1"
                  />
                  <label htmlFor={item.id} className="text-gray-700">{item.text}</label>
                </div>
              ))}
            </div>

            <div className="p-6">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-3 rounded hover:bg-purple-700 transition"
              >
                Submit Leave Notice
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Leavepg;
