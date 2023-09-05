import PostCard from "../component/PostCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PostDetail.scss";

const PostDetail = ({ user }) => {
  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [writer, setWriter] = useState({});
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const detailPost = async () => {
      try {
        const { data } = await axios.get(`/api/detail/${postId}`);
        setTimeout(() => {
          setPostInfo(data);
        }, 0);
        setReload(false);
      } catch (err) {
        console.log(err);
      }
    };
    detailPost();
  }, [postId, reload]);
  useEffect(() => {
    if (postInfo.User) {
      setWriter(postInfo.User);
    }
  }, [postInfo.User]);
  return postInfo.id ? (
    <PostCard
      user={user}
      id={postInfo.id}
      writer={writer}
      title={postInfo.title}
      content={postInfo.content}
      createdAt={postInfo.createdAt}
      img={postInfo.img}
      comments={postInfo.Comments}
      setReload={setReload}
      isDetail={true}
    ></PostCard>
  ) : (
    <p>loading ...</p>
  );
};

export default PostDetail;
