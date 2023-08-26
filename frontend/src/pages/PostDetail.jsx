import PostCard from "../component/PostCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const PostDetail = () => {
  const user = useSelector((state) => state.user);
  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    const detailPost = async () => {
      try {
        const { data } = await axios.get(`/api/detail/${postId}`);
        setPostInfo(data);
      } catch (err) {
        console.log(err);
      }
    };
    detailPost();
  }, [postId]);
  const { id, title, content, createdAt, img, Comments } = postInfo;
  console.log(user);
  return (
    <PostCard
      user={user}
      id={id}
      title={title}
      content={content}
      createdAt={createdAt}
      img={img}
      comments={Comments}
    ></PostCard>
  );
};

export default PostDetail;
