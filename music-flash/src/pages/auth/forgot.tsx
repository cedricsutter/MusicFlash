import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import Box from '@mui/material/Box';
import DescriptionAlerts from "../../components/infobar";
import Button from "@mui/material/Button";


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
                <DescriptionAlerts info = "A link has been sent to your email with instructions." purpose = "reset"></DescriptionAlerts>
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
                    <div>
                        <Button sx={{mt: 1}} disabled={sending} variant="contained" color="success" onClick={() => resetPasswordRequest()}>Reset</Button>
                    </div>
                </div>
            }
            </Box>
            {error &&
                <DescriptionAlerts purpose="error" info={error}></DescriptionAlerts>
            }
        </div>
    );
}

export default ForgotPasswordPage;