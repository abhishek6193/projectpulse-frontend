import React from 'react';
import styled from 'styled-components';
import { Container, Typography, Grid } from '@mui/material';

const FeaturesSectionContainer = styled(Container)`
  padding: 50px 0;
`;

const FeatureItem = styled.div`
  text-align: center;
  padding: 20px;
`;

const FeaturesSection = () => {
  return (
    <FeaturesSectionContainer>
      <Typography variant="h2" align="center" gutterBottom>Features</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <FeatureItem>
            <i className="icon icon-projects"></i>
            <Typography variant="h6">Project Tracking</Typography>
            <Typography>Keep track of all your projects in one place.</Typography>
          </FeatureItem>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FeatureItem>
            <i className="icon icon-tasks"></i>
            <Typography variant="h6">Task Management</Typography>
            <Typography>Manage your tasks effectively and efficiently.</Typography>
          </FeatureItem>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FeatureItem>
            <i className="icon icon-collaboration"></i>
            <Typography variant="h6">Team Collaboration</Typography>
            <Typography>Collaborate with your team in real-time.</Typography>
          </FeatureItem>
        </Grid>
      </Grid>
    </FeaturesSectionContainer>
  );
};

export default FeaturesSection;
