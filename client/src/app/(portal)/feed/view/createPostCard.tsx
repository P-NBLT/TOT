import { Card, Input, ProfilePic } from "@/app/components";
import React from "react";
import { useUser } from "@/app/controllers/userProvider";
import avatarPic from "@/assets/images/avatar.png";

const CreatePostCard: React.FC = () => {
  const { user } = useUser();
  return (
    <Card
      style={{
        display: "flex",
        columnGap: "10px",
        borderRadius: 10,
        marginBottom: "10px",
        padding: "15px 10px",
      }}
    >
      <ProfilePic
        location="comment"
        source={user?.profilePic! || avatarPic.src}
      />
      <Input
        id="create-post"
        style={{
          flex: 1,
          borderRadius: 25,
          fontSize: 18,
          paddingLeft: 10,
          cursor: "pointer",
        }}
        placeholder="Create a post"
      />
    </Card>
  );
};

export default CreatePostCard;
