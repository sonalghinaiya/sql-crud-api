import React from "react";
import TaskForm from "../../../components/TaskForm";
import { useParams } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  return <TaskForm taskId={id} />;
}

export default EditTask;
