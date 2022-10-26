import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { auth } from './config/firebase';
import logging from './config/logging';
import routes from './config/routes';
import MusicflashNavbar from "./components/navbar";


const Application: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user)
            {
                logging.info('User detected.');
            }
            else
            {
                logging.info('No user detected');
            }

            setLoading(false);
        })
    }, []);

    if (loading)
        return  <Box sx={{justifyContent: 'center'}} >
                    <CircularProgress />
                </Box>

    return (
            <div>
                <MusicflashNavbar />
                    <div>
                            <BrowserRouter>
                                <Routes>
                                    {routes.map((route, index) =>
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={<route.component />}
                                        />)}
                                </Routes>
                            </BrowserRouter>
                    </div>
            </div>
    );
}

export default Application;