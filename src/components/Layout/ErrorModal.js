import React from "react";
import { Typography } from "@mui/material";

import CustomModal from "./CustomModal";

const ErrorModal = ({ error, handleClose }) => {
  return (
    <CustomModal open={!!error} handleClose={handleClose} title="Error">
      <Typography variant="body1">{error}</Typography>
    </CustomModal>
  );
};

export default ErrorModal;
