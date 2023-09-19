import { Card, Input, ProfilePic } from "@/app/components";
import React from "react";
import { userData } from "@/app/(portal)/feed/view/mockup";

const CreatePostCard: React.FC = () => {
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
      <ProfilePic location="comment" source={userData.profilePic.src} />
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
