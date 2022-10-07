import React from 'react';
import { Link } from 'react-router-dom'

function Navbar({ user, setUser}) {

    function handleLogoutClick(){
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    return (
        <>
            <nav>
                <div className='div-header'>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <Link to="/new" className='btn'>
                            New Post
                        </Link>
                        <h2>Welcome to Crystagram, {user.username}</h2>
                    </div>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <Link to="/posts" className='btn'>
                            Main Feed
                        </Link>
                        <Link to="/me" className='btn'>
                            User Profile
                        </Link>
                        <button onClick={handleLogoutClick} className='btn'>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
