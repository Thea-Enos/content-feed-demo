import React from "react";

const CommentTile = ({ comment }: { comment: Comment }) => {
  return (
    <div className="border p-4 mb-4">
      <div>
        {"'"}
        {comment.text}
        {"'"}
      </div>
      <div>- {comment.author}</div>
      <img src={comment.profilePic} alt={"Commenter's Profile Pic"} />
      <div>{comment.likes} likes</div>
    </div>
  );
};

export default CommentTile;
