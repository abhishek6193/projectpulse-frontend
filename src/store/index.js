import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import projectReducer from './projectSlice';
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    task: taskReducer
  },
});

export default store;
