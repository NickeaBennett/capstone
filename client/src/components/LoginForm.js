import React, { useState } from 'react';

function LoginForm({ onLogin }){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])


    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((err) => {
                    setErrors(err.errors)});
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <formfield>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}    
                    />
                </formfield>
                <formfield>
                    <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </formfield>
                <formfield>
                    <button variant="fill" color="primary" type="submit">
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </formfield>
                <div>{errors.map((err) => (
                    <error key={err}>{err}</error>
                ))}</div>
            </form>
        </div>
    );
}


export default LoginForm;