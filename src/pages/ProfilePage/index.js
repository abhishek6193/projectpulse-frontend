import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import {
  Email,
  // Add,
  CameraAlt,
} from "@mui/icons-material";
import styled from "styled-components";

import { UserContext } from "../../context/user-context";

import { useHttpClient } from "../../hooks/http-hook";

import { stringToColor, getUserInitials } from "../../utils";

import {
  fetchUserDetails,
  updateUserProfile,
} from "../../services/userService";
import { useTheme } from "../../context/theme-context";
import AboutSection from "./AboutSection";

const AvatarWrapper = styled(Box)`
  position: relative;
  margin-right: 20px;
`;

const AvatarOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;

  &:hover {
    opacity: 1;
  }
`;

const ProfilePage = () => {
  const { userDetails } = useSelector(({ user }) => user);
  // const [userInfo, setUserInfo] = useState({
  //   jobTitle: "Software Engineer",
  //   department: "Engineering",
  //   organization: "TechCorp",
  //   location: "San Francisco, CA",
  // });
  const [profileDetails, setProfileDetails] = useState(null);

  const { userId: requestedUserId } = useParams();

  const { userId, token } = useContext(UserContext);
  const { isDarkMode } = useTheme();

  const { sendRequest } = useHttpClient();

  const updateUserProfileData = useCallback(
    async (profile) => {
      await updateUserProfile(sendRequest, profile, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
    },
    [sendRequest, token]
  );

  useEffect(() => {
    const defaultProfile = {
      id: "new",
      jobTitle: "",
      department: "",
      organization: "",
      location: "",
      image: null,
    };
  
    const fetchProfileDetails = async () => {
      try {
        const fetchedUserDetails = await fetchUserDetails(
          sendRequest,
          requestedUserId
        );
        if (!fetchedUserDetails.profile) {
          await updateUserProfileData(defaultProfile);
          setProfileDetails({
            user: { ...fetchedUserDetails.user },
            profile: defaultProfile,
          });
        } else {
          setProfileDetails(fetchedUserDetails);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (requestedUserId && userId) {
      if (requestedUserId === userId) {
        if (userDetails) {
          if (!userDetails.profile) {
            updateUserProfileData(defaultProfile);
            setProfileDetails({
              user: { ...userDetails.user },
              profile: defaultProfile,
            });
          } else {
            setProfileDetails(userDetails);
          }
        }
      } else {
        fetchProfileDetails();
      }
    }
  }, [
    requestedUserId,
    userId,
    sendRequest,
    userDetails,
    updateUserProfileData,
  ]);

  const handleProfilePicClick = () => {
    // Logic to open the profile picture uploader
    alert("Open profile picture uploader");
  };

  const handleSave = useCallback(
    (field, value) => {
      const updatedUserDetails = {
        user: { ...profileDetails.user },
        profile: { ...profileDetails.profile, [field]: value },
      };
      updateUserProfileData(updatedUserDetails.profile);
      setProfileDetails(updatedUserDetails);
    },
    [profileDetails, updateUserProfileData]
  );

  return profileDetails ? (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          bgcolor: isDarkMode ? "rgb(47, 70, 115)" : "primary.light",
          padding: 4,
          borderRadius: 2,
          marginBottom: 4,
        }}
      >
        <AvatarWrapper>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: stringToColor(profileDetails.user.name),
              color: "white",
            }}
          >
            {getUserInitials(profileDetails.user.name)}
          </Avatar>
          <AvatarOverlay onClick={handleProfilePicClick}>
            <CameraAlt />
          </AvatarOverlay>
        </AvatarWrapper>
        <Typography variant="h5" sx={{ marginTop: 2 }} color="white">
          {profileDetails.user.name}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <AboutSection
                jobTitle={profileDetails.profile.jobTitle}
                department={profileDetails.profile.department}
                organization={profileDetails.profile.organization}
                location={profileDetails.profile.location}
                onSave={handleSave}
              />
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h6" gutterBottom fontSize="1rem">
                CONTACT
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText
                    primary={profileDetails.user.email}
                    sx={{ wordWrap: "break-word" }}
                  />
                </ListItem>
              </List>
              {/* <Divider sx={{ marginY: 2 }} />
              <Typography variant="h6" gutterBottom>
                TEAMS
              </Typography>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Create team" />
                </ListItem>
              </List>
              <Link
                href="#"
                sx={{ textDecoration: "underline" }}
                variant="body2"
              >
                View privacy policy
              </Link> */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Worked on
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Others will only see what they can access.
              </Typography>
              <Box sx={{ paddingY: 2 }}>
                {/* Replace this with a loop that maps over the user's work history */}
                <Card sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="body2">
                      <strong>Guide tooltip is not aligned</strong> - TelusOPUS
                      - TSQA
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      You and Harleen Kaur have both worked on this
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="body2">
                      <strong>Cast thumbnail is showing up</strong> - TelusOPUS
                      - TSQA
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      You commented here on 8 August 2024
                    </Typography>
                  </CardContent>
                </Card>
                {/* Add more Cards for other work items */}
                <Link href="#" sx={{ textDecoration: "underline" }}>
                  Show more
                </Link>
              </Box>
            </CardContent>
          </Card>
          <Box sx={{ marginTop: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Places you work in
                </Typography>
                <List>
                  {/* Replace this with a loop that maps over the user's places */}
                  <ListItem>
                    <ListItemIcon>
                      <img
                        src="https://img.icons8.com/color/48/jira.png"
                        alt="Jira"
                        width={24}
                      />
                    </ListItemIcon>
                    <ListItemText primary="TelusOPUS - Client Dev Web Clients" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <img
                        src="https://img.icons8.com/color/48/jira.png"
                        alt="Jira"
                        width={24}
                      />
                    </ListItemIcon>
                    <ListItemText primary="TelusOPUS - TSQA" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <img
                        src="https://img.icons8.com/color/48/confluence.png"
                        alt="Confluence"
                        width={24}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Opus Client Squads" />
                  </ListItem>
                  {/* Add more ListItems for other places */}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <></>
  );
};

export default ProfilePage;
