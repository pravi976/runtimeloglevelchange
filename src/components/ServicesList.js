import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import BackButton from './BackButton';
import './ServicesList.css';

function SortableItem({ service, app }) {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: service.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="app-card"
    >
      <div {...listeners} className="drag-handle">
        <h2>{service.name}</h2>
        <p>{service.description}</p>
      </div>
      <button
        className="primary-button"
        onClick={() => navigate(`/logger/${app}/service/${service.id}/logs`)}
      >
        Click here to view/change log level
      </button>
    </div>
  );
}

function ServicesList() {
  const { app } = useParams();
  const [services, setServices] = useState({
    'C6.4': [
      { id: 1, name: 'Authentication Service', description: 'User authentication and authorization' },
      { id: 2, name: 'Data Processing Service', description: 'Core data processing functionality' },
      { id: 3, name: 'Notification Service', description: 'Handles system notifications' }
    ],
    'C2.4': [
      { id: 1, name: 'API Gateway', description: 'API routing and management' },
      { id: 2, name: 'User Service', description: 'User management operations' }
    ],
    'C4': [
      { id: 1, name: 'Monitoring Service', description: 'System monitoring and alerts' },
      { id: 2, name: 'Reporting Service', description: 'Report generation and management' }
    ],
    'GPDE1.10': [
      { id: 1, name: 'Data Integration', description: 'Data integration service' },
      { id: 2, name: 'Analytics Service', description: 'Data analytics and processing' }
    ]
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setServices((prevServices) => {
        const currentServices = [...prevServices[app]];
        const oldIndex = currentServices.findIndex(item => item.id === active.id);
        const newIndex = currentServices.findIndex(item => item.id === over.id);
        
        const reorderedServices = arrayMove(currentServices, oldIndex, newIndex);
        
        return {
          ...prevServices,
          [app]: reorderedServices
        };
      });
    }
  }

  return (
    <div className="services-page">
      <BackButton />
      <div className="page-header">
        <h1>{app} Services</h1>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={services[app]?.map(service => service.id)} strategy={rectSortingStrategy}>
          <div className="services-container app-grid">
            {services[app]?.map((service) => (
              <SortableItem key={service.id} service={service} app={app} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default ServicesList;