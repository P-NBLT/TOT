"use client";
import React from "react";
import { Button, Form, Input, Label, Typography } from "../../components";
import Oauth from "./oauth";
import useForm from "../../hooks/useForm";
import { useUser } from "../../controllers/userProvider";
import { useToast } from "@/app/controllers/toastProvider";

type props = {
  toggleState: () => void;
};

const Login: React.FC<props> = ({ toggleState }) => {
  const { formData, addValue } = useForm();
  const { localLogin }: any = useUser();
  const { showToast } = useToast();
  async function handleLogin(e: any) {
    e.preventDefault();
    const response = await localLogin(e, formData);

    if (response.message) {
      showToast(response.message, "error");
    }
  }

  return (
    <>
      {" "}
      <Form variant="oauth" id="signin">
        <Label id="email" name="Email" />
        <Input
          placeholder="email"
          name="email"
          id="email"
          margin={"6px 0"}
          onChange={(e) => addValue({ type: "email", value: e.target.value })}
        />
        <Label id="password" name="Password" />
        <Input
          placeholder="password"
          type="password"
          name="password"
          id="password"
          margin={"6px 0 12px 0"}
          onChange={(e) =>
            addValue({ type: "password", value: e.target.value })
          }
        />
        <Button
          variant="standard"
          margin={"5px 0 5px calc(25% + 30px)"}
          width="m"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Oauth />
        <div>
          <Typography
            onClick={toggleState}
            variant="link"
            style={{ textAlign: "center" }}
          >
            Don't have an account yet? Sign up here
          </Typography>
        </div>
      </Form>
    </>
  );
};

export default Login;
