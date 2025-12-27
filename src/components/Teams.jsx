import React from 'react';

const mockTeams = [
  { id: 1, name: 'Mechanics', members: ['John Doe', 'Bob Johnson'], equipment: ['CNC Machine 01'] },
  { id: 2, name: 'IT Support', members: ['Jane Smith'], equipment: ['Printer 01'] },
  { id: 3, name: 'Electricians', members: ['Alice Brown'], equipment: [] },
];

const Teams = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Maintenance Teams</h1>
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