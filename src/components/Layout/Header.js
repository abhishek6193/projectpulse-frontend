import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

import UserProfileMenu from "../User/UserProfileMenu";

import { UserContext } from "../../context/user-context";
import { useTheme } from "../../context/theme-context";

import routes from "../../routes";

const { HOME, ABOUT, AUTHENTICATE } = routes;

const appLogo = `${process.env.PUBLIC_URL}/PPLogo.svg`;

const HeaderContainer = styled(AppBar)`
  margin-bottom: 20px;
`;

const HeaderLinks = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  const { token } = useContext(UserContext);
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <HeaderContainer position="static">
      <Toolbar>
        <HeaderLinks>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              to={HOME.route}
              style={{
                textDecoration: "none",
                position: "relative",
                top: "2px",
              }}
            >
              <img src={appLogo} width={40} height={50} alt="app logo" />
            </Link>
            <Typography variant="h6">
              <Link
                to={HOME.route}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                ProjectPulse
              </Link>
            </Typography>
          </div>
          <div>
            {token ? (
              <Button color="inherit" component={Link} to={HOME.route}>
                Dashboard
              </Button>
            ) : (
              <Button color="inherit" component={Link} to={AUTHENTICATE.route}>
                Authenticate
              </Button>
            )}
            <Button color="inherit" component={Link} to={ABOUT.route} mr={2}>
              About
            </Button>
            {token ? (
              <UserProfileMenu />
            ) : (
              <Box sx={{ display: "inline-block", padding: "6px 8px" }}>
                <IconButton onClick={toggleTheme} color="inherit">
                  {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Box>
            )}
          </div>
        </HeaderLinks>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;
