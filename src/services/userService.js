import APIS from "../apis";

const { FETCH_USER_DATA, FETCH_USERS, UPDATE_USER_PROFILE } = APIS;

export const fetchUserDetails = async (sendRequest, userId) => {
  const apiRoute = FETCH_USER_DATA.route.replace("$userId", userId);
  try {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_PROJECT_PULSE_BACKEND_URL}${apiRoute}`
    );
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllUsers = async (sendRequest) => {
  try {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_PROJECT_PULSE_BACKEND_URL}${FETCH_USERS.route}`
    );
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserProfile = async (
  sendRequest,
  requestBody,
  requestHeaders
) => {
  const apiRoute = UPDATE_USER_PROFILE.route.replace(
    "$profileId",
    requestBody.id
  );
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
