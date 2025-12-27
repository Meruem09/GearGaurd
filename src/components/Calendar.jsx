import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const mockPreventiveRequests = [
  { id: 1, subject: 'Routine Check CNC', equipment: 'CNC Machine 01', scheduled: '2023-12-28' },
  { id: 2, subject: 'Printer Maintenance', equipment: 'Printer 01', scheduled: '2023-12-30' },
];

const CalendarView = () => {
  const [date, setDate] = useState(new Date());

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const events = mockPreventiveRequests.filter(r => r.scheduled === dateStr);
      return events.length > 0 ? (
        <div className="text-xs bg-blue-200 p-1 rounded">
          {events.length} event{events.length > 1 ? 's' : ''}
        </div>
      ) : null;
    }
  };

  const onClickDay = (value) => {
    // Open form to create new preventive request
    alert(`Create new preventive request for ${value.toDateString()}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Maintenance Calendar</h1>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          onClickDay={onClickDay}
          className="w-full"
        />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Events on {date.toDateString()}</h2>
        <div className="space-y-3">
          {mockPreventiveRequests.filter(r => r.scheduled === date.toISOString().split('T')[0]).map(event => (
            <div key={event.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="font-semibold text-gray-900">{event.subject}</p>
              <p className="text-sm text-gray-600">{event.equipment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;