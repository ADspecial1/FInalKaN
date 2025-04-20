// import React, { useEffect, useState } from "react";
// import { Row, Col, Spin, Typography } from "antd";
// import TaskList from "./TaskList";
// import { db } from "../../firebase/firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";

// const { Title } = Typography;

// const KanbanBoardView: React.FC = () => {
//   const [tasksByColumn, setTasksByColumn] = useState<any>({});
//   const [loading, setLoading] = useState(true);

//   const columns = ["To Do", "In Progress", "In Review", "Done"];
//   const userId = "RwlMNV4yh5VPFAhN4Jp0CUCuWlL2"; // use your auth user id

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const newState: any = {};
//       try {
//         for (const col of columns) {
//           const q = query(
//             collection(db, col),
//             where("userId", "==", userId)
//           );
//           const snapshot = await getDocs(q);
//           const colTasks: any[] = [];
//           snapshot.forEach((doc) => {
//             colTasks.push({ id: doc.id, ...doc.data(), status: col });
//           });
//           newState[col] = colTasks;
//         }
//         setTasksByColumn(newState);
//       } catch (err) {
//         console.error("Error fetching Kanban tasks:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div style={{ padding: "16px" }}>
//       <Title level={4}>Kanban Board</Title>
//       {loading ? (
//         <Spin tip="Loading..." />
//       ) : (
//         <Row gutter={16}>
//           {columns.map((col) => (
//             <Col span={6} key={col}>
//               <Title level={5}>{col}</Title>
//               <TaskList tasks={tasksByColumn[col] || []} />
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// };

// export default KanbanBoardView;

// import React, { useEffect, useState } from "react";
// import { Row, Col, Spin, Typography } from "antd";
// import TaskList from "./TaskList"; // Assuming you have a TaskList component
// import { db } from "../../firebase/firebase";  // Firebase configuration
// import { collection, getDocs, query, where } from "firebase/firestore";

// const { Title } = Typography;

// const KanbanBoardView: React.FC = () => {
//   const [tasksByColumn, setTasksByColumn] = useState<any>({});
//   const [loading, setLoading] = useState(true);

//   // Column names (states for tasks)
//   const columns = ["To Do", "In Progress", "In Review", "Done"];

//   // Assume you have the logged-in user's ID
//   const userId = "RwlMNV4yh5VPFAhN4Jp0CUCuWlL2";  // Replace with actual auth user ID

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const newState: any = {};

//       try {
//         for (const col of columns) {
//           // Fetch tasks where userId matches the logged-in user's ID
//           const q = query(
//             collection(db, col), 
//             where("userId", "==", userId)  // Match tasks for the logged-in user only
//           );

//           const snapshot = await getDocs(q);
//           const colTasks: any[] = [];
          
//           // Loop through tasks in each column and add them to the state
//           snapshot.forEach((doc) => {
//             colTasks.push({ id: doc.id, ...doc.data(), status: col });
//           });

//           // Add the tasks of this column to the state
//           newState[col] = colTasks;
//         }

//         setTasksByColumn(newState);
//       } catch (err) {
//         console.error("Error fetching Kanban tasks:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, [userId]);  // Re-run effect if userId changes

//   return (
//     <div style={{ padding: "16px" }}>
//       <Title level={4}>Kanban Board</Title>
//       {loading ? (
//         <Spin tip="Loading..." />
//       ) : (
//         <Row gutter={16}>
//           {columns.map((col) => (
//             <Col span={6} key={col}>
//               <Title level={5}>{col}</Title>
//               {/* Render TaskList for each column */}
//               <TaskList 
//                 tasks={tasksByColumn[col] || []} 
//                 column={col} 
//                 userId={userId}  // Pass userId to the TaskList component to filter tasks
//               />
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// };


// export default KanbanBoardView;



// import React, { useEffect, useState } from "react";
// import { Row, Col, Spin, Typography } from "antd";
// import TaskList from "./TaskList";
// import { db } from "../../firebase/firebase";  // Firebase configuration
// import { collection, getDocs, query, where } from "firebase/firestore";

// const { Title } = Typography;

// const KanbanBoardView: React.FC = () => {
//   const [tasksByColumn, setTasksByColumn] = useState<any>({});
//   const [loading, setLoading] = useState(true);

//   // Column names (states for tasks)
//   const columns = ["To Do", "In Progress", "In Review", "Done"];

