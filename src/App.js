import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectPage from "./pages/ProjectPage";
// import TaskPage from './pages/TaskPage';
import ProfilePage from './pages/ProfilePage';

import Header from "./components/Layout/Header";
import TransitionWrapper from "./components/Layout/TransitionWrapper";

import AppLaunchManager from "./manager/AppLaunchManager";

import { UserContext } from "./context/user-context";
import { ThemeProvider } from "./context/theme-context";

import { useAuth } from "./hooks/auth-hook";

import CombinedThemeProvider from "./muiStyledEngineProvider";

import routes from "./routes";

const { ABOUT, AUTHENTICATE, PROJECT, HOME, PROFILE } = routes;

function App() {
  const { token, login, logout, userId } = useAuth();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <CombinedThemeProvider>
          <UserContext.Provider
            value={{ isLoggedIn: !!token, token, login, logout, userId }}
          >
            <Router>
              <Header />
              <TransitionWrapper>
                <Routes>
                  <Route
                    path={HOME.route}
                    element={
                      token ? (
                        <DashboardPage />
                      ) : (
                        <HomePage />
                      )
                    }
                  />
                  <Route path={ABOUT.route} element={<AboutPage />} />
                  <Route path={AUTHENTICATE.route} element={<AuthPage />} />
                  <Route
                    path={PROJECT.route}
                    element={
                      token ? (
                        <ProjectPage />
                      ) : (
                        <Navigate to={AUTHENTICATE.route} />
                      )
                    }
                  />
                  <Route path={`${PROFILE.route}/:userId`} element={<ProfilePage />} />
                  <Route path="*" element={<Navigate to={HOME.route} />} />
                </Routes>
              </TransitionWrapper>
            </Router>
          </UserContext.Provider>
        </CombinedThemeProvider>
      </ThemeProvider>
      <AppLaunchManager />
    </Provider>
  );
}

export default App;
