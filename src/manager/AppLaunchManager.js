import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useHttpClient } from "../hooks/http-hook";
import { useAuth } from "../hooks/auth-hook";

import { fetchUserData } from "../store/userSlice";

const AppLaunchManager = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const { token, userId } = useAuth();
  useEffect(() => {
    token && dispatch(fetchUserData({ sendRequest, userId }));
  }, [sendRequest, userId, dispatch, token]);

  return null;
};

export default AppLaunchManager;
