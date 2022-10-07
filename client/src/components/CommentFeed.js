import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'

function CommentFeed() {
  
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState("")

  const { id } = useParams()

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

  return (
    <div className='comment'>
        <ol className='comment-body'>
          {comments.map((comment) => (
            <li key={comment.id} className='task'>
              <h3>{comment.user.username}</h3>
              <img src={comment.user.image_url} alt='profile picture' style={{width:'75px', height:'75px',}}></img>
              <br></br>
              <br></br>
              {comment.text}
              <br></br>
              ______________________________
              <br></br>
              Post created at: {format(new Date(comment.created_at), 'yyyy/MM/dd kk:mm:ss')}
            </li>
          ))}
        </ol>
    </div>
  )
}

export default CommentFeed;