import React from "react";
import cardStyles from "./card.module.css";
import { cssClassAndStyleBuilder } from "@/app/utils/css";

type CardProps = {
  children: React.ReactNode;
  variant?: string;
  className?: any;
  style?: any;
};

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  const [classNames] = cssClassAndStyleBuilder(props, cardStyles);
  return (
    <div
      className={`${cardStyles.container} ${classNames} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
