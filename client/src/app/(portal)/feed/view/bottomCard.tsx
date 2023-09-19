import React from "react";
import bottomCardStyle from "./css/bottomCard.module.css";
import { useWindowSize } from "@/app/hooks/useWindowSize";
import { Typography } from "@/app/components";

type BottomCardProps = {
  parentWidth: number;
};

const BottomCard: React.FC<BottomCardProps> = ({ parentWidth }) => {
  const { clientWidth } = useWindowSize();

  const fakeMessages = [
    { author: "Darth Vader", content: "Hello" },
    {
      author: "Luke Skywalker",
      content: "Father!? you servived the blow of the death star?",
    },
    { author: "Obiwan", content: "Luke the force is strong in your father" },
  ];

  return (
    <>
      {clientWidth && (
        <>
          <div
            className={bottomCardStyle.container}
            // @ts-ignore
            style={{ "--margin": `${(clientWidth! - parentWidth) / 2}px` }}
          >
            <div className={bottomCardStyle.header}>
              <Typography fontSize={14} color="white">
                Global Net
              </Typography>
            </div>
            {fakeMessages.map((message, idx) => (
              <div key={idx} className={bottomCardStyle.messageContainer}>
                <Typography color="gold" fontSize={12}>
                  {message.author}:{" "}
                </Typography>
                <Typography color="white" fontSize={12}>
                  {message.content}
                </Typography>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default BottomCard;
