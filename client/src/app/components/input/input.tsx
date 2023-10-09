import React from "react";
import { cssClassAndStyleBuilder } from "../../utils/css";
import { CSS_PROPS_TYPES } from "../../types/css";
import inputStyles from "./input.module.css";

type props = {
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  addValue?: Function;
  id: string;
  className?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

type inputProps = props & Omit<CSS_PROPS_TYPES, "size">;

const Input: React.FC<inputProps> = ({ addValue, className, ...props }) => {
  const [classNamesInput] = cssClassAndStyleBuilder(props, inputStyles);

  return (
    <>
      <input
        type={props.type ? props.type : "text"}
        className={`${inputStyles.default} ${classNamesInput} ${className}`}
        {...props}
      ></input>
    </>
  );
};

export default Input;
