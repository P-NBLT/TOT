import React, { useEffect, useRef, useState } from "react";
import viewStyles from "./css/view.module.css";
import ProfileCard from "./profileCard";
import RigthCard from "./rightCard";
import Post from "@/app/(portal)/feed/view/post";
import { feedData as postData } from "@/app/(portal)/feed/view/mockup";
import BottomCard from "./bottomCard";
import { useDeviceDetect } from "@/app/hooks/useDeviceDetect";
import MessagingBoxCard from "./messagingBoxCard";
import CreatePostCard from "./createPostCard";

type ViewProps = {
  children: React.ReactNode;
};

const View: React.FC = ({}) => {
  const { isMobile } = useDeviceDetect();
  const parentDivRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (parentDivRef.current) {
        // @ts-ignore
        setParentWidth(parentDivRef.current?.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          {postData.map((post, idx) => (
            <Post
              author={post.author}
              content={post.content}
              metrics={post.metrics}
              //@ts-ignore
              engagement={post.engagement}
              key={idx}
            />
          ))}
        </>
      ) : (
        <>
          <div className={viewStyles.master} ref={parentDivRef}>
            <ProfileCard />
            <div className={viewStyles.main}>
              <CreatePostCard />
              {postData.map((post, idx) => (
                <Post
                  author={post.author}
                  content={post.content}
                  metrics={post.metrics}
                  //@ts-ignore
                  engagement={post.engagement}
                  key={idx}
                />
              ))}
              <BottomCard parentWidth={parentWidth} />
            </div>
            <RigthCard />
            <MessagingBoxCard />
          </div>
        </>
      )}
    </>
  );
};

export default View;
