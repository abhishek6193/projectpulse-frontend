import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createNewTask,
  getTaskDetails,
  getTasksByProjectId,
  updateTaskDetails,
  getTasksByUserId
} from "../services/taskService";

import { handleMultipleAsyncThunks } from "../utils/reduxUtils";

const initialState = {};

export const createTask = createAsyncThunk(
  "task/createTask",
  async ({ sendRequest, requestBody, requestHeaders }, thunkAPI) => {
    try {
      const response = await createNewTask(
        sendRequest,
        requestBody,
        requestHeaders
      );
      return response.task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTaskDetailsById = createAsyncThunk(
  "task/getTaskDetailsById",
  async ({ sendRequest, taskId, requestHeaders }, thunkAPI) => {
    try {
      const response = await getTaskDetails(
        sendRequest,
        taskId,
        requestHeaders
      );
      return response.task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProjectTasks = createAsyncThunk(
  "task/getProjectTasks",
  async ({ sendRequest, projectId, requestHeaders }, thunkAPI) => {
    try {
      const response = await getTasksByProjectId(
        sendRequest,
        projectId,
        requestHeaders
      );
      return response.tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ sendRequest, requestBody, requestHeaders }, thunkAPI) => {
    try {
      const response = await updateTaskDetails(
        sendRequest,
        requestBody,
        requestHeaders
      );
      return response.task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserTasks = createAsyncThunk(
    "task/getUserTasks",
    async ({ sendRequest, userId, requestHeaders }, thunkAPI) => {
      try {
        const response = await getTasksByUserId(
          sendRequest,
          userId,
          requestHeaders
        );
        return response.tasks;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: (builder) => {
    handleMultipleAsyncThunks(builder, [
      {
        thunk: createTask,
        config: { name: "createTask", dataKey: "task" },
      },
      {
        thunk: getTaskDetailsById,
        config: { name: "getTaskDetailsById", dataKey: "taskDetails" },
      },
      {
        thunk: getProjectTasks,
        config: { name: "getProjectTasks", dataKey: "projectTasks" },
      },
      {
        thunk: updateTask,
        config: { name: "updateTask", dataKey: "updatedTask" },
      },
      {
        thunk: getUserTasks,
        config: { name: "getUserTasks", dataKey: "userTasks" },
      },
    ]);
  },
});

export default taskSlice.reducer;
