import { useState, useEffect } from 'react';
import { Plus, Search, Package, Wrench } from 'lucide-react';
import EquipmentForm from './EquipmentForm';

export default function EquipmentList({ onSelectEquipment }) {
  const defaultEquipment = [
    {
      id: '1',
      name: 'CNC Machine 01',
      serial_number: 'SN-2024-001',
      category: 'Machine',
      owner_type: 'department',
      owner_name: 'Production',
      location: 'Building A, Floor 2',
      team: 'Mechanics',
      request_count: 2,
      is_scrapped: false,
    },
    {
      id: '2',
      name: 'Printer 01',
      serial_number: 'SN-2024-002',
      category: 'Computer',
      owner_type: 'employee',
      owner_name: 'John Doe',
      location: 'Office 101',
      team: 'IT Support',
      request_count: 0,
      is_scrapped: false,
    },
  ];

  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ownerTypeFilter, setOwnerTypeFilter] = useState('all');

  useEffect(() => {
    loadEquipment();
  }, []);

  useEffect(() => {
    filterEquipment();
  }, [equipment, searchTerm, categoryFilter, ownerTypeFilter]);

  function loadEquipment() {
    const storedEquipment = localStorage.getItem('equipment');
    if (storedEquipment) {
      setEquipment(JSON.parse(storedEquipment));
    } else {
      setEquipment(defaultEquipment);
      localStorage.setItem('equipment', JSON.stringify(defaultEquipment));
    }
  }

  function filterEquipment() {
    let filtered = [...equipment];

    if (searchTerm) {
      filtered = filtered.filter(
        (eq) =>
          eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          eq.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          eq.owner_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((eq) => eq.category === categoryFilter);
    }

    if (ownerTypeFilter !== 'all') {
      filtered = filtered.filter((eq) => eq.owner_type === ownerTypeFilter);
    }

    setFilteredEquipment(filtered);
  }

  const categories = Array.from(new Set(equipment.map((eq) => eq.category)));

  function handleEdit(eq) {
    setEditingEquipment(eq);
    setShowForm(true);
  }

  function handleFormClose() {
    setShowForm(false);
    setEditingEquipment(null);
    loadEquipment();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Equipment</h1>
          <p className="text-gray-600 mt-1">Manage your company assets and machinery</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Equipment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={ownerTypeFilter}
            onChange={(e) => setOwnerTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Owners</option>
            <option value="department">Department</option>
            <option value="employee">Employee</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((eq) => (
          <div
            key={eq.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectEquipment(eq)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Package className="text-blue-600" size={24} />
                </div>
                {eq.is_scrapped && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                    Scrapped
                  </span>
                )}
                {!eq.is_scrapped && eq.request_count > 0 && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                    {eq.request_count} open requests
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{eq.name}</h3>
              <p className="text-sm text-gray-600 mb-4">SN: {eq.serial_number}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="font-medium">Category:</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded">{eq.category}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="font-medium">
                    {eq.owner_type === 'department' ? 'Department:' : 'Employee:'}
                  </span>
                  <span>{eq.owner_name}</span>
                </div>
                {eq.location && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="font-medium">Location:</span>
                    <span>{eq.location}</span>
                  </div>
                )}
                {eq.team && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Wrench size={14} />
                    <span>{eq.team}</span>
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(eq);
                }}
                className="mt-4 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No equipment found</h3>
          <p className="text-gray-600">
            {searchTerm || categoryFilter !== 'all' || ownerTypeFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by adding your first equipment'}
          </p>
        </div>
      )}

      {showForm && (
        <EquipmentForm
          equipment={editingEquipment}
          onClose={handleFormClose}
          onSave={loadEquipment}
        />
      )}
    </div>
  );
}
