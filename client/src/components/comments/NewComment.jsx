import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function NewComment({ post }) {
  const [text, setText] = useState("");
  const [post_id, setPost_id] = useState(`${post.id}`);

  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`/posts/${post.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        post_id,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        window.location.reload();
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <Box>
      <form onSubmit={handleSubmit} id={post.id}>
        <label htmlFor="text"></label>
        <TextField
          fullWidth
          label="fullWidth"
          // id="fullWidth"
          multiline
          type="text"
          id="text"
          rows="2"
          maxRows={4}
          placeholder="Comment here..."
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" className="btn">
          Submit
        </Button>
        <div>
          {errors.map((err) => (
            <error key={err}>{err}</error>
          ))}
        </div>
      </form>
    </Box>
  );
  // return (
  //   <Box
  //     sx={{
  //       m: 2,
  //       p: 5,
  //       width: 500,
  //       maxWidth: "100%",
  //     }}
  //   >
  //     <form onSubmit={handleSubmit} id={post.id}>
  //       <label htmlFor="text"></label>
  //       <TextField
  //         fullWidth
  //         required
  //         label="comment"
  //         type="text"
  //         id="text"
  //         rows="10"
  //         placeholder="Comment here..."
  //         onChange={(e) => setText(e.target.value)}
  //       />
  //       <Button>Add comment</Button>
  //       <div>
  //         {errors.map((err) => (
  //           <error key={err}>{err}</error>
  //         ))}
  //       </div>
  //     </form>
  //   </Box>
  // );
}

export default NewComment;
