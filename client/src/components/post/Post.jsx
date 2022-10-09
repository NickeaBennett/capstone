import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import CommentFeed from "../comments/CommentFeed";
import NewComment from "../../components/comments/NewComment";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
import { Container, Divider } from "@mui/material";

function Post() {
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
        navigate("/me");
      } else {
        r.json();
      }
    });
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <Item>
          <Card>
            <CardMedia
              component="img"
              alt={post.title}
              height="500"
              // width="900"
              image={post.image_url}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
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
          </Card>
        </Item>
        <Item>
          <CommentFeed />
        </Item>
        <Item>
          <NewComment post={post} />
        </Item>
      </Stack>
    </Box>
    // <Section></Section>
    // <div className="comment-body">
    //   <div className="post-head">
    //     <h1>{post.title}</h1>
    //   </div>
    //   <img
    //     src={post.image_url}
    //     width="960"
    //     height="540"
    //     alt="This is a post"
    //   ></img>
    //   <div className="container">
    //     <p className="caption">{post.text}</p>
    //   </div>
    //   <div className="div-feed">
    //     <CommentFeed />
    //   </div>
    //   <div>
    //     <NewComment post={post} />
    //   </div>
    //   <div>
    //     <button className="btn" onClick={handleDelete}>
    //       Delete post
    //     </button>
    //   </div>
    // </div>
  );
}

export default Post;
