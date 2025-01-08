import React from "react";

import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { Work, LocationOn, Business, Workspaces } from "@mui/icons-material";
import styled from "styled-components";

import EditableField from "../../components/common/EditableField";

const AboutSectionContainer = styled.div`
  margin: 16px 0;
`;

const AboutSection = ({
  jobTitle,
  department,
  organization,
  location,
  onSave,
}) => {
  return (
    <AboutSectionContainer>
      <Typography variant="h6" gutterBottom fontSize="1rem">
        ABOUT
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Tooltip title="Job Title" placement="right-end">
              <Work />
            </Tooltip>
          </ListItemIcon>
          <EditableField
            value={jobTitle}
            onSave={(value) => onSave("jobTitle", value)}
            placeholderValue={"Your job title"}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Tooltip title="Department" placement="right-end">
              <Workspaces />
            </Tooltip>
          </ListItemIcon>
          <EditableField
            value={department}
            onSave={(value) => onSave("department", value)}
            placeholderValue={"Your department"}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Tooltip title="Organization" placement="right-end">
              <Business />
            </Tooltip>
          </ListItemIcon>
          <EditableField
            value={organization}
            onSave={(value) => onSave("organization", value)}
            placeholderValue={"Your organization"}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Tooltip title="Location" placement="right-end">
              <LocationOn />
            </Tooltip>
          </ListItemIcon>
          <EditableField
            value={location}
            onSave={(value) => onSave("location", value)}
            placeholderValue={"Your location"}
          />
        </ListItem>
      </List>
    </AboutSectionContainer>
  );
};

export default AboutSection;
