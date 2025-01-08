import React, { useContext, useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
  ListItemIcon,
} from "@mui/material";
import {
  Person,
  Settings,
  Notifications,
  Palette,
  Logout,
  ArrowForwardIos,
  LightMode,
  DarkMode,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/user-context";
import { useTheme } from "../../context/theme-context";

import { cleanUpUserDetails } from "../../store/userSlice";

import { getUserInitials, stringToColor } from "../../utils";

import routes from "../../routes";

const { HOME, PROFILE } = routes;

const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { logout } = useContext(UserContext);
  const { isDarkMode, toggleTheme } = useTheme();

  const open = Boolean(anchorEl);

  const { userDetails } = useSelector(({ user }) => user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setThemeMenuAnchorEl(null);
  };

  const handleThemeMenuOpen = (event) => {
    setThemeMenuAnchorEl(event.currentTarget);
  };

  const handleThemeChange = (theme) => {
    if (theme === "light" && isDarkMode) {
      toggleTheme(); // Switch to light theme
    } else if (theme === "dark" && !isDarkMode) {
      toggleTheme(); // Switch to dark theme
    }
    handleClose();
  };

  const handleLogout = () => {
    // Handle logout logic here, like clearing tokens or user data
    dispatch(cleanUpUserDetails());
    logout();
    navigate(HOME.route); // Redirect to login page or home
  };

  return userDetails ? (
    <Box sx={{ display: "inline-block", padding: "6px 8px" }}>
      <Avatar
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          bgcolor: stringToColor(userDetails.user.name),
          fontSize: "1rem",
          height: "36px",
          color: "white",
        }}
      >
        {getUserInitials(userDetails.user.name)}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            width: 250,
          },
        }}
      >
        <Box
          sx={{ padding: "12px 16px", display: "flex", alignItems: "center" }}
        >
          <Avatar
            sx={{
              bgcolor: stringToColor(userDetails.user.name),
              width: 32,
              height: 32,
              fontSize: "1rem",
              mr: 1,
            }}
          >
            {getUserInitials(userDetails.user.name)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1">{userDetails.user.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {userDetails.user.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box mt={1}>
          <MenuItem
            onClick={() => {
              navigate(`${PROFILE.route}/${userDetails.user.id}`);
              handleClose();
            }}
          >
            <Person fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">Profile</Typography>
          </MenuItem>
        </Box>
        <MenuItem>
          <Settings fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Personal settings</Typography>
        </MenuItem>
        <MenuItem>
          <Notifications fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Notifications</Typography>
        </MenuItem>
        <MenuItem
          selected={Boolean(themeMenuAnchorEl)}
          onClick={handleThemeMenuOpen}
        >
          <Palette fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Theme</Typography>
          <ArrowForwardIos fontSize="smaller" sx={{ marginLeft: "auto" }} />
        </MenuItem>
        {/* Nested theme menu */}
        <Menu
          anchorEl={themeMenuAnchorEl}
          open={Boolean(themeMenuAnchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ mt: 4 }}
        >
          <MenuItem
            selected={!isDarkMode}
            onClick={() => handleThemeChange("light")}
          >
            <ListItemIcon>
              <LightMode fontSize="smaller" sx={{ mr: 1 }} />
            </ListItemIcon>
            <Typography variant="body1" sx={{ fontSize: "0.8075rem" }}>
              Light
            </Typography>
          </MenuItem>
          <MenuItem
            selected={isDarkMode}
            onClick={() => handleThemeChange("dark")}
          >
            <ListItemIcon>
              <DarkMode fontSize="smaller" sx={{ mr: 1 }} />
            </ListItemIcon>
            <Typography variant="body1" sx={{ fontSize: "0.8075rem" }}>
              Dark
            </Typography>
          </MenuItem>
        </Menu>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <Logout fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Log out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <></>
  );
};

export default UserProfileMenu;
