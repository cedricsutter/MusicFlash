import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import {auth} from "../config/firebase";
import logging from "../config/logging";
import {useEffect} from "react";

const Navbar: React.FC = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [loggedIn, setLoggedIn] = React.useState<any>(auth.currentUser);
    const [logSt, setLogST] = React.useState<string>("");

    useEffect(() => {
        loggedIn? setLogST("logout") : setLogST("login")
    }, []);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const log = () => {
        if (loggedIn) {
            auth.signOut()
                .then(() => console.log("logedOut"))
                .catch(error => logging.error(error));
            setLoggedIn(auth.currentUser);
            setLogST("login")
        } else {
            console.log("move to log in");
            setLogST("logout")
        }

    };

    const login = () => {
        console.log("please log in");
        setLoggedIn(auth.currentUser);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MusicFlash
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {loggedIn? (
                            <div>
                                <MenuItem>
                                <form action="/add">
                                    <input type="submit" value="Add" />
                                </form>
                                </MenuItem>
                                <MenuItem>
                                <form action="/logout">
                                    <input type="submit" value="Logout" />
                                </form>
                                </MenuItem>
                            </div>
                            ):(
                            <form action="/login">
                                <input type="submit" value="Login" />
                            </form>

                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;