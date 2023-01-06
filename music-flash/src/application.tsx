import React, { useEffect, useState } from 'react';
import { Route , Routes } from 'react-router-dom';
import { auth } from './config/firebase';
import logging from './config/logging';
import routes from './config/routes';
import Navbar from "./components/navbar";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {BlogState} from "../src/interfaces/types";
import IBlogData from "./interfaces/blogentry";
import {shallowEqual, useSelector} from "react-redux";


const Application: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const open = true;
    const blogStore: IBlogData[] = useSelector(
        (state: BlogState) => state.blog,
        shallowEqual
    )

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
    return (<>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>);
    return (
            <div>
                <>
                    <Navbar />
                </>
                    <div>
                            <Routes>
                                {routes.map((route, name) =>
                                    <Route
                                        key={name}
                                        path={route.path}
                                        element={<route.component/>}
                                    />)}
                            </Routes>
                    </div>
            </div>
    );
}

export default Application;