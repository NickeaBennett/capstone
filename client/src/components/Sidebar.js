import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch("/users")
        .then((r) => r.json())
        .then(setUsers);
    }, []);

  return (
    <div className='sidebar'>
        <h2> Suggestions </h2>
        ________________________
        {users.map((user) => 
        <article key={user.id} style={{fontSize:'1.3rem',width:'min-content', display:'flex'}} >
            <h3>{user.username}</h3>
            <Link to={`/users/${user.id}`}><button className='btn'>Profile</button></Link>
        </article>)}
    </div>
  )
}

export default Sidebar;