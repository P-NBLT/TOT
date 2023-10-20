import React from "react";
import { Card, ProfilePic, Typography } from "@/app/components";
import profileCardStyle from "./css/profileCard.module.css";
import { userData } from "./mockup";
import { useUser } from "@/app/controllers/userProvider";

const ProfileCard: React.FC = () => {
  const { user } = useUser();
  return (
    <Card variant="feedComponentCard-sidebar">
      <div className={profileCardStyle.main}>
        <div className={profileCardStyle["main-decor"]} />
        <ProfilePic
          source={user?.profilePic!}
          location="profile"
          margin={"10px 0"}
          zIndex={1}
        />
        <Typography>{user?.username}</Typography>
      </div>
      <div className={profileCardStyle.info}>
        <Typography>Faction: {user?.affinity}</Typography>
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
