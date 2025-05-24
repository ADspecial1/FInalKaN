// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Col,
//   Row,
//   Button,
//   Modal,
//   Form,
//   Input,
//   Select,
//   DatePicker,
//   message,
// } from "antd";
// import {
//   PlusOutlined,
//   ExclamationCircleOutlined,
//   EditOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// import { v4 as uuidv4 } from "uuid";
// import dayjs from "dayjs";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "@hello-pangea/dnd";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "../../firebase/firebase";
// import { auth } from "../../firebase/firebase";

// type Task = {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   dueDate: string;
//   assignedTo: string;
//   assignedToName: string;
//   createdBy: string;
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

// const KanbanBoard: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [developers, setDevelopers] = useState<Developer[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [currentCategory, setCurrentCategory] = useState<string>("");
//   const [form] = Form.useForm();

//   const userId = auth.currentUser?.uid;

//   // Fetch developers
//   useEffect(() => {
//     const fetchDevelopers = async () => {
//       try {
//         const q = query(
//           collection(db, "users"),
//           where("role", "==", "developer")
//         );
//         const snap = await getDocs(q);
//         const devs: Developer[] = snap.docs.map((d) => ({
//           uid: d.id,
//           username: d.data().username as string,
//         }));
//         setDevelopers(devs);
//       } catch (error) {
//         message.error("Failed to load developers");
//         console.error(error);
//       }
//     };
//     fetchDevelopers();
//   }, []);

//   // Fetch tasks based on userId
//   useEffect(() => {
//     if (!userId) return;
//     const fetchTasks = async () => {
//       try {
//         const q = query(
//           collection(db, "tasks"),
//           where("createdBy", "==", userId)
//         );
//         const snap = await getDocs(q);
//         const taskList: Task[] = snap.docs.map((doc) => ({
//           ...(doc.data() as Task),
//           id: doc.id, // <-- Store Firestore's document ID here
//         }));
//         setTasks(taskList);
//       } catch (error) {
//         message.error("Failed to load tasks");
//         console.error(error);
//       }
//     };
//     fetchTasks();
//   }, [userId]);

//   // Show modal to add/edit task
//   const showModal = (category: string, task?: Task) => {
//     setCurrentCategory(category);
//     setEditingTask(task || null);
//     if (task) {
//       form.setFieldsValue({
//         ...task,
//         dueDate: dayjs(task.dueDate),
//         assignedTo: task.assignedTo,
//       });
//     } else {
//       form.resetFields();
//       form.setFieldsValue({ dueDate: dayjs() });
//     }
//     setIsModalVisible(true);
//   };

//   // Handle save or update task
//   const handleOk = async () => {
//     try {
//       const values = await form.validateFields();
//       const dev = developers.find((d) => d.uid === values.assignedTo);
//       const payload: Omit<Task, "id"> & { id?: string } = {
//         title: values.title,
//         description: values.description,
//         category: currentCategory,
//         dueDate: values.dueDate.format("YYYY-MM-DD"),
//         assignedTo: values.assignedTo,
//         assignedToName: dev?.username || "Unknown",
//         createdBy: userId || "",
//       };

//       if (editingTask) {
//         // Update task in Firestore
//         await updateDoc(doc(db, "tasks", editingTask.id), payload as any);
//         // Update task locally
//         setTasks((prev) =>
//           prev.map((t) => (t.id === editingTask.id ? { ...t, ...payload } : t))
//         );
//       } else {
//         // Add new task in Firestore
//         const docRef = await addDoc(collection(db, "tasks"), payload);
//         const newTask = { ...(payload as Task), id: docRef.id };
//         setTasks((prev) => [...prev, newTask]);
//       }

//       setIsModalVisible(false);
//       setEditingTask(null);
//     } catch (e) {
//       message.error("Failed to save task");
//       console.error(e);
//     }
//   };

//   // Handle delete task
//   // Handle delete task (fixed and improved)
//   // Handle delete task (corrected)
//   const handleDelete = async (id: string) => {
//     Modal.confirm({
//       title: "Are you sure you want to delete this task?",
//       icon: <ExclamationCircleOutlined />,
//       okText: "Yes",
//       okType: "danger",
//       cancelText: "No",
//       async onOk() {
//         try {
//           // Delete task from Firestore
//           const taskRef = doc(db, "tasks", id);
//           await deleteDoc(taskRef);

