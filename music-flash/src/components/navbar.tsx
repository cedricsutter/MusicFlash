import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link, useNavigate} from "react-router-dom";
import { auth } from "../config/firebase";
import IAdmin from "../interfaces/IAdmin"
import {useEffect} from "react";
import blogDataService from "../services/blogDataService";
import Avatar from '@mui/material/Avatar';

const drawerWidth = 240;

const Navbar: React.FC = () =>  {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [admins, setAdmins] = React.useState<IAdmin>({id: "", admins: []});
    const navigate = useNavigate();

    useEffect(() => {
        getAdmin();
    }, []);

    const getAdmin = () => {
        blogDataService.getAllAdmins().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const admin = (doc.data());
                const admine: IAdmin = {
                    id: "admins",
                    admins: admin.admins
                };
                setAdmins(admine);
            });
        });
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Music Flash
            </Typography>
            <Divider />
            <List>
                <ListItem key="Home" disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate("/")}>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                {auth.currentUser &&
                <>
                <ListItem key="Own" disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate("/own")}>
                        <ListItemText primary="Own" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Add" disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate("/add")}>
                        <ListItemText primary="Add" />
                    </ListItemButton>
                </ListItem>
                </>
                }
                <ListItem key="Login" disablePadding>
                    {auth.currentUser ? (
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate("/logout")}>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    ):(
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate("/login")}>
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    )}
                </ListItem>
                {admins.admins.find((element: string | null | undefined) => element == auth.currentUser?.email) &&
                    <ListItem key="Admin" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate("/admin")}>
                            <ListItemText primary="Admin" />
                        </ListItemButton>
                    </ListItem>
                }
            </List>
        </Box>
    );


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Music Flash
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button onClick={() => navigate("/")} key="Home" sx={{ color: '#fff' }}>
                                Home
                            </Button>
                    </Box>
                    {auth.currentUser &&
                        <>
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            <Button onClick={() => navigate("/own")} key="Add" sx={{color: '#fff'}}>
                                Own
                            </Button>
                        </Box>
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            <Button onClick={() => navigate("/add")} key="Add" sx={{color: '#fff'}}>
                                Add
                            </Button>
                        </Box>
                        </>
                    }
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {auth.currentUser ? (
                            <Button onClick={() => navigate("/logout")} key="Logout" sx={{ color: '#fff' }}>
                                Logout
                            </Button>
                        ):(
                            <Button onClick={() => navigate("/login")} key="Login" sx={{ color: '#fff' }}>
                                Login
                            </Button>
                        )}
                    </Box>
                    {admins.admins.find((element: string | null | undefined) => element == auth.currentUser?.email) &&
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            <Button onClick={() => navigate("/admin")} key="Admin" sx={{color: '#fff'}}>
                                Admin
                            </Button>
                        </Box>
                    }
                    {auth.currentUser &&
                        <Box sx={{ml:1, display: {xs: 'none', sm: 'block'}}}>
                            <Button onClick={() => navigate("/accountinfo")} key="Home" sx={{ color: '#fff' }}>
                                <Avatar>{auth.currentUser.email?.charAt(0).toUpperCase()}</Avatar>
                            </Button>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 4 }}>
            </Box>
        </Box>
    );
}

export default Navbar;