//   // Assume you have the logged-in user's ID
//   const userId = "RwlMNV4yh5VPFAhN4Jp0CUCuWlL2";  // Replace with actual auth user ID

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const newState: any = {};

//       try {
//         for (const col of columns) {
//           // Fetch tasks where assignedTo matches the logged-in user's ID
//           const q = query(
//             collection(db, col), 
//             where("assignedTo", "==", userId)  // Now checking assignedTo instead of userId
//           );

//           const snapshot = await getDocs(q);
//           const colTasks: any[] = [];
          
//           // Loop through tasks in each column and add them to the state
//           snapshot.forEach((doc) => {
//             colTasks.push({ id: doc.id, ...doc.data(), status: col });
//           });

//           // Add the tasks of this column to the state
//           newState[col] = colTasks;
//         }

//         setTasksByColumn(newState);
//       } catch (err) {
//         console.error("Error fetching Kanban tasks:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, [userId]);  // Re-run effect if userId changes

//   return (
//     <div style={{ padding: "16px" }}>
//       <Title level={4}>Kanban Board</Title>
//       {loading ? (
//         <Spin tip="Loading..." />
//       ) : (
//         <Row gutter={16}>
//           {columns.map((col) => (
//             <Col span={6} key={col}>
//               <Title level={5}>{col}</Title>
//               {/* Render TaskList for each column */}
//               <TaskList 
//                 tasks={tasksByColumn[col] || []} 
//                 column={col} 
//                 userId={userId}  // Pass userId to the TaskList component to filter tasks
//               />
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// };

// export default KanbanBoardView;


// import React, { useState, useEffect } from "react";
// import { Card, Col, Row } from "antd";
// import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
// import { db, auth } from '../../firebase/firebase'; // Import Firebase (adjust path as necessary)
// import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

// type Task = {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   dueDate: string;
//   assignedTo: string; // UID of assigned developer
//   assignedToName: string; // Developer's name
// };

// type Developer = {
//   uid: string;
//   username: string;
// };

// const categoryTitles: Record<string, string> = {
//   backlog: "Backlog",
//   todo: "To Do",
//   inprogress: "In Progress",
//   inreview: "In Review",
//   done: "Done",
// };
// const categories = Object.keys(categoryTitles);

// const KanbanBoardView: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [developers, setDevelopers] = useState<Developer[]>([]);
  
//   // Get current logged-in user (Firebase Authentication)
//   const currentUser = auth.currentUser;

//   // Fetch developers' data from Firebase (if needed)
//   useEffect(() => {
//     const fetchDevelopers = async () => {
//       // Replace this with your actual Firebase fetching logic
//       const devRef = collection(db, 'developers');
//       const devSnapshot = await getDocs(devRef);
//       const devList = devSnapshot.docs.map(doc => ({
//         uid: doc.id,
//         username: doc.data().username,
//       }));
//       setDevelopers(devList);
//     };

//     fetchDevelopers();
//   }, []);

//   // Fetch tasks assigned to the current logged-in user
//   useEffect(() => {
//     if (currentUser) {
//       const fetchTasks = async () => {
//         // Fetch tasks where the assignedTo matches the current user's ID
//         const taskRef = collection(db, 'tasks');
//         const q = query(taskRef, where("assignedTo", "==", currentUser.uid));
//         const taskSnapshot = await getDocs(q);
//         const taskList = taskSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         // Assign the developer name based on assignedTo field
//         const tasksWithDeveloperNames = taskList.map((task: Task) => {
//           const developer = developers.find(dev => dev.uid === task.assignedTo);
//           return {
//             ...task,
//             assignedToName: developer ? developer.username : "Unknown",
//           };
//         });

//         setTasks(tasksWithDeveloperNames);
//       };

//       fetchTasks();
//     }
//   }, [developers, currentUser]); // Re-fetch tasks whenever developers or currentUser changes

//   // Handle drag and drop (UI update and Firebase update)
//   const onDragEnd = async (result: DropResult) => {
//     const { source, destination, draggableId } = result;
//     if (!destination) return;

//     const updatedCategory = destination.droppableId;

//     // Find the task that was moved
//     const taskToUpdate = tasks.find(task => task.id === draggableId);

//     if (taskToUpdate) {
//       // Update the task's category in the state
//       const updatedTask = {
//         ...taskToUpdate,
//         category: updatedCategory,
//       };

