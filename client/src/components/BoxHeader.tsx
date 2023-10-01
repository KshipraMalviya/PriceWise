import { Box, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";

type Props = {
  title: string;
  sideText?: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  return (
    <FlexBetween color={'black'} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h4" mb="-0.1rem" color={'black'}>
            {title}
          </Typography>
          <Typography variant="h6" color={'black'}>{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight="700" color={'black'}>
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;