//           // Optimistic UI update: Remove task from local state
//           setTasks((prev) => prev.filter((task) => task.id !== id));

//           // Display success message
//           message.success("Task deleted successfully");
//         } catch (error) {
//           console.error("Failed to delete task:", error);
//           message.error("Failed to delete task");
//         }
//       },
//     });
//   };

//   // Handle drag and drop (update category in Firestore)
//   const onDragEnd = (result: DropResult) => {
//     const { source, destination, draggableId } = result;
//     if (!destination) return;
//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     )
//       return;

//     setTasks((prev) =>
//       prev.map((t) =>
//         t.id === draggableId ? { ...t, category: destination.droppableId } : t
//       )
//     );

//     updateDoc(doc(db, "tasks", draggableId), {
//       category: destination.droppableId,
//     }).catch(console.error);
//   };

//   return (
//     <>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Row wrap={false} gutter={16} style={{ overflow: "auto", padding: 16 }}>
//           {categories.map((cat) => (
//             <Col key={cat} style={{ minWidth: 300 }}>
//               <Card
//                 title={
//                   <div
//                     style={{ display: "flex", justifyContent: "space-between" }}
//                   >
//                     <span>
//                       {categoryTitles[cat]} (
//                       {tasks.filter((t) => t.category === cat).length})
//                     </span>
//                     <Button
//                       type="text"
//                       icon={<PlusOutlined />}
//                       onClick={() => showModal(cat)}
//                     />
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
//                         background: snapshot.isDraggingOver
//                           ? "#e6f7ff"
//                           : "#fff",
//                         borderRadius: 6,
//                         maxHeight: "calc(100vh - 200px)",
//                         overflowY: "auto",
//                       }}
//                     >
//                       {tasks
//                         .filter((t) => t.category === cat)
//                         .map((task, idx) => (
//                           <Draggable
//                             key={task.id}
//                             draggableId={task.id}
//                             index={idx}
//                           >
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
//                                 actions={[
//                                   <EditOutlined
//                                     key="edit"
//                                     onClick={() => showModal(cat, task)}
//                                   />,
//                                   <DeleteOutlined
//                                     key="delete"
//                                     style={{ color: "red" }}
//                                     onClick={() => {
//                                       console.log(
//                                         "Trying to delete task with ID:",
//                                         task.id
//                                       );
//                                       handleDelete(task.id);
//                                     }}
//                                   />,
//                                 ]}
//                               >
//                                 <strong>{task.title}</strong>
//                                 <div style={{ margin: "4px 0" }}>
//                                   {task.description}
//                                 </div>
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

//       <Modal
//         title={editingTask ? "Edit Task" : "New Task"}
//         open={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         onOk={handleOk}
//         okText={editingTask ? "Update" : "Create"}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="title"
//             label="Title"
//             rules={[{ required: true, message: "Enter title" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[{ required: true, message: "Enter description" }]}
//           >
//             <Input.TextArea rows={3} />
//           </Form.Item>
//           <Form.Item
//             name="assignedTo"
//             label="Assigned To"
//             rules={[{ required: true, message: "Select developer" }]}
//           >
//             <Select>
//               {developers.map((dev) => (
//                 <Select.Option key={dev.uid} value={dev.uid}>
//                   {dev.username}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item name="dueDate" label="Due Date">
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default KanbanBoard;

import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Tag,
  Avatar,
  Tooltip,
  Empty,
  Spin,
} from "antd";
import {
  PlusOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  assignedTo: string;
  assignedToName: string;
  createdBy: string;
};

type Developer = {
  uid: string;
  username: string;
};

