import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentFeed from "../comments/CommentFeed";
import NewComment from "../comments/NewComment";
import { Divider } from "@mui/material";

function PostProfile() {
  const [post, setPost] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/posts/${id}`)
      .then((r) => r.json())
      .then(setPost);
  }, []);

  function handleDelete(e) {
    e.preventDefault();
    fetch(`/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        navigate("/posts");
      } else {
        r.json();
      }
    });
  }

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardMedia
        component="img"
        height="500"
        image={post.image_url}
        alt={post.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <h1>{post.title}</h1>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDelete}>
          Delete
        </Button>
        <Button size="small">Edit</Button>
      </CardActions>
      <Divider />
      <div>
        <Divider variant="inset" />
        <CommentFeed />
        <Divider variant="inset" />
      </div>
      <div>
        <Divider variant="inset" />
        <NewComment post={post} />
      </div>
    </Card>
  );
}

export default PostProfile;
