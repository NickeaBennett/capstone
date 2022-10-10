import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";

function CommentFeed() {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState("");
  const [deleteComment, setDeleteComment] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetch(`/posts/${id}`)
      .then((r) => r.json())
      .then(setPost);
  }, []);

  useEffect(() => {
    fetch(`/posts/${id}/comments`)
      .then((r) => r.json())
      .then(setComments);
  }, []);

  function handleDelete(e) {
    e.preventDefault();
    fetch(`/posts/${id}/comments/${id}`, {
      // fetch(`posts/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        // navigate("/me");
      } else {
        r.json();
      }
    });
    console.log(id);
  }

  return (
    <Box sx={{ m: 2, p: 5 }}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            alignItems="flex-start"
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Divider />
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={comment.user.image_url} />
            </ListItemAvatar>
            <ListItemText
              primary={comment.user.username}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.text}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default CommentFeed;
