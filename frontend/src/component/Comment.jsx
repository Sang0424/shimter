import axios from "axios";
import { useState, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

const CommentForm = ({ user, id, setReload }) => {
  const [commentText, setCommentText] = useState("");
  const commenter = user.nick;
  const userId = user.id;
  const postId = id;
  const handleSubmitComment = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const commentForm = new FormData();
        commentForm.append("comment", commentText);
        commentForm.append("commenter", commenter);
        commentForm.append("userId", userId);
        commentForm.append("postId", postId);
        await axios
          .post("/api/comment", commentForm)
          .then(() => setReload(true))
          .then(() => setCommentText(""));
      } catch (err) {
        console.log(err);
      }
    },
    [commentText, userId, postId, commenter, setReload]
  );
  return (
    <form onSubmit={handleSubmitComment}>
      <input
        type="text"
        name="comment"
        value={commentText}
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
      ></input>
      <button>댓글 작성</button>
    </form>
  );
};

const CommentList = ({ comments, user, id, setReload }) => {
  return (
    <>
      {user.id > 0 && (
        <CommentForm user={user} id={id} setReload={setReload}></CommentForm>
      )}
      <div>
        <ul>
          {comments.length > 0 &&
            comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                    {comment.commenter}
                  </Avatar>
                  {comment.comment}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default CommentList;
