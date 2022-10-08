import React, { useEffect, useState } from "react";
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
  Visibility,
  Comment,
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
// import uuid from "uuid";
import uuid from "react-uuid";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "../../postsSlice";
import { Link } from "react-router-dom";

function PostCard() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  //   const key_id = uuid();

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

  console.log(posts.data);

  return (
    <div className="div-newhome">
      <div>
        {posts.map((post) => (
          <div key={uuid()}>
            {post.map((project) => (
              <Card key={uuid()} sx={{ margin: 5 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      key={uuid()}
                      sx={{ bgcolor: "red" }}
                      aria-label="recipe"
                    >
                      {users.map((user) => (
                        <Link key={uuid()} to={`/users/${project.user.id}`}>
                          <img
                            key={uuid()}
                            src={project.user.image_url}
                            width="75px"
                            height="75px"
                          ></img>
                        </Link>
                      ))}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVert />
                    </IconButton>
                  }
                  title={project.user.username}
                  subheader="September 14, 2022"
                />
                <h2>{project.title}</h2>
                <CardMedia
                  component="img"
                  height="20%"
                  image={project.image_url}
                  alt={project.title}
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
                  <Link to={`/posts/${project.id}`}>
                    <IconButton aria-label="visibility">
                      <Visibility />
                    </IconButton>
                  </Link>
                  <IconButton aria-label="comment">
                    <Comment />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Share />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostCard;
