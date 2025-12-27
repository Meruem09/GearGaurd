import React, { useState } from 'react';
import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const mockRequests = [
  { id: 1, subject: 'Leaking Oil', equipment: 'CNC Machine 01', stage: 'new', assigned: 'John Doe', scheduled: '2023-12-25' },
  { id: 2, subject: 'Routine Check', equipment: 'Printer 01', stage: 'in_progress', assigned: 'Jane Smith', scheduled: '2023-12-26' },
  { id: 3, subject: 'Broken Screen', equipment: 'Laptop 01', stage: 'repaired', assigned: 'Bob Johnson', scheduled: '2023-12-20' },
  { id: 4, subject: 'Overheating', equipment: 'Server 01', stage: 'scrap', assigned: 'Alice Brown', scheduled: '2023-12-15' },
];

const stages = ['new', 'in_progress', 'repaired', 'scrap'];

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const Kanban = () => {
  const [requests, setRequests] = useState(mockRequests);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const activeRequest = requests.find(r => r.id === activeId);
    const overStage = overId;

    if (activeRequest.stage !== overStage) {
      setRequests(requests.map(r => r.id === activeId ? { ...r, stage: overStage } : r));
    }
  };

  const isOverdue = (scheduled) => new Date(scheduled) < new Date() && new Date(scheduled).toDateString() !== new Date().toDateString();

  const Column = ({ stage }) => {
    const { setNodeRef } = useDroppable({ id: stage });
    return (
      <div ref={setNodeRef} className="w-full lg:w-64 bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="font-semibold mb-4 text-gray-900 capitalize">{stage.replace('_', ' ')}</h2>
        <SortableContext items={requests.filter(r => r.stage === stage).map(r => r.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {requests.filter(r => r.stage === stage).map(request => (
              <SortableItem key={request.id} id={request.id}>
                <div className={`p-3 bg-white rounded-md shadow-sm border ${isOverdue(request.scheduled) ? 'border-l-4 border-red-500' : 'border-gray-200'}`}>
                  <p className="font-medium text-gray-900">{request.subject}</p>
                  <p className="text-sm text-gray-600">{request.equipment}</p>
                  <p className="text-sm text-gray-600">Assigned: {request.assigned}</p>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mt-2">
                    {request.assigned.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Maintenance Kanban Board</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 overflow-x-auto">
          {stages.map(stage => <Column key={stage} stage={stage} />)}
        </div>
      </DndContext>
    </div>
  );
};

export default Kanban;