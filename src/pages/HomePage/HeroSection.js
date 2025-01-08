import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Container, Typography } from "@mui/material";

import routes from "../../routes";

const { AUTHENTICATE, ABOUT } = routes;

const HeroSectionContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  min-width: 95vw;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
  text-align: center;
`;

const HeroButton = styled(Button)`
  margin: 20px;
  color: white;
  border: 1px solid white;

  &:hover {
    background-color: white;
    color: #ff7e5f;
  }
`;

const HeroSection = () => {
  return (
    <HeroSectionContainer>
      <Typography variant="h1">Welcome to ProjectPulse</Typography>
      <Typography variant="h5">
        Manage your projects and tasks efficiently
      </Typography>
      <div>
        <HeroButton variant="outlined" component={Link} to={AUTHENTICATE.route}>
          Authenticate
        </HeroButton>
        <HeroButton variant="outlined" component={Link} to={ABOUT.route}>
          Learn More
        </HeroButton>
      </div>
    </HeroSectionContainer>
  );
};

export default HeroSection;
