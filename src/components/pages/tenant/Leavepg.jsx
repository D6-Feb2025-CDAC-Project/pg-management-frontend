import React, { useState } from 'react';

const Leavepg = () => {
  const today = new Date().toISOString().split("T")[0];

  const [tenantName, setTenantName] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [leaveDate, setLeaveDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Leave request submitted!");
    console.log({
      tenantName,
      startDate,
      leaveDate,
      reason,
    });
  };

  return (
    <div className="w-full h-full bg-purple-200 p-10 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">Leave PG Request</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <div>
          <label className="block font-medium text-gray-700 mb-1">Tenant Name</label>
          <input
            type="text"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Leave Date</label>
          <input
            type="date"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Reason (optional)</label>
          <textarea
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Your reason for leaving"
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default Leavepg;
