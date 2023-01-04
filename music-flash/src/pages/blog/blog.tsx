import React, { Component, useState, useEffect } from "react";
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
import {Dispatch} from "redux";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {BlogState} from "../../interfaces/types";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {likeMinus, likePlus, hottestBlog, newestBlog} from "../../store/actionCreators";



const Blog: React.FC = () =>  {

    const blogStore: IBlogData[] = useSelector(
        (state: BlogState) => state.blog,
        shallowEqual
    )

    const [open, setOpen] = React.useState(false);
    const [sortState, setSortState] = React.useState("newest");
    const [likedCount, setLikedCount] = React.useState(true);
    const dispatch: Dispatch<any> = useDispatch();

    const likeP = React.useCallback(
        (blog: IBlogData) => dispatch(likePlus(blog)),
        [dispatch, likePlus]
    )
    const likeM = React.useCallback(
        (blog: IBlogData) => dispatch(likeMinus(blog)),
        [dispatch, likeMinus]
    )
    const sortH = React.useCallback(
        (blog: IBlogData) => dispatch(hottestBlog(blog)),
        [dispatch, hottestBlog]
    )
    const sortN = React.useCallback(
        (blog: IBlogData) => dispatch(newestBlog(blog)),
        [dispatch, newestBlog]
    )

    const handleClose = () => {
        setOpen(false);
    };

    function handleLike(blogid : number | any, liked : any) {
        blogStore.map(blog => {
            if (blog.id === blogid) {
                if (blog.liked.find(element => element == liked)){
                    const blogLikedDelete = blog.liked.indexOf(liked);
                    if (blogLikedDelete > -1) {
                        blog.liked.splice(blogLikedDelete, 1);
                    }
                    console.log(blog, "minus");
                    likeM(blog);
                }else{
                    blog.liked.push(liked);
                    console.log(blog, "plus");
                    likeP(blog);
                }
            } else {
                return
            }
        })
    }

    return (
        <div>
            <>
                    <Box component="main" sx={{y: 1, border: 1, borderColor: 'primary.main'}}>
                            <Button startIcon={<LocalFireDepartmentIcon/>} onClick={() => {sortH(blogStore[0]); setSortState("hottest")}}>
                            Hottest
                            </Button>
                            <Button startIcon={<AvTimerIcon/>} onClick={() => {sortN(blogStore[0]); setSortState("newest")}}>
                            Newest
                            </Button>
                    </Box>
            <Box sx={{pt: 1}}>
                {blogStore.map((blog : IBlogData) => (
                <>
                    {blog.published &&
                        <>
                        <Box sx={{y: 3}} key={blog.id + "11"}>
                            <Card data-index={blog.id} key={blog.id + "12"}>
                                <iframe
                                    src={blog.link}
                                    width="100%"
                                    height="152"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    key={blog.id}>
                                </iframe>
                                <CardContent key={blog.id + "13"}>
                                    <Typography gutterBottom variant="h5" component="div" key={blog.title}>
                                        {blog.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" key={blog.text}>
                                        {blog.text}
                                    </Typography>
                                    <Typography variant="body2" sx={{pt: 2}} key={blog.creatorMail}>
                                        Created by: {blog.creatorMail}
                                    </Typography>
                                    <Typography sx = {{pt: 1}} variant="body2" key={blog.date}>
                                        Create at: {new Date(blog.date).toString().split('G')[0]}
                                    </Typography>
                                </CardContent>
                                <CardActions key={Math.random()}>
                                {auth.currentUser &&
                                    <>
                                        {blog.liked.find(element => element == auth.currentUser?.email) ? (
                                            <>
                                                <IconButton key={blog.likedBy} color="error" aria-label="add to favorites">
                                                    <FavoriteIcon key={blog.likedBy + "1"} onClick={() => {
                                                        handleLike(blog.id, auth.currentUser?.email); likedCount ? setLikedCount(false): setLikedCount(true)
                                                    }}>blog.likedBy</FavoriteIcon>
                                                </IconButton>
                                                <Box key={blog.likedBy + 2}>{blog.likedBy}</Box>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton key={blog.likedBy} color="error" aria-label="add to favorites">
                                                    <FavoriteBorderOutlinedIcon key={blog.likedBy + "1"} onClick={() => {
                                                        handleLike(blog.id, auth.currentUser?.email); likedCount ? setLikedCount(false): setLikedCount(true)
                                                    }}>blog.likedBy</FavoriteBorderOutlinedIcon>
                                                </IconButton>
                                                <Box key={blog.likedBy + 2}>{blog.likedBy}</Box>
                                            </>
                                        )}
                                    </>
                                }
                                {!auth.currentUser &&
                                    <>
                                    <IconButton key={blog.likedBy} aria-label="add to favorites">
                                        <FavoriteIcon key={blog.likedBy + "3"} onClick={() => {setOpen(true);}}></FavoriteIcon>
                                    </IconButton>
                                        <Box key={blog.likedBy + "4"}>{blog.likedBy}</Box>
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
                    {"Like"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You have to log in to leave a like.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
            </>
        </div>
    );
}
export default Blog;