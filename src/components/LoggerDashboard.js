import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import './LoggerDashboard.css';

function SortableItem({ app }) {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: app.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  const handleButtonClick = (e) => {
    if (!isDragging) {
      e.stopPropagation();
      navigate(`/logger/${app.id}/services`, { replace: true });
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="app-card"
    >
      <div {...listeners} className="drag-handle">
        <h2>{app.name}</h2>
        <p>{app.description}</p>
      </div>
      <button
        className="primary-button"
        onClick={handleButtonClick}
      >
        View Services
      </button>
    </div>
  );
}

function LoggerDashboard() {
  const [apps, setApps] = useState([
    { id: 'C6.4', name: 'C6.4', description: 'Core services application' },
    { id: 'C2.4', name: 'C2.4', description: 'API services application' },
    { id: 'C4', name: 'C4', description: 'Monitoring application' },
    { id: 'GPDE1.10', name: 'GPDE1.10', description: 'Data processing application' }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setApps((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="logger-dashboard">
      <div className="page-header">
        <h1>Runtime Log Level Change</h1>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={apps.map(app => app.id)} strategy={rectSortingStrategy}>
          <div className="app-grid">
            {apps.map((app) => (
              <SortableItem key={app.id} app={app} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default LoggerDashboard;