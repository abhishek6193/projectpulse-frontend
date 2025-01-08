import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";

import { UserContext } from "../context/user-context";

import { useHttpClient } from "./http-hook";

import { getUserTasks } from "../store/taskSlice";

export const useTasksHook = () => {
  const dispatch = useDispatch();

  const { sendRequest } = useHttpClient();
  const { userId, token } = useContext(UserContext);

  const fetchUserTasks = useCallback(async () => {
    dispatch(
      getUserTasks({
        sendRequest,
        userId,
        requestHeaders: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }, [dispatch, userId, token, sendRequest]);

  return { fetchUserTasks };
};
