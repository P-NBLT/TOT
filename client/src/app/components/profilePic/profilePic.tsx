import React from "react";
import Image from "next/image";
import picStyle from "./profilePic.module.css";
import { useWindowSize } from "@/app/hooks/useWindowSize";

type ProfilePicProps = {
  source: string;
  location: "profile" | "comment" | "engagement";
};

const ProfilePic: React.FC<ProfilePicProps> = ({ source, location }) => {
  const { width } = useWindowSize();
  const picDimensions = {
    desktop: { profile: 80, comment: 40, engagement: 30 },
    mobile: { profile: 35, comment: 35, engagement: 20 },
  };
  const picDevice = width! < 500 ? picDimensions.mobile : picDimensions.desktop;
  const imageWidth = picDevice[location];
  console.log("width", imageWidth);
  return (
    <Image
      alt="profile picture"
      src={source}
      width={imageWidth}
      height={imageWidth}
      className={picStyle.pic}
    />
  );
};

export default ProfilePic;
