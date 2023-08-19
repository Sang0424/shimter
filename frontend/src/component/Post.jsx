import "./Post.scss";
import PostCard from "./PostCard";

const Post = ({ title, content, nick, createdAt, img }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const imgSrc = `${serverUrl}${img}`;
  return (
    // <div className="contents">
    //   <div className="userInfo">
    //     <div className="circle"></div>
    //     <div className="nickname">{nick}</div>
    //     <div className="createdAt">{createdAt}</div>
    //   </div>
    //   <p className="postName">{title}</p>
    //   {img && <img className="contentImg" src={imgSrc}></img>}
    //   <p className="content">{content}</p>
    // </div>
    <PostCard
      title={title}
      content={content}
      nick={nick}
      createdAt={createdAt}
      imgSrc={imgSrc}
    ></PostCard>
  );
};

export default Post;
