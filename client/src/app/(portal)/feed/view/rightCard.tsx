import { Card, Typography } from "@/app/components";
import React from "react";

type props = {
  children: React.ReactNode;
};

const RigthCard: React.FC = () => {
  return (
    <Card variant="feedComponentCard-aside news">
      <Typography>News 1</Typography>
      <Typography>News 2</Typography>
      <Typography>News 3</Typography>
      <Typography>News 4</Typography>
      <Typography>News 6</Typography>
      <Typography>News 7</Typography>
      <Typography>News 8</Typography>
      <Typography>News 9</Typography>
      <Typography>News 10</Typography>
    </Card>
  );
};

export default RigthCard;
