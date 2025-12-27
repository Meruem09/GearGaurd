import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const mockRequests = [
  { id: 1, subject: 'Preventive Check CNC', equipment: 'CNC Machine 01', scheduled: '2024-12-25', stage: 'new', assigned: 'John Doe' },
  { id: 2, subject: 'Printer Maintenance', equipment: 'Printer 01', scheduled: '2024-12-28', stage: 'in_progress', assigned: 'Jane Smith' },
];

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedRequests = localStorage.getItem('requests');
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    } else {
      setRequests(mockRequests);
    }
  }, []);


  function previousMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  }

  function getDaysInMonth() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }

  function getRequestsForDate(date) {
    if (!date) return [];

    const dateString = date.toISOString().split('T')[0];
    return requests.filter((req) => req.scheduled === dateString);
  }


  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const days = getDaysInMonth();
  const today = new Date().toDateString();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600 mt-1">Schedule and view preventive maintenance</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{monthYear}</h2>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-700 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((date, index) => {
                const dayRequests = getRequestsForDate(date);
                const isToday = date?.toDateString() === today;

                return (
                  <div
                    key={index}
                    className={`min-h-[120px] border rounded-lg p-2 transition-colors ${
                      date
                        ? 'bg-white border-gray-200'
                        : 'bg-gray-50 border-gray-100'
                    } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    {date && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-sm font-medium ${
                              isToday ? 'text-blue-600' : 'text-gray-700'
                            }`}
                          >
                            {date.getDate()}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {dayRequests.map((request) => (
                            <div
                              key={request.id}
                              className={`text-xs p-1.5 rounded ${
                                request.stage === 'new'
                                  ? 'bg-blue-100 text-blue-800'
                                  : request.stage === 'in_progress'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : request.stage === 'repaired'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              <p className="font-medium truncate">{request.subject}</p>
                              <p className="text-xs opacity-80 truncate">
                                {request.equipment}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Calendar Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>View preventive maintenance requests on the calendar</li>
          <li>Requests are color-coded by stage</li>
        </ul>
      </div>
    </div>
  );
}