//       // Update the category in Firebase database
//       const taskDocRef = doc(db, 'tasks', draggableId);
//       await updateDoc(taskDocRef, { category: updatedCategory });

//       // Update tasks in state
//       setTasks(prev => prev.map(task => 
//         task.id === draggableId ? updatedTask : task
//       ));
//     }
//   };

//   return (
//     <>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Row wrap={false} gutter={16} style={{ overflow: "auto", padding: 16 }}>
//           {categories.map((cat) => (
//             <Col key={cat} style={{ minWidth: 300 }}>
//               <Card
//                 title={
//                   <div style={{ display: "flex", justifyContent: "space-between" }}>
//                     <span>
//                       {categoryTitles[cat]} (
//                       {tasks.filter((t) => t.category === cat).length})
//                     </span>
//                   </div>
//                 }
//                 bordered={false}
//                 style={{
//                   background: "#fafafa",
//                   borderRadius: 8,
//                   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <Droppable droppableId={cat}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.droppableProps}
//                       style={{
//                         padding: 8,
//                         minHeight: 450,
//                         background: snapshot.isDraggingOver ? "#e6f7ff" : "#fff",
//                         borderRadius: 6,
//                         maxHeight: "calc(100vh - 200px)",
//                         overflowY: "auto",
//                       }}
//                     >
//                       {tasks
//                         .filter((t) => t.category === cat)
//                         .map((task, idx) => (
//                           <Draggable key={task.id} draggableId={task.id} index={idx}>
//                             {(prov, snap) => (
//                               <Card
//                                 size="small"
//                                 ref={prov.innerRef}
//                                 {...prov.draggableProps}
//                                 {...prov.dragHandleProps}
//                                 style={{
//                                   marginBottom: 8,
//                                   opacity: snap.isDragging ? 0.8 : 1,
//                                   ...prov.draggableProps.style,
//                                   boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
//                                 }}
//                               >
//                                 <strong>{task.title}</strong>
//                                 <div style={{ margin: "4px 0" }}>{task.description}</div>
//                                 <small>Due: {task.dueDate}</small>
//                                 <br />
//                                 <small>Assigned: {task.assignedToName}</small>
//                               </Card>
//                             )}
//                           </Draggable>
//                         ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </DragDropContext>
//     </>
//   );
// };

// export default KanbanBoardView;
// import React, { useState, useEffect } from "react";
// import { Card, Col, Row, message, Spin } from "antd";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "@hello-pangea/dnd";
// import { db, auth } from "../../firebase/firebase";
// import {
//   collection,
//   doc,
//   onSnapshot,
//   updateDoc,
//   query,
//   where,
//   serverTimestamp,
// } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// type Task = {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   dueDate: string;
//   assignedTo: string;
//   assignedToName: string;
// };

// const categoryTitles: Record<string, string> = {
//   backlog: "Backlog",
//   todo: "To Do",
//   inprogress: "In Progress",
//   inreview: "In Review",
//   done: "Done",
// };

// const categories = Object.keys(categoryTitles);

// const KanbanBoardView: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);

//   // Set up auth listener to get current user ID
//   useEffect(() => {
//     const unsubAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//         console.log("Current user ID:", user.uid);
//       } else {
//         setUserId(null);
//         setTasks([]);
//         console.warn("No user logged in");
//       }
//       setLoading(false);
//     });

//     return () => unsubAuth();
//   }, []);

//   // Set up tasks listener once we have a user ID
//   useEffect(() => {
//     if (!userId) return;

//     setLoading(true);
//     console.log("Setting up task listener for user:", userId);

//     // Create a query for tasks assigned to the current user
//     const tasksQuery = query(
//       collection(db, "tasks"),
//       where("assignedTo", "==", userId)
//     );

//     // Set up real-time listener
//     const unsubscribeTasks = onSnapshot(
//       tasksQuery,
//       (snapshot) => {
//         const fetchedTasks = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Task[];

//         console.log("Fetched tasks:", fetchedTasks);
//         setTasks(fetchedTasks);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error fetching tasks:", error);
//         message.error("Failed to load tasks");
//         setLoading(false);
//       }
//     );

//     return () => unsubscribeTasks();
//   }, [userId]);

//   const onDragEnd = async (result: DropResult) => {
//     const { source, destination, draggableId } = result;

