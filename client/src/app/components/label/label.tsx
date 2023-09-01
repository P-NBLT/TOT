import React from "react";
import { CSS_PROPS_TYPES } from "@/app/types/css";
import { cssClassAndStyleBuilder } from "../../utils/css";
import labelStyles from "./label.module.css";

type props = {
  id: string;
  name: string;
};

type LabelProps = props & CSS_PROPS_TYPES;

const Label: React.FC<LabelProps> = ({ id, name, ...props }) => {
  const [classNames] = cssClassAndStyleBuilder(props);

  return (
    <label
      {...props}
      htmlFor={id}
      className={`${labelStyles.default} ${classNames}`}
    >
      {name}
    </label>
  );
};

export default Label;
