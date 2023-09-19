import React from "react";
import { Card, ProfilePic, Typography } from "@/app/components";
import profileCardStyle from "./css/profileCard.module.css";
import { userData } from "@/app/(portal)/feed/view/mockup";

const ProfileCard: React.FC = () => {
  return (
    <Card variant="feedComponentCard-sidebar">
      <div className={profileCardStyle.main}>
        <div className={profileCardStyle["main-decor"]} />
        <ProfilePic
          source={userData.profilePic.src}
          location="profile"
          margin={"10px 0"}
          zIndex={1}
        />
        <Typography>{userData.username}</Typography>
      </div>
      <div className={profileCardStyle.info}>
        <Typography>Faction: {userData.faction}</Typography>
        <Typography>Post: 4</Typography>
      </div>
      <div className={profileCardStyle.featureContainer}>
        <Typography>Fake feature 1</Typography>
        <Typography>Fake feature 2</Typography>
      </div>
    </Card>
  );
};

export default ProfileCard;