// Improved category titles with emoji indicators
const categoryTitles: Record<string, { name: string; color: string }> = {
  backlog: { name: "Backlog", color: "#8c8c8c" },
  todo: { name: "To Do", color: "#1890ff" },
  inprogress: { name: "In Progress", color: "#ffa940" },
  inreview: { name: "In Review", color: "#722ed1" },
  done: { name: "Done", color: "#52c41a" },
};
const categories = Object.keys(categoryTitles);

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [form] = Form.useForm();

  const userId = auth.currentUser?.uid;

  // Fetch developers
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("role", "==", "developer")
        );
        const snap = await getDocs(q);
        const devs: Developer[] = snap.docs.map((d) => ({
          uid: d.id,
          username: d.data().username as string,
        }));
        setDevelopers(devs);
      } catch (error) {
        message.error("Failed to load developers");
        console.error(error);
      }
    };
    fetchDevelopers();
  }, []);

  // Fetch tasks based on userId
  useEffect(() => {
    if (!userId) return;
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "tasks"),
          where("createdBy", "==", userId)
        );
        const snap = await getDocs(q);
        const taskList: Task[] = snap.docs.map((docSnapshot) => ({
          ...(docSnapshot.data() as Omit<Task, "id">),
          id: docSnapshot.id,
        }));
        setTasks(taskList);
      } catch (error) {
        message.error("Failed to load tasks");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [userId]);

  // Show modal to add/edit task
  const showModal = (category: string, task?: Task) => {
    setCurrentCategory(category);
    setEditingTask(task || null);
    if (task) {
      form.setFieldsValue({
        ...task,
        dueDate: dayjs(task.dueDate),
        assignedTo: task.assignedTo,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        dueDate: dayjs(),
        category,
      });
    }
    setIsModalVisible(true);
  };

  // Handle save or update task
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const dev = developers.find((d) => d.uid === values.assignedTo);
      const payload = {
        title: values.title,
        description: values.description,
        category: currentCategory,
        dueDate: values.dueDate.format("YYYY-MM-DD"),
        assignedTo: values.assignedTo,
        assignedToName: dev?.username || "Unknown",
        createdBy: userId || "",
      };

      if (editingTask) {
        // Update task in Firestore
        const taskRef = doc(db, "tasks", editingTask.id);
        await updateDoc(taskRef, payload);

        // Update task locally
        setTasks((prev) =>
          prev.map((t) =>
            t.id === editingTask.id
              ? { ...t, ...payload, id: editingTask.id }
              : t
          )
        );
        message.success("Task updated successfully");
      } else {
        // Add new task in Firestore
        const docRef = await addDoc(collection(db, "tasks"), payload);
        const newTask = { ...payload, id: docRef.id } as Task;
        setTasks((prev) => [...prev, newTask]);
        message.success("Task created successfully");
      }

      setIsModalVisible(false);
      setEditingTask(null);
    } catch (e) {
      message.error("Failed to save task");
      console.error(e);
    }
  };

  const handleDelete = (taskId: string) => {
    if (!taskId) {
      console.error("No task ID provided for deletion");
      return;
    }
  
    Modal.confirm({
      title: "Delete Task",
      content: "Are you sure you want to delete this task?",
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const taskRef = doc(db, "tasks", taskId);
  
          console.log("Deleting task with ID:", taskId);
  
          await deleteDoc(taskRef);
  
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  
          message.success("Task deleted successfully");
        } catch (error) {
          console.error("Error deleting task:", error);
          message.error("Failed to delete task");
        }
      },
    });
  };
  

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Update local state
    setTasks((prev) =>
      prev.map((t) =>
        t.id === draggableId ? { ...t, category: destination.droppableId } : t
      )
    );

    // Update Firestore
    const taskRef = doc(db, "tasks", draggableId);
    updateDoc(taskRef, {
      category: destination.droppableId,
    }).catch((error) => {
      console.error("Error updating task category:", error);
      message.error("Failed to update task category");
    });
  };

  // Get relative date display
  const getDateDisplay = (dateStr: string) => {
    const today = dayjs();
    const dueDate = dayjs(dateStr);
    const diffDays = dueDate.diff(today, "day");

    if (diffDays < 0) {
      return <Tag color="red">Overdue by {Math.abs(diffDays)} days</Tag>;
    } else if (diffDays === 0) {
      return <Tag color="orange">Due today</Tag>;
    } else if (diffDays <= 3) {
      return <Tag color="gold">Due in {diffDays} days</Tag>;
    } else {
      return <Tag color="green">Due in {diffDays} days</Tag>;
    }
  };

  // Get initial for avatar
  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "16px" }}>Loading tasks...</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ padding: "16px 0" }}>
            <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
              Project Task Board
            </h1>
          </div>
          <Row
            wrap={false}
            gutter={16}
            style={{ overflow: "auto", padding: 16 }}
          >
            {categories.map((cat) => (
              <Col key={cat} style={{ minWidth: 300 }}>
                <Card
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Tag
                          color={categoryTitles[cat].color}
                          style={{ marginRight: 8 }}
                        />
                        <span>
                          {categoryTitles[cat].name} (
                          {tasks.filter((t) => t.category === cat).length})
                        </span>
                      </div>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={() => showModal(cat)}
                        size="small"
                      />
                    </div>
                  }
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
                          background: snapshot.isDraggingOver
                            ? "#e6f7ff"
                            : "#fff",
                          borderRadius: 6,
                          maxHeight: "calc(100vh - 200px)",
                          overflowY: "auto",
                        }}
                      >
                        {tasks.filter((t) => t.category === cat).length ===
                        0 ? (
                          <Empty
                            description="No tasks yet"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            style={{ margin: "40px 0" }}
                          />
                        ) : (
                          tasks
                            .filter((t) => t.category === cat)
                            .map((task, idx) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={idx}
                              >
                                {(prov, snap) => (
                                  <Card
                                    size="small"
                                    ref={prov.innerRef}
                                    {...prov.draggableProps}
                                    {...prov.dragHandleProps}
                                    style={{
                                      marginBottom: 12,
                                      opacity: snap.isDragging ? 0.8 : 1,
                                      ...prov.draggableProps.style,
                                      boxShadow:
                                        "0 2px 6px rgba(0, 0, 0, 0.15)",
                                      borderLeft: `4px solid ${categoryTitles[cat].color}`,
                                    }}
                                    actions={[
                                      <Tooltip title="Edit Task" key="edit">
                                        <EditOutlined
                                          onClick={() => showModal(cat, task)}
                                        />
                                      </Tooltip>,
                                      <Tooltip title="Delete Task" key="delete">
                                        <DeleteOutlined
                                          style={{ color: "red" }}
                                          onClick={() => handleDelete(task.id)} // Pass the correct task ID
                                        />
                                      </Tooltip>,
                                    ]}
                                  >
                                    <div style={{ marginBottom: 10 }}>
                                      <strong style={{ fontSize: "16px" }}>
                                        {task.title}
                                      </strong>
                                    </div>

                                    <div
                                      style={{
                                        margin: "10px 0",
                                        color: "#595959",
                                      }}
                                    >
                                      {task.description}
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 12,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <CalendarOutlined
                                          style={{
                                            marginRight: 5,
                                            color: "#1890ff",
                                          }}
                                        />
                                        {getDateDisplay(task.dueDate)}
                                      </div>

                                      <Tooltip title={task.assignedToName}>
                                        <Avatar
                                          size="small"
                                          style={{ backgroundColor: "#1890ff" }}
                                        >
                                          {getInitial(task.assignedToName)}
                                        </Avatar>
                                      </Tooltip>
                                    </div>
                                  </Card>
                                )}
                              </Draggable>
                            ))
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card>
              </Col>
            ))}
          </Row>
        </DragDropContext>
      )}

      <Modal
        title={
          <div>
            <span>{editingTask ? "Edit Task" : "New Task"}</span>
            <Tooltip title="Enter task details and assign to a team member">
              <InfoCircleOutlined style={{ marginLeft: 8, color: "#1890ff" }} />
            </Tooltip>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleOk}
        okText={editingTask ? "Update" : "Create"}
        okButtonProps={{ style: { backgroundColor: "#1890ff" } }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Describe what needs to be done"
            />
          </Form.Item>
          <Form.Item
            name="assignedTo"
            label="Assigned To"
            rules={[{ required: true, message: "Please select a developer" }]}
          >
            <Select placeholder="Select team member">
              {developers.map((dev) => (
                <Select.Option key={dev.uid} value={dev.uid}>
                  {dev.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select a due date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default KanbanBoard;

