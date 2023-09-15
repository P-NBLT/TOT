import React from "react";
import { cssClassAndStyleBuilder } from "@/app/utils/css";
import buttonStyles from "./button.module.css";
import { CSS_PROPS_TYPES } from "@/app/types/css";

type props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement | MouseEvent>;
  children: React.ReactNode;
};

type ButtonProps = props & CSS_PROPS_TYPES;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const [classNames] = cssClassAndStyleBuilder(props, buttonStyles);
  return (
    <button
      {...props}
      className={`${buttonStyles.default} 
       ${classNames}`}
    >
      {children}
    </button>
  );
};

export default Button;
