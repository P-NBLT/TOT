"use client";
import React from "react";
import formStyle from "./form.module.css";
import { CSS_PROPS_TYPES } from "@/app/types/css";
import { cssClassAndStyleBuilder } from "@/app/utils/css";

type props = {
  children: React.ReactNode;
  values: { value: string; type: string }[];
  submit: Function;
  id: string;
};

type FormProps = props & Omit<CSS_PROPS_TYPES, "size" | "color" | "fontSize">;

const Form: React.FC<FormProps> = ({ children, values, submit, ...props }) => {
  const [classes] = cssClassAndStyleBuilder(props, formStyle);

  return (
    <form
      className={`${formStyle.master} ${classes}`}
      {...props}
      autoComplete="on"
      onSubmit={async (e) => await submit(e, values)}
    >
      {children}
    </form>
  );
};

export default Form;
