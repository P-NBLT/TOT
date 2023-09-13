import React from "react";
import cardStyles from "./card.module.css";

type CardProps = {
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <div>{children}</div>;
};

export default Card;
