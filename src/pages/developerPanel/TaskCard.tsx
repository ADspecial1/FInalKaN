import React from "react";
import { Card, Tag } from "antd";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status: string;
  };
}

const getColor = (status: string) => {
  switch (status) {
    case "To Do":
      return "blue";
    case "In Progress":
      return "orange";
    case "In Review":
      return "purple";
    case "Done":
      return "green";
    default:
      return "default";
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card
      title={task.title}
      extra={<Tag color={getColor(task.status)}>{task.status}</Tag>}
      style={{ borderRadius: 12 }}
    >
      <p>{task.description || "No description provided."}</p>
    </Card>
  );
};

export default TaskCard;
