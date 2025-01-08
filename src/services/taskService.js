import APIS from "../apis";

const { CREATE_NEW_TASK, TASK_DETAILS, PROJECT_TASKS, USER_TASKS } = APIS;

export const createNewTask = async (
  sendRequest,
  requestBody,
  requestHeaders
) => {
  try {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_PROJECT_PULSE_BACKEND_URL}${CREATE_NEW_TASK.route}`,
      "POST",
      JSON.stringify(requestBody),
      requestHeaders
    );
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getTaskDetails = async (sendRequest, taskId, requestHeaders) => {
  const apiRoute = TASK_DETAILS.route.replace("$taskId", taskId);
  try {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_PROJECT_PULSE_BACKEND_URL}${apiRoute}`,
      "GET",
      undefined,
      requestHeaders
    );
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getTasksByProjectId = async (
  sendRequest,
  projectId,
  requestHeaders
) => {
  const apiRoute = PROJECT_TASKS.route.replace("$projectId", projectId);
  try {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_PROJECT_PULSE_BACKEND_URL}${apiRoute}`,
      "GET",
      undefined,
      requestHeaders
    );
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const updateTaskDetails = async (
  sendRequest,
  requestBody,
  requestHeaders
) => {
  const apiRoute = TASK_DETAILS.route.replace("$taskId", requestBody.id);
  try {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_PROJECT_PULSE_BACKEND_URL}${apiRoute}`,
      "PATCH",
      JSON.stringify(requestBody),
      requestHeaders
    );
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getTasksByUserId = async (sendRequest, userId, requestHeaders) => {
  const apiRoute = USER_TASKS.route.replace("$userId", userId);
  try {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_PROJECT_PULSE_BACKEND_URL}${apiRoute}`,
      "GET",
      undefined,
      requestHeaders
    );
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
