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
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";


const drawerWidth = 240;

const Navbar: React.FC = () =>  {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();

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
                <ListItem key="Own" disablePadding>
                    {auth.currentUser ? (
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate("/own")}>
                        <ListItemText primary="Own" />
                    </ListItemButton>
                        ) : (
                            <div></div>
                        )}
                </ListItem>
                <ListItem key="Add" disablePadding>
                    {auth.currentUser ? (
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate("/add")}>
                        <ListItemText primary="Add" />
                    </ListItemButton>
                        ) : (
                            <div></div>
                        )}
                </ListItem>
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
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {auth.currentUser ? (
                            <Button onClick={() => navigate("/own")} key="Add" sx={{ color: '#fff' }}>
                                Own
                            </Button>
                        ) : (
                            <div></div>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {auth.currentUser ? (
                            <Button onClick={() => navigate("/add")} key="Add" sx={{ color: '#fff' }}>
                                Add
                            </Button>
                            ) : (
                            <div></div>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
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