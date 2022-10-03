import React from "react";
import { Box } from "@mui/material";
import FeedCard from "./FeedCard";
import { useState, useEffect } from "react";
// import { Post } from "./Post";
// import { PostForm } from "../Posts/PostForm";
import { Project } from "../../../types/data";
import axios from "axios";

const Feed = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isUpdate, setUpdate] = useState<boolean>(false)

  return (
    <Box flex={2} p={2}>
      {/* <FeedCard /> */}
    </Box>
  );
}

export default Feed;
