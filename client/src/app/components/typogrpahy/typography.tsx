import React from "react";
import typographyStyles from "./typography.module.css";
import { cssClassAndStyleBuilder } from "@/app/utils/css";
import { CSS_PROPS_TYPES } from "@/app/types/css";

type props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
};

type TypographyTypes = props & Omit<CSS_PROPS_TYPES, "size">;

const Typography: React.FC<TypographyTypes> = ({
  children,
  onClick,
  ...props
}) => {
  const [classNames] = cssClassAndStyleBuilder(props, typographyStyles);

  return (
    <p
      {...props}
      className={classNames ? classNames : typographyStyles.default}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export default Typography;
