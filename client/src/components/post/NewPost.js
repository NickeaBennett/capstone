import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewPost() {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

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
            if(r.ok) {
                navigate("/posts");
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }
    

  return(
    <div>
        <h1>Create Post</h1>
            <form onSubmit={handleSubmit} className='formstyle'>
                <label htmlFor='title'>Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="My Title"
                    onChange={(e) => setTitle(e.target.value)}
                 />
                 <br></br>
                <label htmlFor='text'>Description</label>
                <textarea
                    type="text"
                    id="text"
                    rows="10"
                    placeholder="My Description"
                    onChange={(e) => setText(e.target.value)}
                 />
                 <br></br>
                <label htmlFor='imageUrl'>Screenshot</label>
                <textarea
                    type="text"
                    rows={5}
                    id="imageUrl"
                    placeholder="My Screenshot"
                    onChange={(e) => setImageUrl(e.target.value)}
                 />
                <button type="submit" className='btn'>
                    Submit
                </button>
                <div>{errors.map((err) => (
                    <error key={err}>{err}</error>
                ))}</div>
            </form>
    </div>
  )
};


export default NewPost;