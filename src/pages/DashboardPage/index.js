import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "../../components/Dashboard/Dashboard";
import ProjectsOverview from "../../components/User/ProjectsOverview";
import UpcomingTasks from "../../components/User/UpcomingTasks";
import Footer from "../../components/Layout/Footer";

import { useHttpClient } from "../../hooks/http-hook";
import { useTasksHook } from "../../hooks/tasks-hook";

import { fetchUsers } from "../../store/userSlice";
import { getUserProjects } from "../../store/projectSlice";

import { UserContext } from "../../context/user-context";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(({ user }) => user);
  const { userProjects } = useSelector(({ project }) => project);
  const { userTasks } = useSelector(({ task }) => task);

  const { userId, token } = useContext(UserContext);

  const { sendRequest } = useHttpClient();
  const { fetchUserTasks } = useTasksHook();

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(sendRequest));
      dispatch(
        getUserProjects({
          sendRequest,
          userId,
          requestHeaders: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
      );
      fetchUserTasks();
    }
  }, [sendRequest, userId, dispatch, token, fetchUserTasks]);

  const updateProjectsList = useCallback(async () => {
    dispatch(
      getUserProjects({
        sendRequest,
        userId,
        requestHeaders: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }, [dispatch, userId, token, sendRequest]);

  return (
    <>
      <Dashboard />
      <ProjectsOverview
        projects={userProjects}
        updateProjectsList={updateProjectsList}
        users={users}
      />
      <UpcomingTasks tasks={userTasks} />
      <Footer />
    </>
  );
};

export default DashboardPage;
