import React from 'react';
import styled from 'styled-components';
import { Container, Typography, Paper } from '@mui/material';

const TestimonialsContainer = styled(Container)`
  padding: 50px 0;
`;

const Testimonial = styled(Paper)`
  padding: 20px;
  margin: 20px 0;
  background: ${({theme}) => theme.palette.mode === "light" ? "#fff" : "#2f2d2d" };
`;

const TestimonialsSection = () => {
  return (
    <TestimonialsContainer>
      <Typography variant="h2" align="center" gutterBottom>What Our Users Say</Typography>
      <Testimonial elevation={3}>
        <Typography variant="body1">
          "This app has revolutionized the way we manage our projects."
        </Typography>
        <Typography variant="caption" display="block" align="right">
          - User A
        </Typography>
      </Testimonial>
      <Testimonial elevation={3}>
        <Typography variant="body1">
          "Efficient and user-friendly. Highly recommend!"
        </Typography>
        <Typography variant="caption" display="block" align="right">
          - User B
        </Typography>
      </Testimonial>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;
