import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import {
  Container,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import ErrorModal from "../../components/Layout/ErrorModal";
import Loader from "../../components/Layout/Loader";

import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../../hooks/form-hook";

import { UserContext } from "../../context/user-context";

import { login, signUp } from "../../services/authService";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";

import routes from "../../routes";
import { fetchUserData } from "../../store/userSlice";

const { HOME } = routes;

const RegisterContainer = styled(Container)`
  padding: 50px 0;
  max-width: 600px;
  text-align: center;
`;

const FormContainer = styled.div`
  margin-top: 20px;
`;

const ToggleTabs = styled(Tabs)`
  margin-bottom: 20px;
`;

const RegisterPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFormValues = {
    name: "",
    email: "",
    password: "",
    role: "user",
  };

  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const { values, handleChange, formErrors, clearFormErrors } =
    useForm(initialFormValues);

  const user = useContext(UserContext);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    clearFormErrors();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (tabIndex === 0) {
        // Handle login
        const loginRequestBody = {
          email: values.email,
          password: values.password,
        };
        const userData = await login(sendRequest, loginRequestBody);
        await dispatch(fetchUserData({ sendRequest, userId: userData.userId }));
        user.login(userData.userId, userData.token);
      } else {
        // Handle signup
        const singUpRequestBody = {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        };
        const userData = await signUp(sendRequest, singUpRequestBody);
        await dispatch(fetchUserData({ sendRequest, userId: userData.userId }));
        user.login(userData.userId, userData.token);
      }
      // Redirect or display a success message
      navigate(HOME.route);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RegisterContainer>
      <Typography variant="h2" gutterBottom>
        {tabIndex === 0 ? "Login" : "Sign Up"}
      </Typography>

      <ToggleTabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </ToggleTabs>
      <ErrorModal error={error} handleClose={clearError} />
      {isLoading && <Loader />}
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {tabIndex === 1 && (
            <>
              <TextField
                label="Name"
                type="text"
                fullWidth
                margin="normal"
                value={values.name}
                onChange={(e) => handleChange(e, [VALIDATOR_REQUIRE()])}
                name="name"
                error={formErrors["name"]?.length > 0}
                helperText={formErrors["name"]?.join("\n")}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  value={values.role}
                  onChange={handleChange}
                  label="Role"
                  name="role"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={values.email}
            onChange={(e) =>
              handleChange(e, [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()])
            }
            name="email"
            error={tabIndex === 1 ? formErrors["email"]?.length > 0 : null}
            helperText={tabIndex === 1 ? formErrors["email"]?.join("\n") : null}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={values.password}
            onChange={(e) =>
              handleChange(e, [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)])
            }
            name="password"
            error={tabIndex === 1 ? formErrors["password"]?.length > 0 : null}
            helperText={
              tabIndex === 1 ? formErrors["password"]?.join("\n") : null
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              (tabIndex === 0
                ? values.email.length === 0 || values.password.length === 0
                : Object.values(values).some((value) => value.length === 0)) ||
              Object.values(formErrors).some((error) => error?.length > 0)
            }
          >
            {tabIndex === 0 ? "Login" : "Sign Up"}
          </Button>
        </form>
      </FormContainer>
    </RegisterContainer>
  );
};

export default RegisterPage;
