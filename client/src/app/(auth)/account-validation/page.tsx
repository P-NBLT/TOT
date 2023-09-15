"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/controllers/userProvider";
import { Typography } from "@/app/components";

const EmailVerificationPage = () => {
  const { verifyEmail, user } = useUser();
  const param = useSearchParams();
  const router = useRouter();
  const [isAlreadyVerified, setIsAlreadyVerified] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const token = param.get("token");
      if (token) {
        const response: any = await verifyEmail(token);
        if (
          response.message ===
          "Your account has already been verified. Please login."
        ) {
          setIsAlreadyVerified(true);
        } else if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
          router.push("/create-profile");
        }
      }
    })();
  }, []);

  return (
    <div>
      {isAlreadyVerified ? (
        <div style={{ display: "flex" }}>
          <Typography color="white" marginRight={5}>
            You have already been verified.
          </Typography>

          <Typography
            variant="link"
            onClick={() => router.push("/registration")}
          >
            Please login here.
          </Typography>
        </div>
      ) : (
        <Typography color="white">
          We are verifying your email. Please wait a moment.
        </Typography>
      )}
    </div>
  );
};

export default EmailVerificationPage;
