import React from "react";
import Image from "next/image";
import picStyle from "./profilePic.module.css";
import { useWindowSize } from "@/app/hooks/useWindowSize";
import { cssClassAndStyleBuilder } from "@/app/utils/css";
import { CSS_PROPS_TYPES } from "@/app/types/css";

type ProfilePicProps = {
  source: string;
  location:
    | "profile"
    | "comment"
    | "engagement"
    | "bubbleMessage"
    | "inboxMessage";
  dimension?: number;
  className?: any;
};

const ProfilePic: React.FC<
  ProfilePicProps & Omit<CSS_PROPS_TYPES, "height" | "width">
> = ({ source, location, ...props }) => {
  const { width } = useWindowSize();
  cssClassAndStyleBuilder(props);
  const picDimensions = {
    desktop: {
      profile: 80,
      comment: 40,
      engagement: 30,
      bubbleMessage: 32,
      inboxMessage: 48,
    },
    mobile: {
      profile: 35,
      comment: 35,
      engagement: 20,
      bubbleMessage: 0,
      inboxMessage: 0,
    },
  };
  const picDevice = width! < 500 ? picDimensions.mobile : picDimensions.desktop;
  const imageWidth = picDevice[location];

  return (
    <Image
      alt="profile picture"
      src={source}
      width={imageWidth}
      height={imageWidth}
      className={`${picStyle.pic}`}
      {...props}
    />
  );
};

export default ProfilePic;
