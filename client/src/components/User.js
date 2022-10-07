import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function User() {

    const [user, setUser] = useState("")

    const navigate = useNavigate();
    const { id } = useParams();
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch(`/users/${id}`)
            .then((r) => r.json())
            .then(setUser);
    }, []);

    function handleClick(e) {
        e.preventDefault();
        fetch(`/users/${id}/follow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((r) => {
            if(r.ok) {
                navigate("/posts");
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    function handleUnfollow(e) {
        e.preventDefault();
        fetch(`/users/${id}/unfollow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((r) => {
            if(r.ok) {
                navigate("/posts");
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

  return(
      <div>
          <div style={{width:'80%',margin:'0 auto',display:'flex',flexDirection:'row',marginTop:'25px'}}>
            <div style={{width:'40%'}}>
                <img src={user.image_url} alt='profile picture' style={{width:'150px', height:'150px', position:'relative',left:'50%'}}></img>
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{fontSize:'2.5rem'}}>{user.username}</div>
                <div style={{fontWeight:'bold'}}>{user.bio}</div>
                <div>{user.email}</div>
            </div>
        </div>
        <div style={{width:'80%',marginLeft:'850px',display:'flex',flexDirection:'row',marginTop:'25px'}}>
            <button className='btn' key={user.id} onClick={handleClick}>Follow</button>
            <button className='btn' key={user.id} onClick={handleUnfollow}>Unfollow</button>
        </div>
      </div>
  );
}

export default User;