//     // If no destination or same position, do nothing
//     if (
//       !destination ||
//       (source.droppableId === destination.droppableId &&
//         source.index === destination.index)
//     ) {
//       return;
//     }

//     // Set task as updating
//     setUpdatingTaskId(draggableId);

//     const taskToUpdate = tasks.find((task) => task.id === draggableId);
//     if (!taskToUpdate) {
//       console.error("Task not found:", draggableId);
//       return;
//     }

//     const newCategory = destination.droppableId;
//     console.log(`Moving task ${draggableId} from ${source.droppableId} to ${newCategory}`);

//     try {
//       // Update in Firestore with transaction timestamp
//       const taskRef = doc(db, "tasks", draggableId);
//       await updateDoc(taskRef, {
//         category: newCategory,
//         lastUpdated: serverTimestamp() // Add server timestamp to ensure the update is processed
//       });

//       console.log(`Task ${draggableId} updated successfully in Firestore`);
      
//       // Note: We don't need to update local state manually since the onSnapshot will trigger
//       // and update the state automatically when the Firestore change propagates

//     } catch (error) {
//       console.error("Error updating task:", error);
//       message.error("Failed to update task category. Please try again.");
      
//       // Manually update UI back to original position since onSnapshot might be delayed
//       setTasks(currentTasks => 
//         currentTasks.map(task => 
//           task.id === draggableId 
//             ? {...task, category: source.droppableId} 
//             : task
//         )
//       );
//     } finally {
//       setUpdatingTaskId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <Spin size="large" tip="Loading tasks..." />
//       </div>
//     );
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Row wrap={false} gutter={16} style={{ overflowX: "auto", padding: 16 }}>
//         {categories.map((cat) => (
//           <Col key={cat} style={{ minWidth: 300 }}>
//             <Card
//               title={`${categoryTitles[cat]} (${
//                 tasks.filter((t) => t.category === cat).length
//               })`}
//               bordered={false}
//               style={{
//                 background: "#fafafa",
//                 borderRadius: 8,
//                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <Droppable droppableId={cat}>
//                 {(provided, snapshot) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     style={{
//                       padding: 8,
//                       minHeight: 450,
//                       background: snapshot.isDraggingOver ? "#e6f7ff" : "#fff",
//                       borderRadius: 6,
//                       maxHeight: "calc(100vh - 200px)",
//                       overflowY: "auto",
//                     }}
//                   >
//                     {tasks
//                       .filter((t) => t.category === cat)
//                       .map((task, idx) => (
//                         <Draggable
//                           key={task.id}
//                           draggableId={task.id}
//                           index={idx}
//                           isDragDisabled={updatingTaskId === task.id}
//                         >
//                           {(prov, snap) => (
//                             <Card
//                               size="small"
//                               ref={prov.innerRef}
//                               {...prov.draggableProps}
//                               {...prov.dragHandleProps}
//                               style={{
//                                 marginBottom: 8,
//                                 opacity: updatingTaskId === task.id ? 0.6 : snap.isDragging ? 0.8 : 1,
//                                 ...prov.draggableProps.style,
//                                 boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
//                                 position: "relative",
//                               }}
//                             >
//                               {updatingTaskId === task.id && (
//                                 <div style={{ 
//                                   position: "absolute", 
//                                   top: 0, 
//                                   left: 0, 
//                                   right: 0, 
//                                   bottom: 0, 
//                                   display: "flex", 
//                                   justifyContent: "center", 
//                                   alignItems: "center", 
//                                   backgroundColor: "rgba(255, 255, 255, 0.7)" 
//                                 }}>
//                                   <Spin size="small" />
//                                 </div>
//                               )}
//                               <strong>{task.title}</strong>
//                               <div style={{ margin: "4px 0" }}>{task.description}</div>
//                               <small>Due: {task.dueDate}</small>
//                               <br />
//                               <small>Assigned: {task.assignedToName}</small>
//                             </Card>
//                           )}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </DragDropContext>
//   );
// };

// export default KanbanBoardView;

import React, { useState, useEffect } from "react";
import { Card, Col, Row, message, Spin, Empty } from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { db, auth } from "../../firebase/firebase";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  assignedTo: string;
  assignedToName: string;
};

const categoryTitles: Record<string, string> = {
  backlog: "Backlog",
  todo: "To Do",
  inprogress: "In Progress",
  inreview: "In Review",
  done: "Done",
};

const categories = Object.keys(categoryTitles);

