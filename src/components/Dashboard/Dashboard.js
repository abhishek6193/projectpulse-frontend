import React from "react";
import styled from "styled-components";
import { Container, Typography } from "@mui/material";

const DashboardContainer = styled(Container)`
  padding: 10px 0;
  text-align: center;
`;

const Overview = styled(Typography)`
  font-size: 1.2rem;
  color: #666;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Overview>Here’s a quick overview of your projects and tasks.</Overview>
    </DashboardContainer>
  );
};

export default Dashboard;
