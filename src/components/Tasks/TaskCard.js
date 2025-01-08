import React from "react";
import { Grid, ListItemText, Paper } from "@mui/material";
import styled from "styled-components";

import { useSelector } from "react-redux";

const TaskPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const TaskCard = ({ task, onTaskClick }) => {
  const { users } = useSelector(({ user }) => user);

  return (
    task && (
      <TaskPaper elevation={3} onClick={() => onTaskClick(task)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <ListItemText primary={task.title} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ListItemText primary={task.status} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ListItemText
              primary={
                users?.find((user) => user.id === task.assignedTo)?.name
              }
            />
          </Grid>
        </Grid>
      </TaskPaper>
    )
  );
};

export default TaskCard;
