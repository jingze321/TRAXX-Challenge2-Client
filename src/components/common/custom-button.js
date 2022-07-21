import React from "react";
import { Button } from "@mui/material";

export const CustomButton = ({ label, onClick, sx, ...restProps }) => {
  return (
    <Button
      sx={{
        width: "100%",
        maxWidth: 200,
        ...sx,
      }}
      variant="contained"
      onClick={onClick}
      {...restProps}
    >
      {label}
    </Button>
  );
};
