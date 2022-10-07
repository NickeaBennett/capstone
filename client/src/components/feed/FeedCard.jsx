import {
  Comment,
  Favorite,
  FavoriteBorder,
  Reviews,
  Visibility,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { IProject } from "../../../types/data";
// import { useEffect, useState } from "react";
// import Axios from "../../api/axios";
// import Feed from "./Feed";

import React from "react";

const FeedCard = (project) => {
  // const [getProject, setProject] = useState([]);
  // useEffect(() => {
  //   Axios.get("/projects")
  //     .then((res) => {
  //       setProject(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // title="Project name"
        title={project.title}
        subheader="Sale: September 14, 2023"
      />
      <CardMedia
        component="img"
        height="20%"
        // image="https://cdn.pixabay.com/photo/2022/02/18/16/09/ape-7020995_960_720.png"
        image={project.image_url}
        alt="Bored Ape NFT"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {project.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="visibility">
          <Visibility />
        </IconButton>
        <IconButton aria-label="comment">
          <Comment />
        </IconButton>
        <IconButton aria-label="review">
          <Reviews />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default FeedCard;
