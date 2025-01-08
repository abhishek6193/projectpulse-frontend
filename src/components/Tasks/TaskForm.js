import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  InputLabel,
  Autocomplete,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "styled-components";
import moment from "moment";

import ErrorModal from "../Layout/ErrorModal";
import CustomModal from "../Layout/CustomModal";
import Loader from "../Layout/Loader";

import { UserContext } from "../../context/user-context";

import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";

import { createTask, updateTask } from "../../store/taskSlice";

import { getUserInitials, stringToColor } from "../../utils";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";

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

const TaskFormContainer = styled.div`
  width: 80vw;
`;

const TaskForm = ({
  open,
  onClose,
  updateTasksList,
  task,
  setSelectedTask,
  taskTitle,
  projectId,
}) => {
  const { userId, token } = useContext(UserContext);
  const { users } = useSelector(({ user }) => user);
  const {
    values,
    handleChange,
    formErrors,
    clearFormErrors,
    clearFormData,
    setValues,
  } = useForm({
    title: taskTitle || "",
    description: "",
    status: "To-Do",
    assignedTo: userId,
  });

  const startDate = useRef(null);
  const dueDate = useRef(null);
  
  const handleStartDateChange = (date) => {
    startDate.current = date;
  };

  const handleDueDateChange = (date) => {
    dueDate.current = date;
  };

  useEffect(() => {
    return () => setSelectedTask(null);
  }, [setSelectedTask]);

  useEffect(() => {
    if (task) {
      setValues(task);
      startDate.current = moment(task.startDate)
      dueDate.current = moment(task.dueDate)
    } else {
      setValues({
        title: taskTitle || "",
        description: "",
        status: "To-Do",
        assignedTo: userId,
      });
      startDate.current = moment()
      dueDate.current = moment()
    }
  }, [setValues, task, taskTitle, userId]);

  const { sendRequest, error, isLoading, clearError } = useHttpClient();
  const dispatch = useDispatch();

  const taskFormCloseHandler = () => {
    onClose();
    clearFormErrors();
    !task ? clearFormData() : setValues(task);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      id: values.id || null,
      title: values.title,
      description: values.description,
      status: values.status,
      assignedTo: values.assignedTo,
      startDate: startDate.current,
      dueDate: dueDate.current,
      projectId,
    };
    const requestHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    task
      ? dispatch(updateTask({ sendRequest, requestBody, requestHeaders })).then(
          updateTasksList
        )
      : dispatch(createTask({ sendRequest, requestBody, requestHeaders })).then(
          updateTasksList
        );
    taskFormCloseHandler();
  };

  return (
    <CustomModal
      open={open}
      handleClose={taskFormCloseHandler}
      title={task ? "Edit Task" : "Create New Task"}
    >
      <TaskFormContainer>
        <form onSubmit={handleSubmit}>
          <ErrorModal error={error} handleClose={clearError} />
          {isLoading && <Loader />}
          <Box mb={2}>
            <TextField
              label="Task Name"
              type="text"
              fullWidth
              margin="normal"
              value={values.title}
              onChange={(e) => handleChange(e, [VALIDATOR_REQUIRE()])}
              name="title"
              error={formErrors.title?.length > 0}
              helperText={formErrors.title?.join("\n")}
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
              <MenuItem value="To-Do">To-Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>
          </Box>
          <Box mb={2}>
            <Autocomplete
              options={users || []}
              getOptionLabel={(option) => option.name}
              value={
                users?.find((user) => user.id === values.assignedTo) || {
                  id: values.assignedTo,
                  name: values.assignedTo,
                }
              }
              onChange={(e, newValue) =>
                handleChange({
                  target: {
                    name: "assignedTo",
                    value: newValue.id,
                  },
                })
              }
              renderOption={(props, option) => {
                const { key, ...restProps } = props; // Extract key and pass separately
                return (
                  <li key={key} {...restProps}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: stringToColor(option.name) }}>
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
                  label="Assignee"
                  name="assignedTo"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Start Date"
                value={
                  typeof startDate.current === "object"
                    ? startDate.current
                    : moment(startDate.current)
                }
                onChange={(date) => handleStartDateChange(date, "startDate")}
                slots={{
                  textField: (params) => <TextField {...params} fullWidth />,
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box mb={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Due Date"
                value={
                  typeof dueDate.current === "object"
                    ? dueDate.current
                    : moment(dueDate.current)
                }
                onChange={(date) => handleDueDateChange(date, "dueDate")}
                slots={{
                  textField: (params) => <TextField {...params} fullWidth />,
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                Object.entries(values).some(
                  ([key, value]) => key !== "tasks" && value.length === 0
                ) ||
                Object.values(formErrors).some((error) => error?.length > 0)
              }
            >
              {task ? "Update Task" : "Create Task"}
            </Button>
          </Box>
        </form>
      </TaskFormContainer>
    </CustomModal>
  );
};

export default TaskForm;
