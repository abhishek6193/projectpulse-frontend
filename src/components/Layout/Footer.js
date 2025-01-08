import React from 'react';
import styled from 'styled-components';
import { Link as MuiLink, Typography } from '@mui/material';

const FooterContainer = styled.footer`
  padding: 20px 0;
  background: #333;
  color: white;
  text-align: center;
`;

const FooterNav = styled.nav`
  margin-bottom: 10px;

  & a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterNav>
        <MuiLink href="/about">About</MuiLink>
        <MuiLink href="/contact">Contact</MuiLink>
        <MuiLink href="/privacy-policy">Privacy Policy</MuiLink>
        <MuiLink href="/terms-of-service">Terms of Service</MuiLink>
      </FooterNav>
      <Typography variant="body2">&copy; 2024 Project Management App. All rights reserved.</Typography>
    </FooterContainer>
  );
};

export default Footer;
