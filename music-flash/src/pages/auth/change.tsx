import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import Box from '@mui/material/Box';

const ChangePasswordPage: React.FC = () => {
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const passwordChangeRequest = () => {
        if (password !== confirm)
        {
            setError('Make sure your passwords are matching');
            return;
        }

        if (error !== '') setError('');

        setChanging(true);

        auth.currentUser?.updatePassword(password)
            .then(() => {
                logging.info('Password change successful.');
                navigate(-1);
            })
            .catch(error => {
                logging.error(error);
                setChanging(false);
                setError(error.message);
            });
    }

    if (auth.currentUser?.providerData[0]?.providerId !== 'password')
        return <Link to="/">You have to log in to change your Password</Link>;

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
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={event => setConfirm(event.target.value)}
                    value={confirm}
                />
            </form>
            <button
                disabled={changing}
                color="success"
                onClick={() => passwordChangeRequest()}
            >
                Change Password
            </button>
            <ErrorText error={error} />
            </Box>
        </div>
    );
}

export default ChangePasswordPage;