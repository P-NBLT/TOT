import React from "react";
import {
  Button,
  Card,
  Input,
  ProfilePic,
  Typography,
} from "../../../components";
import Image, { StaticImageData } from "next/image";
import postStyles from "./css/post.module.css";
import { AiTwotoneLike } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { BiCommentDetail, BiRepost } from "react-icons/bi";

// for development only
import pic from "@/assets/images/google.png";

type PostProps = {
  author: authorProps;
  content: string;
  contentPic?: StaticImageData;
  engagement?: EngagementsProps;
  metrics: MetricProps;
  //   comments?: {
  //     content: string;                       I need to think this more through.
  //     metrics: MetricProps;                  leave comment for now.
  //     engagement?: EngagementsProps;
  //   }[];
};

type authorProps = {
  name: string;
  authorPic: StaticImageData;
  faction: string;
};

type EngagementsProps = {
  engagementAuthor: authorProps;
  type: "like" | "comment" | "share";
  engagementComment?: {
    content: string;
    metrics: MetricProps;
    engagement?: EngagementsProps;
  };
};

type MetricProps = {
  likes: number;
  comments: number;
};

const Post: React.FC<PostProps> = ({
  engagement,
  content,
  author,
  metrics,
}) => {
  return (
    <Card variant="post">
      {engagement && (
        <EngagementBar
          engagementAuthor={engagement.engagementAuthor}
          type={engagement.type}
        />
      )}

      <ContentSection
        author={author}
        content={content}
        engagementAuthor={engagement?.engagementAuthor.name}
      />
      <EngagementMetric metrics={metrics} />

      <ActionButtons />
      {engagement?.type === "comment" && (
        <CommentSection engagement={engagement} />
      )}
    </Card>
  );
};

export default Post;

type ProfileDisplayProps = Pick<EngagementsProps, "type" | "engagementAuthor">;

const EngagementBar: React.FC<ProfileDisplayProps> = ({
  engagementAuthor,
  type,
}) => {
  const actionWord = { comment: "commented", like: "liked", share: "shared" };
  const action = actionWord[type];
  return (
    <div className={postStyles.engagementBar}>
      <ProfilePic
        source={engagementAuthor.authorPic.src}
        location={"engagement"}
      />
      {action && (
        <Typography>
          {engagementAuthor.name} {action} this{" "}
        </Typography>
      )}
    </div>
  );
};

type ContentSectionProps = {
  content: string;
  contentPic?: StaticImageData;
  engagementAuthor?: string;

  author: { name: string; authorPic: StaticImageData; faction: string };
};

const ContentSection: React.FC<ContentSectionProps> = ({
  content,
  author,
  engagementAuthor,
}) => {
  return (
    <div
      className={`${postStyles.contentSection} ${
        engagementAuthor && postStyles["padding-top"]
      }`}
    >
      <div className={postStyles.contentSectionAuthorField}>
        <ProfilePic source={author.authorPic.src} location={"comment"} />
        <div>
          <Typography>{author.name}</Typography>
          <Typography>{author.faction}</Typography>
        </div>
      </div>
      <div className={postStyles.contentSectionContentField}>
        <Typography>{content}</Typography>
        <Image
          width={200}
          height={200}
          alt="content"
          src={pic.src}
          className={postStyles.contentSectionImage}
        />
      </div>
    </div>
  );
};

const EngagementMetric: React.FC<Pick<PostProps, "metrics">> = ({
  metrics,
}) => {
  return (
    <div className={postStyles.metricSection}>
      <Typography>
        {metrics.likes > 1 ? metrics.likes + " likes" : metrics.likes + " like"}
      </Typography>
      <Typography>
        {metrics.comments > 1
          ? metrics.comments + " comments"
          : metrics.comments + " comment"}
      </Typography>
    </div>
  );
};

const ActionButtons: React.FC = () => {
  return (
    <div className={postStyles.buttonActions}>
      <Button variant="post-action">
        <AiTwotoneLike className={postStyles.buttonActionsIcon} />
        Like
      </Button>
      <Button variant="post-action">
        <BiCommentDetail className={postStyles.buttonActionsIcon} />
        Comments
      </Button>
      <Button variant="post-action">
        <BiRepost className={postStyles.buttonActionsIcon} />
        Repost
      </Button>
      <Button variant="post-action">
        <IoSend className={postStyles.buttonActionsIcon} />
        Send
      </Button>
    </div>
  );
};

const CommentSection: React.FC<Pick<PostProps, "engagement">> = ({
  engagement,
}) => {
  const { engagementAuthor, engagementComment } = engagement!;
  return (
    <div>
      <div className={postStyles.postCommentSectionContainer}>
        {/* user pic */}
        <ProfilePic source={pic.src} location="comment" />
        <div className={postStyles.postInput}>
          <Input id="comment" height={40} style={{ borderRadius: 20 }} />
          <Button>Post</Button>
        </div>
      </div>
      <div className={postStyles.commentPostContainer}>
        <ProfilePic
          source={engagementAuthor.authorPic.src}
          location="comment"
        />
        {engagementComment?.content && (
          <>
            <CommentCard
              engagementAuthor={engagementAuthor}
              engagementComment={engagementComment}
            />
          </>
        )}
      </div>
    </div>
  );
};

const CommentCard: React.FC<
  Pick<EngagementsProps, "engagementAuthor" | "engagementComment">
> = ({ engagementAuthor, engagementComment }) => {
  return (
    <div className={postStyles.commentSection}>
      <Card variant="comment">
        <div>
          <Typography>{engagementAuthor.name}</Typography>
          <Typography>Faction {engagementAuthor.faction}</Typography>
        </div>
        <div>
          <Typography>{engagementComment!.content}</Typography>
        </div>
      </Card>
      <div className={postStyles.commentIntereactionButtonContainer}>
        <Button variant="commentary">Like</Button>
        <Button variant="commentary">Reply</Button>
      </div>
    </div>
  );
};
