import React, { useState, useEffect } from 'react';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState({ type: 'corrective', subject: '', equipment: '', team: '', scheduled: '', duration: '' });

  useEffect(() => {
    const storedRequests = localStorage.getItem('requests');
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }
    const storedEquipment = localStorage.getItem('equipment');
    if (storedEquipment) {
      setEquipment(JSON.parse(storedEquipment));
    } else {
      const defaultEquipment = [
        { id: '1', name: 'CNC Machine 01', team: 'Mechanics' },
        { id: '2', name: 'Printer 01', team: 'IT Support' },
      ];
      setEquipment(defaultEquipment);
      localStorage.setItem('equipment', JSON.stringify(defaultEquipment));
    }
  }, []);

  const saveRequests = (newRequests) => {
    setRequests(newRequests);
    localStorage.setItem('requests', JSON.stringify(newRequests));
  };

  const handleEquipmentChange = (e) => {
    const eqName = e.target.value;
    const eq = equipment.find(e => e.name == eqName);
    setForm({ ...form, equipment: eq ? eq.name : '', team: eq ? eq.team : '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = { ...form, id: Date.now(), stage: 'new', assigned: 'Unassigned' };
    saveRequests([...requests, newRequest]);
    setForm({ type: 'corrective', subject: '', equipment: '', team: '', scheduled: '', duration: '' });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Maintenance Requests</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="corrective">Corrective</option>
              <option value="preventive">Preventive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
            <select value={form.equipment} onChange={handleEquipmentChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">Select Equipment</option>
              {equipment.map(eq => <option key={eq.id} value={eq.name}>{eq.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
            <input type="text" value={form.team} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
            <input type="date" value={form.scheduled} onChange={(e) => setForm({ ...form, scheduled: e.target.value })} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
            <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-sm transition duration-200">Create Request</button>
      </form>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Requests</h2>
        <div className="space-y-4">
          {requests.map(req => (
            <div key={req.id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
              <p className="text-lg font-semibold text-gray-900">{req.subject}</p>
              <p className="text-sm text-gray-600">Type: {req.type} | Stage: {req.stage}</p>
              <p className="text-sm text-gray-600">Equipment: {req.equipment} | Team: {req.team}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;