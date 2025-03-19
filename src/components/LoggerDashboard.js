import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { loggerApplications } from '../config/loggerApps';

function LoggerDashboard() {
  const navigate = useNavigate();
  const [apps, setApps] = useState(loggerApplications);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(apps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setApps(items);
  };

  return (
    <div className="logger-dashboard">
      <h1>CPUDCTV Loggers Dashboard</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="apps">
          {(provided) => (
            <div 
              className="app-grid"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {apps.map((app, index) => (
                <Draggable 
                  key={app.id} 
                  draggableId={app.id.toString()} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="app-card"
                    >
                      <h2>{app.name}</h2>
                      <p>{app.description}</p>
                      <div className="link-container">
                        <button
                          className="link-button"
                          onClick={() => navigate(`/logger/${app.name}/services`)}
                        >
                          View Services
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default LoggerDashboard;