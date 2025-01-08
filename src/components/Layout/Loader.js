import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import styled from 'styled-components';

const LoaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  );
};

export default Loader;
