import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockTeams = [
  { id: 1, name: 'Mechanics', members: ['John Doe', 'Bob Johnson'], equipment: ['CNC Machine 01'] },
  { id: 2, name: 'IT Support', members: ['Jane Smith'], equipment: ['Printer 01'] },
  { id: 3, name: 'Electricians', members: ['Alice Brown'], equipment: [] },
];

const Teams = () => {
  const [requests, setRequests] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const storedRequests = localStorage.getItem('requests');
    if (storedRequests) {
      const reqs = JSON.parse(storedRequests);
      setRequests(reqs);
      const teamCounts = reqs.reduce((acc, req) => {
        acc[req.team] = (acc[req.team] || 0) + 1;
        return acc;
      }, {});
      const data = Object.keys(teamCounts).map(team => ({ team, requests: teamCounts[team] }));
      setChartData(data);
    }
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Maintenance Teams</h1>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Requests per Team</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="requests" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeams.map(team => (
          <div key={team.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{team.name}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Members:</span> {team.members.join(', ')}</p>
              <p><span className="font-medium">Equipment:</span> {team.equipment.length > 0 ? team.equipment.join(', ') : 'None'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;