import React from "react";
import cardStyles from "./card.module.css";
import { cssClassAndStyleBuilder } from "@/app/utils/css";

type CardProps = {
  children: React.ReactNode;
  variant?: string;
};

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  const [classNames] = cssClassAndStyleBuilder(props, cardStyles);
  return (
    <div className={`${cardStyles.container} ${classNames}`}>{children}</div>
  );
};

export default Card;
