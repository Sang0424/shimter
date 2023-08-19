import Post from "./Post";
import "./PostList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const PostList = () => {
  const user = useSelector((state) => {
    return state.user.id > 0;
  });
  //const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    const getBoardList = async () => {
      try {
        const { data } = await axios.get("/api");
        setBoardList(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBoardList();
  }, []);
  return (
    <>
      {user && (
        <Link to="/write">
          <input
            className="writeForm"
            type="text"
            placeholder="글쓰기"
            size="80"
          ></input>
        </Link>
      )}
      <div className="container">
        {boardList.map((item) => (
          <Post
            key={item.id}
            title={item.title}
            content={item.content}
            nick={item.User.nick}
            createdAt={item.createdAt}
            img={item.img}
          ></Post>
        ))}
      </div>
    </>
  );
};

//export default PostList;
