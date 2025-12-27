import React, { useState, useEffect } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragOverlay,
  pointerWithin,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const mockRequests = [
  { id: 1, subject: 'Leaking Oil', equipment: 'CNC Machine 01', stage: 'new', assigned: 'John Doe', scheduled: '2023-12-25' },
  { id: 2, subject: 'Routine Check', equipment: 'Printer 01', stage: 'in_progress', assigned: 'Jane Smith', scheduled: '2023-12-26' },
  { id: 3, subject: 'Broken Screen', equipment: 'Laptop 01', stage: 'repaired', assigned: 'Bob Johnson', scheduled: '2023-12-20' },
  { id: 4, subject: 'Overheating', equipment: 'Server 01', stage: 'scrap', assigned: 'Alice Brown', scheduled: '2023-12-15' },
];

const stages = ['new', 'in_progress', 'repaired', 'scrap'];

/* ------------------ Sortable Card ------------------ */
const SortableItem = ({ request }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: request.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: 'grab',
  };

  const isOverdue =
    new Date(request.scheduled) < new Date().setHours(0, 0, 0, 0);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={`p-3 bg-white rounded-md shadow-sm border ${
          isOverdue ? 'border-l-4 border-red-500' : 'border-gray-200'
        }`}
      >
        <p className="font-medium text-gray-900">{request.subject}</p>
        <p className="text-sm text-gray-600">{request.equipment}</p>

        <div className="flex items-center gap-2 mt-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {request.assigned
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <span className="text-sm text-gray-700">{request.assigned}</span>
        </div>
      </div>
    </div>
  );
};

/* ------------------ Column ------------------ */
const Column = ({ stage, requests }) => {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  const items = requests.filter((r) => r.stage === stage);

  return (
    <div
      ref={setNodeRef}
      className={`w-72 min-h-[500px] p-4 rounded-xl border transition-colors
        ${isOver ? 'bg-blue-50 border-blue-400' : 'bg-gray-100 border-gray-200'}
      `}
    >
      <h2 className="font-bold mb-4 text-gray-700 uppercase text-sm tracking-wide">
        {stage.replace('_', ' ')} ({items.length})
      </h2>

      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {items.map((request) => (
            <SortableItem key={request.id} request={request} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

/* ------------------ Kanban ------------------ */
const Kanban = () => {
  const [requests, setRequests] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('requests');
    setRequests(saved ? JSON.parse(saved) : mockRequests);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over) return;

    const activeTask = requests.find((r) => r.id === active.id);
    if (!activeTask) return;

    let newStage = null;

    // Dropped on column
    if (stages.includes(over.id)) {
      newStage = over.id;
    } 
    // Dropped on another card
    else {
      const overTask = requests.find((r) => r.id === over.id);
      newStage = overTask?.stage;
    }

    if (newStage && newStage !== activeTask.stage) {
      const updated = requests.map((r) =>
        r.id === active.id ? { ...r, stage: newStage } : r
      );
      setRequests(updated);
      localStorage.setItem('requests', JSON.stringify(updated));
    }
  };

  const activeTask = requests.find((r) => r.id === activeId);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Maintenance Kanban Board
      </h1>

      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          {stages.map((stage) => (
            <Column key={stage} stage={stage} requests={requests} />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="w-72 p-3 bg-white rounded-md shadow-lg border border-gray-300">
              <p className="font-medium">{activeTask.subject}</p>
              <p className="text-sm text-gray-600">{activeTask.equipment}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Kanban;
