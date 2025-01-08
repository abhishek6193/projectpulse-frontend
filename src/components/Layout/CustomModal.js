import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 500px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "light" ? "#ffffff" : "#121212"};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CustomModal = ({ open, handleClose, title, children }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <StyledBox>
        <Header>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Header>
        {children}
      </StyledBox>
    </Modal>
  );
};

export default CustomModal;
