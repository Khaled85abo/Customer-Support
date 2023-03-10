import { Typography } from "@mui/material";

const NoData = ({ text }: { text: string }) => {
  return (
    <Typography
      variant="h6"
      component="h2"
      align="center"
      sx={{ paddingBottom: 6 }}>
      There are no {text} to display
    </Typography>
  );
};

export default NoData;
