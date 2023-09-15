import { Typography } from "@/app/components";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const PasswordValidationCheck: React.FC<{
  password: string | undefined;
  error: any;
}> = ({ password, error }) => {
  function generatePasswordValidationErrorMessage(
    password: string | undefined
  ) {
    if (!password) password = "";
    const numRegex = /(?=.*\d)/;
    const lowerCaseRegex = /(?=.*[a-z])/;
    const upperCaseRegex = /(?=.*[A-Z])/;
    const specialCharacterRegex = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?~])/;
    const lengthRegex = /.{8,}/;

    const messages = [
      {
        type: "num",
        message: "one digit",
        value: numRegex.test(password),
      },
      {
        type: "lowerCase",
        message: "one lower case character",
        value: lowerCaseRegex.test(password),
      },
      {
        type: "upperCase",
        message: "one upper case character",
        value: upperCaseRegex.test(password),
      },
      {
        type: "specialCharacter",
        message: "one special character",
        value: specialCharacterRegex.test(password),
      },
      {
        type: "length",
        message: "The password is at least 8 characters long",
        value: lengthRegex.test(password),
      },
    ];
    return messages;
  }

  return (
    <>
      <Typography fontSize={12} color="rgba(105, 105, 105, 0.8)">
        Include at least:
      </Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: 1,
          marginBottom: 5,
        }}
      >
        {generatePasswordValidationErrorMessage(password).map(
          (message: any) => {
            return (
              <div
                key={message.type}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  ...(message.type === "length" && { gridColumn: "1/3" }),
                }}
              >
                {message.value ? (
                  <AiOutlineCheck style={{ color: "green", width: 12 }} />
                ) : (
                  <RxCross2 style={{ color: "red", width: 12 }} />
                )}
                <Typography
                  fontSize="sm"
                  color={
                    error && !message.value
                      ? "red"
                      : message.value
                      ? " rgba(105, 105, 105, 0.6)"
                      : "rgba(105, 105, 105, 0.8)"
                  }
                >
                  {message.message}
                </Typography>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default PasswordValidationCheck;
