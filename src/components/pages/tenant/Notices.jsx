import React, { useEffect, useState } from 'react';
import TenantNoticeService from '../../../services/TenantNoticeService';

const Notice = () => {
  const [filter, setFilter] = useState('all');
  const [notices, setNotices] = useState([]);

  const fetchData = async () => {
    const response = await TenantNoticeService.getAllNotices();
    setNotices(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = notices.filter((notice) => {
    if (filter === 'all') return true;
    return notice.priorityLevel.toLowerCase() === filter;
  });

  const borderColor = {
    high: 'border-red-500',
    important: 'border-yellow-400',
    general: 'border-purpleDark',
  };

  const badgeColor = {
    high: 'bg-red-600',
    important: 'bg-yellow-400 text-black',
    general: 'bg-purpleDark',
  };

  const isNew = (createdAt) => {
    const now = new Date();
    const noticeDate = new Date(createdAt);
    const diffInHours = (now - noticeDate) / (1000 * 60 * 60);
    return diffInHours < 48; // last 2 days
  };

  return (
    <div className="min-h-screen w-full bg-purpleDarkScale-100 py-6 px-4">
      <div className="space-y-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purpleDark text-center">
          Tenant Notice Board
        </h1>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="text-purpleDark text-sm">
            Total: {notices.length}
          </div>

          <div className="flex flex-wrap gap-2">
            {['all', 'high', 'important', 'general'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-1.5 rounded text-sm border font-medium transition ${
                  filter === type
                    ? 'bg-purpleDark text-white border-purpleDark'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-purpleLight'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center text-purpleDark italic py-20">
              No notices found for this filter.
            </div>
          ) : (
            filtered.map((notice) => {
              const isNewNotice = isNew(notice.createdAt);
              const priority = notice.priorityLevel.toLowerCase();
              return (
                <div
                  key={notice.id}
                  className={`w-full border-l-4 px-6 py-5 rounded-md shadow-sm transition ${borderColor[priority] || ''} ${
                    isNewNotice ? 'bg-green-50' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {notice.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold text-white ${badgeColor[priority] || ''}`}
                      >
                        {priority}
                      </span>
                      {isNewNotice && (
                        <span className="bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">
                          New
                        </span>
                      )}
                      <span>{new Date(notice.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-800 mb-3">{notice.message}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>From: {notice.from}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;