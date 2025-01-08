import React from 'react';
import styled from 'styled-components';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const ActivityContainer = styled(Container)`
  padding: 50px 0;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ActivityList = styled(List)`
  margin: 20px 0;
`;

const TeamActivityFeed = ({ activities }) => {
  return (
    <ActivityContainer>
      <Title>Team Activity</Title>
      <ActivityList>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText 
              primary={`${activity.user} ${activity.action}`} 
              secondary={activity.target} 
            />
          </ListItem>
        ))}
      </ActivityList>
    </ActivityContainer>
  );
};

export default TeamActivityFeed;
