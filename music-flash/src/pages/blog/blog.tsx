import React, { useState, useEffect } from "react";
import blogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { auth } from "../../config/firebase";
import Button from "@mui/material/Button";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Box from "@mui/material/Box";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularIndeterminate from '../../components/loadline';


const Blog: React.FC = () =>  {
    const [blogs,setBlogs] = useState(Array<IBlogData>);
    const blogDatas : Array<IBlogData> = [];
    const [open, setOpen] = React.useState(false);
    const [deleteId, setdeletedId] = React.useState("");
    const [isloading, setisloading] = React.useState(true);

    const handleClickOpen = (blogid : number | any) => {
        setdeletedId(blogid);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getBlogs();
        blogDataService.getAllAdmins();
    }, []);

    function deleteBlog() {
        setBlogs(blogs.filter(a => a.id !== deleteId));
        blogDataService.delete(deleteId);
    }

    function handleLike(blogid : number | any, liked : any) {
        setBlogs(blogs.map(blog => {
            if (blog.id === blogid) {
                if (blog.liked.find(element => element == liked)){
                    const blogLikedDelete = blog.liked.indexOf(liked);
                    if (blogLikedDelete > -1) {
                        blog.liked.splice(blogLikedDelete, 1);
                    }
                    blogDataService.updateLike(blogid, blog.likedBy - 1);
                    blogDataService.updateLiked(blogid, blog.liked);
                    return {
                        ...blog,
                        likedBy: blog.likedBy - 1,
                        liked: blog.liked
                    }
                }else{
                    blog.liked.push(liked);
                    blogDataService.updateLike(blogid, blog.likedBy + 1);
                    blogDataService.updateLiked(blogid, blog.liked);
                    return {
                        ...blog,
                        likedBy: blog.likedBy + 1,
                        liked: blog.liked
                    };
                }
            } else {
                return blog;
            }
        }))
    }

    function sortBlogs(value : string) {
        const newList = [...blogs];
        if (value == "newest") {
            newList.sort((a, b) => b.date - a.date);
            setBlogs(newList);
        } if (value == "hottest") {
            newList.sort((a, b) => b.likedBy - a.likedBy);
            setBlogs(newList);
        }
    }

    const getBlogs = () => {
        blogDataService.getAll().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = (doc.data());
                const datas : IBlogData = {
                    id: doc.id,
                    creatorMail: data.creatorMail,
                    creatorUID: data.creatorUID,
                    date: data.date,
                    liked: data.liked,
                    likedBy: data.likedBy,
                    link: data.link,
                    text: data.text,
                    title: data.title,
                    published: data.published
                };
                blogDatas.push(datas);
                setBlogs(blogDatas);
                setisloading(false);
            });
        });
    };

    return (
        <div>
            {isloading ? (
                <CircularIndeterminate></CircularIndeterminate>
                )
                :(
            <>
            <Box component="main" sx={{ y: 1, border: 1, borderColor: 'primary.main'}}>
            <Button startIcon={<LocalFireDepartmentIcon />} onClick={() => {sortBlogs("hottest");}}>
                Hottest
            </Button>
            <Button startIcon={<AvTimerIcon />} onClick={() => {sortBlogs("newest");}}>
                Newest
            </Button>
            </Box>
            <Box sx={{pt: 1}}>
                {blogs.map((blog) => (
                <>
                    {blog.published &&
                        <>
                        <Box sx={{y: 3}} key={blog.id}>
                            <Card data-index={blog.id} key={blog.id}>
                                <iframe
                                    src={blog.link}
                                    width="100%"
                                    height="152"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy">
                                </iframe>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {blog.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {blog.text}
                                    </Typography>
                                    <Typography variant="body2" sx={{pt: 2}}>
                                        Created by: {blog.creatorMail}
                                    </Typography>
                                    <Typography sx = {{pt: 1}} variant="body2">
                                        Create at: {new Date(blog.date).toString().split('G')[0]}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                {auth.currentUser &&
                                    <>
                                        {blog.liked.find(element => element == auth.currentUser?.email) ? (
                                            <>
                                                <IconButton color="error" aria-label="add to favorites">
                                                    <FavoriteIcon onClick={() => {
                                                        handleLike(blog.id, auth.currentUser?.email);
                                                    }}>blog.likedBy</FavoriteIcon>
                                                </IconButton>
                                                <Box>{blog.likedBy}</Box>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton color="error" aria-label="add to favorites">
                                                    <FavoriteBorderOutlinedIcon onClick={() => {
                                                        handleLike(blog.id, auth.currentUser?.email);
                                                    }}>blog.likedBy</FavoriteBorderOutlinedIcon>
                                                </IconButton>
                                                <Box>{blog.likedBy}</Box>
                                            </>
                                        )}
                                    </>
                                }
                                {!auth.currentUser &&
                                    <>
                                        <FavoriteIcon></FavoriteIcon>
                                        <Box>{blog.likedBy}</Box>
                                    </>
                                }
                                {auth.currentUser?.email == blog.creatorMail &&
                                    <>
                                    <IconButton color="error" aria-label="add to favorites">
                                        <DeleteForeverRoundedIcon href="#" onClick={() => {handleClickOpen(blog.id);}}></DeleteForeverRoundedIcon>
                                    </IconButton>
                                    </>
                                }
                                </CardActions>
                            </Card>
                        </Box>
                        </>
                    }
                </>

                ))}
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You really want to delete your own Blogentry?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={deleteBlog} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            </>
                )}
        </div>
    );
}
export default Blog;