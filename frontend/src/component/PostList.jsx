import PostCard from "./PostCard";
import "./PostList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

export const PostList = ({ user }) => {
  //const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getBoardList = async () => {
      try {
        const { data } = await axios.get("/api/home");
        setTimeout(() => {
          setBoardList(data);
        }, 0);
        setReload(false);
      } catch (error) {
        console.error(error);
      }
    };
    getBoardList();
  }, [reload]);
  return (
    <>
      {user.id > 0 && (
        <Link to="/write">
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            {user.nick}
          </Avatar>
          <input
            className="writeForm"
            type="text"
            placeholder="글쓰기"
            size="80"
          ></input>
        </Link>
      )}
      {boardList.length > 0 ? (
        <div className="container">
          {boardList.map((item) => (
            <PostCard
              key={item.id}
              id={item.id}
              writer={item.User}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
              img={item.img}
              comments={item.Comments}
              likeCount={item.likes}
              user={user}
              setReload={setReload}
              isDetail={false}
            ></PostCard>
          ))}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

//export default PostList;
