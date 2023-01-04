import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import DescriptionAlerts from "../../components/infobar";

const RegisterPage: React.FC = () => {
    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const signUpWithEmailAndPassword = () => {
        if (password !== confirm)
        {
            setError('Please make sure your passwords match.');
            return;
        }

        if (error !== '') setError('');

        setRegistering(true);

        auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                logging.info(result);
                navigate('/login');
            })
            .catch(error => {
                logging.error(error);
                if (error.code.includes('auth/weak-password'))
                {
                    setError('Please enter a stronger password.');
                }
                else if (error.code.includes('auth/email-already-in-use'))
                {
                    setError('Email already in use.');
                }
                else
                {
                    setError('Unable to register.  Please try again later.')
                }
                setRegistering(false);
            });
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }} >
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
            <form>
                <input
                    required
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={event => setConfirm(event.target.value)}
                    value={confirm}
                />
            </form>
            <div>
                <Button sx={{mt: 3, mb: 1}} disabled={registering} variant="contained" color="success" onClick={() => signUpWithEmailAndPassword()}>Login</Button>
            </div>
            <small>
                <p>Already have an account? <Link to="/login">Login.</Link></p>
            </small>
                </div>
            </Box>
            {error &&
                <DescriptionAlerts purpose="error" info={error}></DescriptionAlerts>
            }
        </div>
    );
}

export default RegisterPage;