const KanbanBoardView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Set up auth listener
  useEffect(() => {
    console.log("Setting up auth listener");
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log("Current user ID:", user.uid);
      } else {
        setUserId(null);
        setTasks([]);
        console.warn("No user logged in");
      }
    });

    return () => unsubAuth();
  }, []);

  // Set up real-time tasks listener once we have a user ID
  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    console.log("Setting up task listener for user:", userId);

    // Create a query for tasks assigned to the current user
    const tasksQuery = query(
      collection(db, "tasks"),
      where("assignedTo", "==", userId)
    );

    // Set up real-time listener with onSnapshot
    const unsubscribeTasks = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const fetchedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];

        console.log("Fetched tasks for developer:", fetchedTasks);
        setTasks(fetchedTasks);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching tasks:", error);
        message.error("Failed to load tasks");
        setLoading(false);
      }
    );

    return () => {
      console.log("Cleaning up task listener");
      unsubscribeTasks();
    };
  }, [userId]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // If no destination or same position, do nothing
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    // Set task as updating
    setUpdatingTaskId(draggableId);

    const taskToUpdate = tasks.find((task) => task.id === draggableId);
    if (!taskToUpdate) {
      console.error("Task not found:", draggableId);
      setUpdatingTaskId(null);
      return;
    }

    const newCategory = destination.droppableId;
    console.log(`Moving task ${draggableId} from ${source.droppableId} to ${newCategory}`);

    try {
      // Update in Firestore with transaction timestamp
      const taskRef = doc(db, "tasks", draggableId);
      await updateDoc(taskRef, {
        category: newCategory,
        lastUpdated: serverTimestamp()
      });

      console.log(`Task ${draggableId} updated successfully in Firestore`);
      message.success("Task moved successfully");
      
      // No need to manually update state as onSnapshot will handle it
    } catch (error) {
      console.error("Error updating task:", error);
      message.error("Failed to update task category. Please try again.");
    } finally {
      setUpdatingTaskId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" tip="Loading your tasks..." />
      </div>
    );
  }

  // Check if there are any tasks assigned to this developer
  if (tasks.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Empty description="No tasks assigned to you yet" />
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: 16 }}>
        <h1>My Tasks</h1>
        <Row wrap={false} gutter={16} style={{ overflowX: "auto" }}>
          {categories.map((cat) => {
            const categoryTasks = tasks.filter((t) => t.category === cat);
            return (
              <Col key={cat} style={{ minWidth: 300 }}>
                <Card
                  title={`${categoryTitles[cat]} (${categoryTasks.length})`}
                  bordered={false}
                  style={{
                    background: "#fafafa",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Droppable droppableId={cat}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          padding: 8,
                          minHeight: 450,
                          background: snapshot.isDraggingOver ? "#e6f7ff" : "#fff",
                          borderRadius: 6,
                          maxHeight: "calc(100vh - 200px)",
                          overflowY: "auto",
                        }}
                      >
                        {categoryTasks.length > 0 ? (
                          categoryTasks.map((task, idx) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={idx}
                              isDragDisabled={updatingTaskId === task.id}
                            >
                              {(prov, snap) => (
                                <Card
                                  size="small"
                                  ref={prov.innerRef}
                                  {...prov.draggableProps}
                                  {...prov.dragHandleProps}
                                  style={{
                                    marginBottom: 8,
                                    opacity: updatingTaskId === task.id ? 0.6 : snap.isDragging ? 0.8 : 1,
                                    ...prov.draggableProps.style,
                                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                                    position: "relative",
                                  }}
                                >
                                  {updatingTaskId === task.id && (
                                    <div style={{ 
                                      position: "absolute", 
                                      top: 0, 
                                      left: 0, 
                                      right: 0, 
                                      bottom: 0, 
                                      display: "flex", 
                                      justifyContent: "center", 
                                      alignItems: "center", 
                                      backgroundColor: "rgba(255, 255, 255, 0.7)" 
                                    }}>
                                      <Spin size="small" />
                                    </div>
                                  )}
                                  <strong>{task.title}</strong>
                                  <div style={{ margin: "4px 0" }}>{task.description}</div>
                                  <small>Due: {task.dueDate}</small>
                                  <br />
                                  <small>Assigned to me</small>
                                </Card>
                              )}
                            </Draggable>
                          ))
                        ) : (
                          <Empty description="No tasks in this category" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoardView;