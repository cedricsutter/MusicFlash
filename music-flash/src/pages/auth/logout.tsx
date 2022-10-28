import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import Box from '@mui/material/Box';

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();

    const Logout = () => {
        auth.signOut()
            .then(() => navigate('/'))
            .catch(error => logging.error(error));
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
            {auth.currentUser ? (
              <div>
                <p>Are you sure you want to logout?</p>
                <div>
                    <button onClick={() => navigate("/")}>Cancel</button>
                    <button onClick={() => Logout()}>Logout</button>
                </div>
              </div>
            ) : (
                <div>
                    <p>You are allready logged out</p>
                    <div>
                        <button onClick={() => navigate("/")}>Back</button>
                    </div>
                </div>
                )}
            </Box>
        </div>
    );
}

export default LogoutPage;