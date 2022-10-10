import { Button, Container, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function NewPost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
        image_url: imageUrl,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        navigate("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Container>
      <Stack>
        <h1>Create Project</h1>
        <form onSubmit={handleSubmit} className="formstyle">
          <label htmlFor="title">Collection Name</label>
          <TextField
            required
            type="text"
            id="title"
            placeholder="Collection Name"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br></br>
          <label htmlFor="text">Description</label>
          <TextField
            required
            type="text"
            id="text"
            rows="10"
            placeholder="My Description"
            onChange={(e) => setText(e.target.value)}
          />
          <br></br>
          <label htmlFor="imageUrl">Image</label>
          <TextField
            required
            type="text"
            rows={1}
            id="imageUrl"
            placeholder="Collection image"
            onChange={(e) => setImageUrl(e.target.value)}
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
      </Stack>
    </Container>
  );
}

export default NewPost;
