import React, { useState } from 'react';

const dummyNotices = [
  {
    id: 1,
    title: 'Water Supply Interruption - Tomorrow',
    content: 'URGENT NOTICE: Water supply will be interrupted tomorrow (July 25th) from 6:00 AM to 2:00 PM due to maintenance. Please store water in advance.',
    time: 'Today, 2:30 PM',
    from: 'PG Admin',
    type: 'urgent',
    unread: true,
  },
  {
    id: 2,
    title: 'New WiFi Password & Internet Upgrade',
    content: 'We upgraded to 100 Mbps fiber. New WiFi password is "PGFiber2025". Old network ends on July 26.',
    time: 'Yesterday, 6:15 PM',
    from: 'PG Owner',
    type: 'important',
    unread: true,
  },
  {
    id: 3,
    title: 'Monthly Cleaning Day - July 27th',
    content: 'Monthly deep cleaning on July 27th. Keep common areas tidy and clear.',
    time: '2 days ago, 10:00 AM',
    from: 'Housekeeping Staff',
    type: 'general',
    unread: true,
  },
  {
    id: 4,
    title: 'Rent Due Reminder - August 2025',
    content: 'Rent due by August 5. Late fee: 5%. Pay online for convenience.',
    time: '5 days ago, 9:00 AM',
    from: 'PG Admin',
    type: 'important',
    unread: false,
  },
];

const Notice = () => {
  const [filter, setFilter] = useState('all');
  const [notices, setNotices] = useState(dummyNotices);

  const handleMarkRead = (id) => {
    setNotices((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, unread: false } : n
      )
    );
  };

  const filtered = notices.filter((notice) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notice.unread;
    return notice.type === filter;
  });

  const badgeColor = {
    urgent: 'bg-red-600',
    important: 'bg-yellow-400 text-black',
    general: 'bg-gray-600',
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-10 px-6">
      <div className="space-y-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-purple-700 text-center">PG Notices</h1>

        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="text-gray-600 text-sm">
            Total: {notices.length} |{' '}
            <span className="text-green-600">
              {notices.filter((n) => n.unread).length} unread
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['all', 'unread', 'urgent', 'important'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-1.5 rounded text-sm border ${
                  filter === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 italic py-20">
              No notices found for this filter.
            </div>
          ) : (
            filtered.map((notice) => (
              <div
                key={notice.id}
                className={`w-full border rounded-lg shadow-sm px-6 py-5 transition ${
                  notice.unread
                    ? 'bg-green-50 border-l-4 border-green-500'
                    : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {notice.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded-full font-semibold text-white ${
                        badgeColor[notice.type]
                      }`}
                    >
                      {notice.type}
                    </span>
                    {notice.unread && (
                      <span className="bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">
                        New
                      </span>
                    )}
                    <span>{notice.time}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{notice.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>From: {notice.from}</span>
                  {notice.unread && (
                    <button
                      onClick={() => handleMarkRead(notice.id)}
                      className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;

