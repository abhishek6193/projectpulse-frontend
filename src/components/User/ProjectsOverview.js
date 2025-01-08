import React, { useState } from "react";
import styled from "styled-components";
import {
  Container,
  Typography,
  Button,
  List,
  ListItemText,
  Grid,
  Paper,
  Box,
} from "@mui/material";

import ProjectForm from "../Projects/ProjectForm";

const ProjectsContainer = styled(Container)`
  padding: 25px 0;
`;

const ProjectPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ProjectHeader = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "light" ? "#f0f0f0" : "#fbf1f43b"};
`;

const ProjectsOverview = ({ projects, updateProjectsList, users }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  return (
    <ProjectsContainer>
      <Title>Your Projects</Title>
      <ProjectForm
        open={modalOpen}
        onClose={handleClose}
        updateProjectsList={updateProjectsList}
        project={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      {Array.isArray(projects) && projects.length > 0 ? (
        <>
          <ProjectHeader>
            <Typography variant="body1" style={{ flex: 1, fontWeight: "bold" }}>
              Name
            </Typography>
            <Typography variant="body1" style={{ flex: 1, fontWeight: "bold" }}>
              Status
            </Typography>
            <Typography variant="body1" style={{ flex: 1, fontWeight: "bold" }}>
              Creator
            </Typography>
          </ProjectHeader>
          <List>
            {projects.map((project) => (
              <Grid container spacing={2} key={project.id}>
                <Grid item xs={12}>
                  <ProjectPaper
                    elevation={3}
                    onClick={() => handleCardClick(project)}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <ListItemText primary={project.name} />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <ListItemText primary={project.status} />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <ListItemText
                          primary={
                            users?.find((user) => user.id === project.creator)
                              ?.name
                          }
                        />
                      </Grid>
                    </Grid>
                  </ProjectPaper>
                </Grid>
              </Grid>
            ))}
          </List>
        </>
      ) : (
        <Typography variant="body1">
          No Projects found! Let's get started by creating your first project.
        </Typography>
      )}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleCardClick(null)}
        >
          Create New Project
        </Button>
      </Box>
    </ProjectsContainer>
  );
};

export default ProjectsOverview;
