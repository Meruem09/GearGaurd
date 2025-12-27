import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EquipmentForm({ equipment, onClose, onSave }) {
  const teams = [
    { id: '1', name: 'Mechanics' },
    { id: '2', name: 'IT Support' },
  ];

  const technicians = [
    { id: '1', name: 'John Doe', team_id: '1' },
    { id: '2', name: 'Jane Smith', team_id: '1' },
    { id: '3', name: 'Bob Johnson', team_id: '2' },
  ];

  const [filteredTechnicians, setFilteredTechnicians] = useState([]);

  const [formData, setFormData] = useState({
    name: equipment?.name || '',
    serial_number: equipment?.serial_number || '',
    category: equipment?.category || '',
    owner_type: equipment?.owner_type || 'department',
    owner_name: equipment?.owner_name || '',
    purchase_date: equipment?.purchase_date || '',
    warranty_expiry: equipment?.warranty_expiry || '',
    location: equipment?.location || '',
    maintenance_team_id: equipment?.maintenance_team_id || '',
    default_technician_id: equipment?.default_technician_id || '',
  });

  useEffect(() => {
    if (formData.maintenance_team_id) {
      const filtered = technicians.filter(
        (tech) => tech.team_id === formData.maintenance_team_id
      );
      setFilteredTechnicians(filtered);
    } else {
      setFilteredTechnicians([]);
    }
  }, [formData.maintenance_team_id]);

  function handleSubmit(e) {
    e.preventDefault();
    const teamName = teams.find(t => t.id === formData.maintenance_team_id)?.name || '';
    const technicianName = technicians.find(t => t.id === formData.default_technician_id)?.name || '';

    const equipmentData = {
      ...formData,
      id: equipment?.id || Date.now().toString(),
      team: teamName,
      assigned: technicianName,
      request_count: 0,
      is_scrapped: false,
    };

    const existingEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
    let updatedEquipment;
    if (equipment) {
      updatedEquipment = existingEquipment.map(eq => eq.id === equipment.id ? equipmentData : eq);
    } else {
      updatedEquipment = [...existingEquipment, equipmentData];
    }
    localStorage.setItem('equipment', JSON.stringify(updatedEquipment));

    if (onSave) onSave();
    onClose();
  }

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {equipment ? 'Edit Equipment' : 'Add Equipment'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., CNC Machine 01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serial Number *
              </label>
              <input
                type="text"
                required
                value={formData.serial_number}
                onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., SN-2024-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Machine, Vehicle, Computer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Type *
              </label>
              <select
                required
                value={formData.owner_type}
                onChange={(e) =>
                  setFormData({ ...formData, owner_type: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="department">Department</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.owner_type === 'department' ? 'Department Name' : 'Employee Name'} *
              </label>
              <input
                type="text"
                required
                value={formData.owner_name}
                onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  formData.owner_type === 'department' ? 'e.g., Production' : 'e.g., John Doe'
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Building A, Floor 2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
              <input
                type="date"
                value={formData.purchase_date}
                onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Warranty Expiry
              </label>
              <input
                type="date"
                value={formData.warranty_expiry}
                onChange={(e) => setFormData({ ...formData, warranty_expiry: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maintenance Team
              </label>
              <select
                value={formData.maintenance_team_id}
                onChange={(e) =>
                  setFormData({ ...formData, maintenance_team_id: e.target.value, default_technician_id: '' })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Technician
              </label>
              <select
                value={formData.default_technician_id}
                onChange={(e) => setFormData({ ...formData, default_technician_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!formData.maintenance_team_id}
              >
                <option value="">Select a technician</option>
                {filteredTechnicians.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.name}
                  </option>
                ))}
              </select>
              {!formData.maintenance_team_id && (
                <p className="text-sm text-gray-500 mt-1">Select a maintenance team first</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {equipment ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
