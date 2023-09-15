import { CenterDiv, Typography } from "@/app/components";
import React from "react";

type props = {};

const CheckEmailPage: React.FC<props> = () => {
  return (
    <CenterDiv>
      <Typography color="white">
        Thank you for signing up. An email has been set to confirm your account.
        Check your spam if you don't see any email.
      </Typography>
    </CenterDiv>
  );
};

export default CheckEmailPage;
