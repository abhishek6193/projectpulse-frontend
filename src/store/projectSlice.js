import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createNewProject,
  getProjectsByUserId,
  updateProjectDetails
} from "../services/projectService";

import { handleMultipleAsyncThunks } from "../utils/reduxUtils";

const initialState = {};

export const createProject = createAsyncThunk(
  "project/createProject",
  async ({ sendRequest, requestBody, requestHeaders }, thunkAPI) => {
    try {
      const response = await createNewProject(
        sendRequest,
        requestBody,
        requestHeaders
      );
      return response.project;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserProjects = createAsyncThunk(
  "project/getUserProjects",
  async ({ sendRequest, userId, requestHeaders }, thunkAPI) => {
    try {
      const response = await getProjectsByUserId(
        sendRequest,
        userId,
        requestHeaders
      );
      return response.projects;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ sendRequest, requestBody, requestHeaders }, thunkAPI) => {
    try {
      const response = await updateProjectDetails(
        sendRequest,
        requestBody,
        requestHeaders
      );
      return response.project;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  extraReducers: (builder) => {
    handleMultipleAsyncThunks(builder, [
      {
        thunk: createProject,
        config: { name: "createProject", dataKey: "project" },
      },
      {
        thunk: getUserProjects,
        config: { name: "getUserProjects", dataKey: "userProjects" },
      },
      {
        thunk: updateProject,
        config: { name: "updateProject", dataKey: "updatedProject" },
      },
    ]);
  },
});

export default projectSlice.reducer;
