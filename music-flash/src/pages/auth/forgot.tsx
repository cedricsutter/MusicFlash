import React, { useState } from 'react';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import Box from '@mui/material/Box';


const ForgotPasswordPage: React.FC = () => {
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const resetPasswordRequest = () => {
        if (error !== '') setError('');

        setSending(true);

        auth.sendPasswordResetEmail(email)
            .then(() => {
                logging.info('Email sent.');
                setSent(true);
                setSending(false);
            })
            .catch(error => {
                logging.error(error);
                setError(error.message);
                setSending(false);
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
            {sent ?
                <p>A link has been sent to your email with instructions.</p>
                :
                <div>
                    <p>Please enter your email.</p>
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
                    <button
                        disabled={sending}
                        color="success"
                        onClick={() => resetPasswordRequest()}
                    >
                        Send Reset Link
                    </button>
                    <ErrorText error={error} />
                </div>
            }
            </Box>
        </div>
    );
}

export default ForgotPasswordPage;