"use client";
import React from "react";
import { Button, Form, Input, Label, Typography } from "../../components";
import useForm from "../../hooks/useForm";
import Oauth from "./oauth";
import { useUser } from "../../controllers/userProvider";

type props = {
  toggleState: () => void;
};
const Signup: React.FC<props> = ({ toggleState }) => {
  const { formData, addValue } = useForm();
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
        <Label id="confirm-password" name="Confirm password" />
        <Input
          placeholder="confirm password"
          name="confirm-password"
          type="password"
          onChange={(e) =>
            addValue({ type: "confirm-password", value: e.target.value })
          }
          id="confirm-password"
          margin={"6px 0 12px 0"}
        ></Input>

        <Button
          variant="standard"
          width="m"
          onClick={(e: any) => signup(e, formData)}
          margin={"5px 0 5px calc(25% + 30px)"}
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
