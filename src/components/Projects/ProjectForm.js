import React, { useContext, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Button,
  MenuItem,
  Autocomplete,
  Chip,
  Box,
  InputLabel,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "styled-components";

import ErrorModal from "../Layout/ErrorModal";
import CustomModal from "../Layout/CustomModal";
import Loader from "../Layout/Loader";

import TaskList from "../Tasks/TaskList";
import CreateTaskButton from "../Tasks/CreateTaskButton";

import { UserContext } from "../../context/user-context";

import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { useTasksHook } from "../../hooks/tasks-hook";

import { createProject, updateProject } from "../../store/projectSlice";

import { getProjectTasks } from "../../store/taskSlice";

import { getUserInitials, stringToColor } from "../../utils";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MIN,
} from "../../utils/validators";

const FieldGroup = styled(Box)`
  margin-bottom: 16px;
`;

const FieldLabel = styled(InputLabel)`
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

// TextArea with Flexibility
const DescriptionTextField = styled(TextField)`
  & .MuiInputBase-root {
    overflow-y: scroll; /* Scroll when overflow */
    resize: none; /* Disable manual resizing */
    box-sizing: border-box;
  }
`;

const ProjectFormContainer = styled.div`
  width: 80vw;
  max-height: 80vh;
  overflow: scroll;
`;

const TaskHeader = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "light" ? "#f0f0f0" : "#fbf1f43b"};
`;

const ProjectForm = ({
  open,
  onClose,
  updateProjectsList,
  project,
  setSelectedProject,
}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const { userId, token } = useContext(UserContext);

  const { users } = useSelector(({ user }) => user);
  const { projectTasks } = useSelector(({ task }) => task);

  const { fetchUserTasks } = useTasksHook();

  const {
    values,
    handleChange,
    formErrors,
    clearFormErrors,
    clearFormData,
    setValues,
  } = useForm({
    name: "",
    description: "",
    status: "Not Started",
    members: [userId],
  });

  useEffect(() => {
    return () => setSelectedProject(null);
  }, [setSelectedProject]);

  useEffect(() => {
    if (project) {
      setValues(project);
    } else {
      setValues({
        name: "",
        description: "",
        status: "Not Started",
        members: [userId],
      });
    }
  }, [setValues, project, userId]);

  const { sendRequest, error, isLoading, clearError } = useHttpClient();
  const dispatch = useDispatch();

  const fetchProjectTasks = useCallback(async () => {
    dispatch(
      getProjectTasks({
        sendRequest,
        projectId: project.id,
        requestHeaders: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );
    fetchUserTasks();
  }, [dispatch, project, token, sendRequest, fetchUserTasks]);

  useEffect(() => {
    project && fetchProjectTasks();
  }, [project, fetchProjectTasks]);

  const formCloseHandler = () => {
    onClose();
    clearFormErrors();
    !project ? clearFormData() : setValues(project);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      id: values.id || null,
      name: values.name,
      description: values.description,
      members: values.members,
      status: values.status,
      tasks: values.tasks,
    };
    const requestHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    project
      ? dispatch(
          updateProject({ sendRequest, requestBody, requestHeaders })
        ).then(updateProjectsList)
      : dispatch(
          createProject({ sendRequest, requestBody, requestHeaders })
        ).then(updateProjectsList);
    formCloseHandler();
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <CustomModal
      open={open}
      handleClose={formCloseHandler}
      title={project ? "Edit Project" : "Create New Project"}
    >
      <ProjectFormContainer>
        <form>
          <ErrorModal error={error} handleClose={clearError} />
          {isLoading && <Loader />}
          <Box mb={2}>
            <TextField
              label="Project Name"
              type="text"
              fullWidth
              margin="normal"
              value={values.name}
              onChange={(e) => handleChange(e, [VALIDATOR_REQUIRE()])}
              name="name"
              error={formErrors.name?.length > 0}
              helperText={formErrors.name?.join("\n")}
            />
          </Box>
          <Box mb={2}>
            <FieldGroup>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <DescriptionTextField
                id="description"
                fullWidth
                margin="normal"
                multiline
                minRows={6}
                maxRows={15}
                value={values.description}
                onChange={(e) =>
                  handleChange(e, [
                    VALIDATOR_REQUIRE(),
                    VALIDATOR_MINLENGTH(10),
                  ])
                }
                name="description"
                error={formErrors.description?.length > 0}
                helperText={formErrors.description?.join("\n")}
              />
            </FieldGroup>
          </Box>
          <Box mb={2}>
            <TextField
              select
              label="Status"
              value={values.status}
              onChange={(e) => handleChange(e)}
              name="status"
              fullWidth
              margin="normal"
            >
              <MenuItem value="Not Started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
          </Box>
          <Box mb={2}>
            <Autocomplete
              multiple
              options={users || []}
              getOptionLabel={(option) => option.name}
              value={values.members.map(
                (memberId) =>
                  users?.find((user) => user.id === memberId) || {
                    id: memberId,
                    name: memberId,
                  }
              )}
              onChange={(event, newValue) =>
                handleChange(
                  {
                    target: {
                      name: "members",
                      value: newValue.map((user) => user.id),
                    },
                  },
                  [VALIDATOR_MIN(1)]
                )
              }
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index }); // Extract key and pass separately
                  return (
                    <Chip
                      variant="outlined"
                      label={option.name}
                      key={key}
                      {...tagProps}
                      color="primary"
                    />
                  );
                })
              }
              renderOption={(props, option) => {
                const { key, ...restProps } = props; // Extract key and pass separately
                return (
                  <li key={key} {...restProps}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: stringToColor(option.name),
                          color: "white",
                          fontSize: "1rem"
                        }}
                      >
                        {getUserInitials(option.name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={option.name} />
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Members"
                  placeholder="Add members"
                  error={formErrors.members?.length > 0}
                  helperText={formErrors.members?.join("\n")}
                />
              )}
              fullWidth
              margin="normal"
            />
          </Box>
          {project && projectTasks?.length > 0 ? (
            <Box mt={4}>
              <FieldLabel>Tasks</FieldLabel>
              <TaskHeader>
                <Typography
                  variant="body1"
                  style={{ flex: 1, fontWeight: "bold" }}
                >
                  Name
                </Typography>
                <Typography
                  variant="body1"
                  style={{ flex: 1, fontWeight: "bold" }}
                >
                  Status
                </Typography>
                <Typography
                  variant="body1"
                  style={{ flex: 1, fontWeight: "bold" }}
                >
                  Assignee
                </Typography>
              </TaskHeader>
              <TaskList
                tasks={projectTasks}
                onTaskClick={(taskDetails) => handleTaskClick(taskDetails)}
              />
            </Box>
          ) : (
            <></>
          )}
          {project ? (
            <CreateTaskButton
              projectId={project.id}
              updateTasksList={fetchProjectTasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />
          ) : (
            <></>
          )}
        </form>
      </ProjectFormContainer>
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          disabled={
            Object.entries(values).some(
              ([key, value]) => key !== "tasks" && value.length === 0
            ) || Object.values(formErrors).some((error) => error?.length > 0)
          }
          onClick={handleSubmit}
        >
          {project ? "Update Project" : "Create Project"}
        </Button>
      </Box>
    </CustomModal>
  );
};

export default ProjectForm;
