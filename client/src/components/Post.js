import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CommentFeed from './CommentFeed';
import NewComment from './NewComment';

function Post() {

    const [post, setPost] = useState("")

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
        if(r.ok) {
            navigate("/posts");
        } else {
            r.json()
        }
    });
  }

  return(
    <div className='comment-body'>
        <div className='post-head'><h1>{post.title}</h1></div>
        <img src={post.image_url} width="960" height="540" alt='This is a post'></img>
        <div className='container'><p className='caption'>{post.text}</p></div>
        <div className='div-feed'>
          <CommentFeed />
        </div>
        <div>
          <NewComment post={post} />
        </div>
        <div>
          <button className='btn' onClick={handleDelete}>Delete post</button>
        </div>
    </div>
  );
}

export default Post;