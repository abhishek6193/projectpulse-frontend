import React from 'react';
import styled from 'styled-components';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

const DetailContainer = styled(Container)`
  padding: 30px 0;
`;

const Section = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;

const ProjectPage = () => {
  const { projectId } = useParams();
  // Fetch project details using projectId
  const project = { id: projectId, name: 'Project Name', description: 'Project Description', tasks: ['Task 1', 'Task 2'] };

  return (
    <DetailContainer>
      <Typography variant="h4" gutterBottom>{project.name}</Typography>
      <Typography variant="body1" gutterBottom>{project.description}</Typography>

      <Grid container spacing={3}>
        {/* Project Tasks */}
        <Grid item xs={12}>
          <Section>
            <Typography variant="h6" gutterBottom>Tasks</Typography>
            {project.tasks.map((task, index) => (
              <Typography variant="body1" key={index}>{task}</Typography>
            ))}
          </Section>
        </Grid>

        {/* Project Team */}
        <Grid item xs={12}>
          <Section>
            <Typography variant="h6" gutterBottom>Team Members</Typography>
            {/* List team members here */}
            <Typography variant="body1">Member 1</Typography>
            <Typography variant="body1">Member 2</Typography>
          </Section>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" component={Link} to="/">Back to Dashboard</Button>
    </DetailContainer>
  );
};

export default ProjectPage;
