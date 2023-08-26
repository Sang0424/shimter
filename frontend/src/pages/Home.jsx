import { PostList } from "../component/PostList";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  return (
    <Suspense fallback={<Skeleton></Skeleton>}>
      <PostList user={user}></PostList>
    </Suspense>
  );
};

export default HomePage;
