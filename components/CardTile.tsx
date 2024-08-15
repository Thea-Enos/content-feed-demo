import React from "react";

import CommentTile from "./CommentTile";

const CardTile = ({ contentCard }: { contentCard: CardMassaged }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-center">
      <div>
        <img src={contentCard.imageUri} alt={"Content Card Image"} />
        <div>{contentCard.title}</div>
        <div>{contentCard.subTitle}</div>
        <div>{contentCard.body}</div>
        <div>By {contentCard.author}</div>
        <div> {contentCard.priority}/100</div>
        <div>{contentCard.publishDate}</div>
        <div>
          Comments:{" "}
          {contentCard.comments.map((comment, index: number) => (
            <CommentTile key={index} comment={comment} />
          ))}
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 p-4 rounded-full bg-gray-800 text-white"
      >
        ↑
      </button>
    </div>
  );
};

export default CardTile;
