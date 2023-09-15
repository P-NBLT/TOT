"use client";
import React from "react";
import { Button, Form, Input, Label, Typography } from "../../components";
import useForm from "../../hooks/useForm";
import Oauth from "./oauth";
import { useUser } from "../../controllers/userProvider";
import PasswordValidationCheck from "./passwordValidationCheck";

type props = {
  toggleState: () => void;
};
const Signup: React.FC<props> = ({ toggleState }) => {
  const { formData, validationError, addValue, validateAndExecute } = useForm();
  const { signup } = useUser();

  return (
    <>
      {" "}
      <Form values={formData} submit={signup} variant="oauth" id="signup">
        <Label id="email" name="Email" />
        <Input
          placeholder="email"
          name="email"
          id="email"
          margin={"6px 0"}
          onChange={(e) => addValue({ type: "email", value: e.target.value })}
        ></Input>
        {/* @ts-ignore */}
        <ValidationErrorMessage message={validationError?.email} />
        <Label id="password" name="Password" />
        <Input
          placeholder="password"
          name="password"
          type="password"
          onChange={(e) =>
            addValue({ type: "password", value: e.target.value })
          }
          id="password"
          margin={"6px 0"}
        ></Input>
        {/* @ts-ignore */}
        {validationError?.password === "Required" && (
          //  @ts-ignore
          <ValidationErrorMessage message={validationError?.password} />
        )}
        {/* @ts-ignore  */}
        {formData?.password?.length >= 1 && (
          <PasswordValidationCheck
            password={formData.password}
            //  @ts-ignore
            error={validationError?.password}
          />
        )}
        <Label id="confirm-password" name="Confirm password" />
        <Input
          placeholder="confirm password"
          name="confirm-password"
          type="password"
          onChange={(e) =>
            addValue({ type: "confirm-password", value: e.target.value })
          }
          id="confirm-password"
          margin={"6px 0 5px 0"}
        ></Input>
        {/* @ts-ignore */}
        <ValidationErrorMessage message={validationError["confirm-password"]} />
        <Button
          variant="standard"
          width="m"
          onClick={(e: any) => {
            validateAndExecute(e) && signup(e, formData);
          }}
          margin={"17px 0 5px calc(25% + 30px)"}
        >
          Sign up
        </Button>
        <Oauth />
        <div>
          <Typography
            variant="link"
            onClick={toggleState}
            style={{ textAlign: "center" }}
          >
            I already have an account
          </Typography>
        </div>
      </Form>
    </>
  );
};

export default Signup;

const ValidationErrorMessage: React.FC<{ message: string | undefined }> = ({
  message,
}) => {
  return (
    <>
      {message ? (
        <Typography color="red" bold fontSize={10} marginLeft={2}>
          {message}
        </Typography>
      ) : null}
    </>
  );
};
