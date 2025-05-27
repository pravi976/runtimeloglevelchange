import React, { useState, useEffect } from 'react';
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

function SortableItem({ service, app, onRemove }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
    position: 'relative'
  };

  const handleRemoveClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmRemove = () => {
    onRemove(service.id);
    setShowConfirmModal(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="app-card"
      >
        {/* Commented out remove button
        <button
          className="remove-button-small"
          onClick={handleRemoveClick}
          title="Remove Service"
        >
          ×
        </button>
        */}
        <div {...listeners} className="drag-handle">
          <h2>{service.name}</h2>
          <p>{service.description}</p>
        </div>
        <div className="button-container">
          <button
            className="primary-button"
            onClick={() => navigate(`/logger/${app}/service/${service.id}/regions`)}
          >
            Click here to view/change log level
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Service Removal</h3>
            <p>Are you sure you want to remove <strong>{service.name}</strong>?</p>
            <div className="modal-buttons">
              <button 
                className="modal-button cancel" 
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-button confirm" 
                onClick={handleConfirmRemove}
              >
                Remove Service
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ServicesList() {
  const { app } = useParams();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({ name: '', description: '' });
  const [services, setServices] = useState({});

  // Load services from localStorage on component mount
  useEffect(() => {
    const savedServices = localStorage.getItem('services');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      // Initial default services
      const defaultServices = {
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
          { id: 1, name: 'Plan Collector', description: 'Consumes Plan Data' },
          { id: 2, name: 'Manager', description: 'Coordinator b/w collector and processor' },
          { id: 3, name: 'Plan Processor', description: 'Processes Plan Data Received From Collector' }
        ],
        'GPDE1.10': [
          { id: 1, name: 'Data Integration', description: 'Data integration service' },
          { id: 2, name: 'Analytics Service', description: 'Data analytics and processing' }
        ]
      };
      setServices(defaultServices);
      localStorage.setItem('services', JSON.stringify(defaultServices));
    }
  }, []);

  const handleAddService = (e) => {
    e.preventDefault();
    if (newService.name && newService.description) {
      setServices(prevServices => {
        const currentServices = prevServices[app] || [];
        const newId = currentServices.length > 0 ? Math.max(...currentServices.map(s => s.id)) + 1 : 1;
        const updatedServices = {
          ...prevServices,
          [app]: [...currentServices, { ...newService, id: newId }]
        };
        // Save to localStorage
        localStorage.setItem('services', JSON.stringify(updatedServices));
        return updatedServices;
      });
      setNewService({ name: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setServices(prevServices => {
        const currentServices = [...prevServices[app]];
        const oldIndex = currentServices.findIndex(service => service.id === active.id);
        const newIndex = currentServices.findIndex(service => service.id === over.id);
        const updatedServices = {
          ...prevServices,
          [app]: arrayMove(currentServices, oldIndex, newIndex)
        };
        // Save to localStorage after reordering
        localStorage.setItem('services', JSON.stringify(updatedServices));
        return updatedServices;
      });
    }
  };

  const handleRemoveService = (serviceId) => {
    setServices(prevServices => {
      const currentServices = [...prevServices[app]];
      const updatedServices = {
        ...prevServices,
        [app]: currentServices.filter(service => service.id !== serviceId)
      };
      // Save to localStorage after removing
      localStorage.setItem('services', JSON.stringify(updatedServices));
      return updatedServices;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="services-page">
      <BackButton />
      {/* Commented out Add New Service button
      <div className="add-service-container">
        <button 
          className="add-service-button"
          onClick={() => setShowAddForm(true)}
        >
          + Add New Service
        </button>
      </div>
      */}
      <div className="page-header">
        <h1>{app} Services</h1>
        {/* <button 
          className="add-service-button" 
          onClick={() => setShowAddForm(true)}
        >
          Add New Service
        </button> */}
      </div>

      {showAddForm && (
        <div className="add-service-form">
          <form onSubmit={handleAddService}>
            <input
              type="text"
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="Service Description"
              value={newService.description}
              onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
              required
            />
            <div className="form-buttons">
              <button type="submit" className="primary-button">Add Service</button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewService({ name: '', description: '' });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={(services[app] || []).map(service => service.id)} 
          strategy={rectSortingStrategy}
        >
          <div className="services-container app-grid">
            {(services[app] || []).map((service) => (
              <SortableItem 
                key={service.id} 
                service={service} 
                app={app} 
                onRemove={handleRemoveService}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default ServicesList;