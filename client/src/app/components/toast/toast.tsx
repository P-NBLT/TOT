import React from "react";
import { Typography } from "..";
import toastStyle from "./toast.module.css";
import { RxCross2 } from "react-icons/rx";

type ToastProps = {
  type: string;
  message: string;
  show: boolean;
};

const Toast: React.FC<ToastProps> = ({ type, message, show }) => {
  return (
    <div
      className={`${toastStyle.default} ${toastStyle[type]} ${
        show ? toastStyle.show : ""
      }`}
    >
      <RxCross2
        style={{
          width: 15,
          backgroundColor: "white",
          color: "red",
          borderRadius: 50,
        }}
      />
      <Typography color="inherit">{message}</Typography>
    </div>
  );
};

export default Toast;
