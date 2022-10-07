import React from 'react';
import LoginForm from '../../forms/LoginForm';
import SignUpForm from '../../forms/SignUpForm';
import { useState } from 'react';

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div className='div-login'>
            <wrapper>
                <h2>ViralNft.art</h2>
                <div style={{ height: '10px', width: '10px', alignSelf: 'center' }}></div>
                {showLogin ? (
                    <>
                        <LoginForm onLogin={onLogin} />
                        <divider />
                        <p>
                            New?
                            <button className='' color="secondary" onClick={() => setShowLogin(false)}>
                                Sign up here
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <SignUpForm onLogin={onLogin} />
                        <divider />
                        <p>
                            Not new?
                            <button color="secondary" onClick={() => setShowLogin(true)}>
                                Log in here
                            </button>
                        </p>
                    </>
                )}
            </wrapper>
        </div>
    )
}

export default Login;