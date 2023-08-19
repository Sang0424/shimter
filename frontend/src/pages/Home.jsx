import { PostList } from "../component/PostList";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";

const HomePage = () => {
  return (
    <Suspense fallback={<Skeleton></Skeleton>}>
      <PostList></PostList>
    </Suspense>
  );
};

export default HomePage;
