import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function EditProfile( {user} ) {

    const [username, setUsername] = useState(`${user.username}`)
    const [email, setEmail] = useState(`${user.email}`)
    const [imageUrl, setImageUrl] = useState(`${user.image_url}`)
    const [bio, setBio] = useState(`${user.bio}`)
  
    const [isLoading, setIsLoading] = useState(false);
  
    const navigate = useNavigate();
  
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      fetch(`/users/${user.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username: username,
              email: email,
              bio: bio,
              image_url: imageUrl,
          }),
      }).then((r) => {
          setIsLoading(false);
          if(r.ok) {
              navigate(`/me`);
          } else {
              r.json()
          }
      });
  }

  return (
    <div>
        <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit} className='formstyle'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor='bio'>Bio</label>
                    <textarea
                        type="text"
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <label htmlFor='imageUrl'>Profile Picture</label>
                    <input
                        type="imageUrl"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <button className='btn' type='submit' >Submit</button>
            </form>
    </div>
  )
}

export default EditProfile