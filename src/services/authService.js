import APIS from "../apis";

const { LOGIN, SIGN_UP } = APIS;

export const login = async (sendRequest, payload) => {
  const responseData = await sendRequest(
    `${process.env.REACT_APP_PROJECT_PULSE_BACKEND_URL}${LOGIN.route}`,
    "POST",
    JSON.stringify(payload),
    {
      "Content-Type": "application/json",
    }
  );
  return responseData;
};

export const signUp = async (sendRequest, payload) => {
  const responseData = await sendRequest(
    `${process.env.REACT_APP_PROJECT_PULSE_BACKEND_URL}${SIGN_UP.route}`,
    "POST",
    JSON.stringify(payload),
    {
      "Content-Type": "application/json",
    }
  );
  return responseData;
};
