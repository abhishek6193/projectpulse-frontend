import React, { useState } from "react";
import styled from "styled-components";
import {
  Container,
  Typography,
  List,
  Paper,
  ListItemText,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

import TaskForm from "../Tasks/TaskForm";

import { useTasksHook } from "../../hooks/tasks-hook";

const TasksContainer = styled(Container)`
  padding: 50px 0;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const TaskHeader = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "light" ? "#f0f0f0" : "#fbf1f43b"};
`;

const TaskPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const UpcomingTasks = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const { fetchUserTasks } = useTasksHook();
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  const handleTaskClose = () => {
    setSelectedTask(null);
  };
  return tasks?.length > 0 ? (
    <TasksContainer>
      <Title>Upcoming Tasks</Title>
      <TaskForm
        open={!!selectedTask}
        onClose={handleTaskClose}
        updateTasksList={fetchUserTasks}
        projectId={selectedTask?.project}
        task={selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <>
        <TaskHeader>
          <Typography variant="body1" style={{ flex: 1, fontWeight: "bold" }}>
            Name
          </Typography>
          <Typography variant="body1" style={{ flex: 1, fontWeight: "bold" }}>
            Status
          </Typography>
          <Typography variant="body1" style={{ flex: 1, fontWeight: "bold" }}>
            Due Date
          </Typography>
        </TaskHeader>
        <List>
          {tasks.map((task) => (
            <Grid container spacing={2} key={task.id}>
              <Grid item xs={12}>
                <TaskPaper elevation={3} onClick={() => handleTaskClick(task)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <ListItemText primary={task.title} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <ListItemText primary={task.status} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <ListItemText
                        primary={moment(task.dueDate).format("DD-MM-YYYY")}
                      />
                    </Grid>
                  </Grid>
                </TaskPaper>
              </Grid>
            </Grid>
          ))}
        </List>
      </>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          component={Link}
          to="/tasks"
          variant="contained"
          color="primary"
        >
          View All Tasks
        </Button>
      </Box>
    </TasksContainer>
  ) : (
    <></>
  );
};

export default UpcomingTasks;
