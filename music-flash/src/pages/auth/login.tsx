import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';

const LoginPage: React.FC = () => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const signInWithEmailAndPassword = () => {
        if (error !== '') setError('');

        setAuthenticating(true);

        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                logging.info(result);
                navigate('/blog');
            })
            .catch(error => {
                logging.error(error);
                setAuthenticating(false);
                setError(error.message);
            });
    }

    return (
        <div>
            { auth.currentUser? (
                <div>
                    <p><Link to="/">You are allready logged in</Link></p>
                </div>
            ) : (
                <div>
                    <form>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            onChange={event => setEmail(event.target.value)}
                            value={email}
                        />
                    </form>
                    <form>
                        <input
                            autoComplete="new-password"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter Password"
                            onChange={event => setPassword(event.target.value)}
                            value={password}
                        />
                    </form>
                    <button
                        disabled={authenticating}
                        color="success"
                        onClick={() => signInWithEmailAndPassword()}
                    >
                        Login
                    </button>
                    <small>
                        <p>Don't have an account? <Link to="/register">Register here.</Link></p>
                        <p><Link to="/forget">Forget your password?</Link></p>
                        <p><Link to="/">Visit without Login.</Link></p>
                    </small>
                    <ErrorText error={error} />
                </div>
                )}
        </div>
    );
}

export default LoginPage;