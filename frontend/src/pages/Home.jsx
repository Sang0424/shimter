import { PostList } from "../component/PostList";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";

const HomePage = ({ user }) => {
  return (
    <Suspense fallback={<Skeleton></Skeleton>}>
      <PostList user={user}></PostList>
    </Suspense>
  );
};

export default HomePage;
