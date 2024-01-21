import React from "react";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import PostCard from "../component/PostCard";

const ProfilePage = ({ user }) => {
  return (
    <>
      <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
        {user.nick}
      </Avatar>
    </>
  );
};

export default ProfilePage;
