import React, { useContext } from "react";
import styled from "styled-components";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/user-context";

import routes from "../../routes";

const { AUTHENTICATE, HOME } = routes;

const AboutContainer = styled(Container)`
  padding: 50px 0;
  text-align: center;
`;

const Section = styled.div`
  margin: 20px 0;
`;

const AboutButton = styled(Button)`
  margin-top: 20px;
`;

const AboutPage = () => {
  const { token } = useContext(UserContext);

  return (
    <AboutContainer>
      <Typography variant="h2" gutterBottom>
        About ProjectPulse
      </Typography>

      <Section>
        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1">
          At ProjectPulse, our mission is to streamline project management for
          teams of all sizes. We aim to provide an intuitive platform that
          facilitates seamless collaboration, efficient task management, and
          effective project tracking.
        </Typography>
      </Section>

      <Section>
        <Typography variant="h5" gutterBottom>
          Features
        </Typography>
        <Typography variant="body1">
          ProjectPulse offers a range of features designed to optimize your
          project management experience:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">Real-time collaboration</Typography>
          </li>
          <li>
            <Typography variant="body1">
              Comprehensive project tracking
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Task assignment and prioritization
            </Typography>
          </li>
          <li>
            <Typography variant="body1">Progress monitoring</Typography>
          </li>
          <li>
            <Typography variant="body1">Customizable workflows</Typography>
          </li>
        </ul>
      </Section>

      <Section>
        <Typography variant="h5" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="body1">
          We are a dedicated team of developers, designers, and project managers
          passionate about creating the best project management tool available.
          Our diverse expertise allows us to meet the unique needs of our users
          effectively.
        </Typography>
      </Section>

      <Section>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          Have questions or feedback? We’d love to hear from you! Reach out to
          us at{" "}
          <a href="mailto:support@projectpulse.com">support@projectpulse.com</a>
          .
        </Typography>
      </Section>

      <AboutButton
        variant="contained"
        color="primary"
        component={Link}
        to={token ? HOME.route : AUTHENTICATE.route}
      >
        Get Started
      </AboutButton>
    </AboutContainer>
  );
};

export default AboutPage;
