import React, { useState } from 'react';

const mockEquipment = [
  { id: 1, name: 'CNC Machine 01', serial: 'CN001', department: 'Production', team: 'Mechanics', technician: 'John Doe', openRequests: 2 },
  { id: 2, name: 'Printer 01', serial: 'PR001', department: 'Office', team: 'IT Support', technician: 'Jane Smith', openRequests: 1 },
];

const Equipment = () => {
  const [equipment, setEquipment] = useState(mockEquipment);

  const viewMaintenance = (id) => {
    alert(`View maintenance requests for equipment ${id}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Equipment Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition duration-200">Add New Equipment</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Serial:</span> {item.serial}</p>
              <p><span className="font-medium">Department:</span> {item.department}</p>
              <p><span className="font-medium">Team:</span> {item.team}</p>
              <p><span className="font-medium">Technician:</span> {item.technician}</p>
            </div>
            <button
              onClick={() => viewMaintenance(item.id)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm transition duration-200 relative"
            >
              Maintenance
              {item.openRequests > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {item.openRequests}
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipment;