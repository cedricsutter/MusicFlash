import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

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
                    <Button sx={{mr: 3}} variant="contained" color="error" onClick={() => navigate("/")}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={() => Logout()}>Logout</Button>
                </div>
                <small>
                    <p>Change Password? <Link to="/forget">Change here.</Link></p>
                </small>
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