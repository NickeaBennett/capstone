import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "../../postsSlice";
import { v4 as uuid } from "uuid";

import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
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

const PostCard = () => {
  const posts = useSelector((state) => state.posts);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const keyId = uuid();

  useEffect(() => {
    fetch("/posts")
      .then((r) => r.json())
      .then((posts) => dispatch(setPost(posts)));
  }, []);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  return (
    <Card>
      {/* <div> */}
      {posts.map((post) => (
        <div key={keyId}>
          {post.map((project) => (
            <Card key={project.id} sx={{ margin: 5 }}>
              <CardHeader
                avatar={
                  <Link to={`/users/${project.user.id}`}>
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                      <img
                        src={project.user.image_url}
                        width="75px"
                        height="75px"
                      ></img>
                    </Avatar>
                  </Link>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
                title={project.user.username}
                subheader="September 14, 2022"
              />
              <CardMedia
                component="img"
                height="20%"
                image={project.image_url}
                alt={project.title}
              />
              <CardContent>
                {project.title}
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
                <Link to={`/posts/${project.id}`}>
                  <IconButton aria-label="share">
                    <Visibility />
                  </IconButton>
                </Link>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </div>
      ))}
      {/* </div> */}
    </Card>
  );
};

export default PostCard;
