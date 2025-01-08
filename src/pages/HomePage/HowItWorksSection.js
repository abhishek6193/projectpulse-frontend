import React from "react";
import styled from "styled-components";
import { Container, Typography, List, ListItem } from "@mui/material";

const HowItWorksContainer = styled(Container)`
  padding: 50px 0;
  background: ${({ theme }) =>
    theme.palette.mode === "light" ? "#f7f7f7" : "#f7f7f738"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`;

const HowItWorksSection = () => {
  return (
    <HowItWorksContainer>
      <Typography variant="h2" align="center" gutterBottom>
        How It Works
      </Typography>
      <StepList>
        <ListItem>
          <Typography variant="h6">1. Sign up and create an account</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">
            2. Create and manage your projects
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6">
            3. Assign tasks and track progress
          </Typography>
        </ListItem>
      </StepList>
    </HowItWorksContainer>
  );
};

export default HowItWorksSection;
