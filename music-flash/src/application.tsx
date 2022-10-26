import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { auth } from './config/firebase';
import logging from './config/logging';
import routes from './config/routes';

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
        return <Spinner color="info" />

    return (
            <div>
                <div>
                    <h1>MusicFlash Navbar</h1>
                </div>
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
    );
}

export default Application;