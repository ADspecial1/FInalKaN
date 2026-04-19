import React from "react";
import { Card } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const TaskList: React.FC<{ tasks: any[], column: string, userId: string }> = ({ tasks, column, userId }) => {
  
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    // If dropped outside of a droppable column
    if (!destination) return;

    // Only update the status if task moved within the columns
    if (source.droppableId !== destination.droppableId) {
      // Update the task status in the database
      // This should reflect in your firebase database
      const taskId = tasks[source.index].id;
      updateTaskStatusInDb(taskId, destination.droppableId);  // Update in DB
    }
  };

  const updateTaskStatusInDb = async (taskId: string, newStatus: string) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { status: newStatus });
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={column}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: "8px",
                    }}
                  >
                    <Card title={task.name}>
                      {/* Render task details */}
                      <p>{task.description}</p>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
