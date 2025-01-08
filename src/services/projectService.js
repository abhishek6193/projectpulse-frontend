import APIS from "../apis";

const { CREATE_NEW_PROJECT, USER_PROJECTS, UPDATE_PROJECT_DETAILS } = APIS;

export const createNewProject = async (
  sendRequest,
  requestBody,
  requestHeaders
) => {
  try {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_PROJECT_PULSE_BACKEND_URL}${CREATE_NEW_PROJECT.route}`,
      "POST",
      JSON.stringify(requestBody),
      requestHeaders
    );
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectsByUserId = async (
  sendRequest,
  userId,
  requestHeaders
) => {
  const apiRoute = USER_PROJECTS.route.replace("$userId", userId);
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

export const updateProjectDetails = async (
  sendRequest,
  requestBody,
  requestHeaders
) => {
  const apiRoute = UPDATE_PROJECT_DETAILS.route.replace("$projectId", requestBody.id);
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
