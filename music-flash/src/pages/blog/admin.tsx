import React, { useState, useEffect } from "react";
import IBlogData from "../../interfaces/blogentry";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {BlogState} from "../../interfaces/types";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {removeBlog, publishBlog, newestBlog} from "../../store/actionCreators";
import CardActions from '@mui/material/CardActions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AvTimerIcon from "@mui/icons-material/AvTimer";
import DescriptionAlerts from "../../components/infobar";

const Admin: React.FC = () =>  {
    const [open, setOpen] = React.useState(false);
    const [deleteId, setdeletedId] = React.useState<IBlogData | any>();
    const [publish, setPublish] = React.useState<boolean>();
    const dispatch: Dispatch<any> = useDispatch();

    const blogStore: IBlogData[] = useSelector(
        (state: BlogState) => state.blog
    )
    const deleteBlog = React.useCallback(
        (blog: IBlogData) => dispatch(removeBlog(blog)),
        [dispatch, removeBlog]
    )
    const publisheBlog = React.useCallback(
        (blog: IBlogData) => dispatch(publishBlog(blog)),
        [dispatch, publishBlog]
    )
    const sortN = React.useCallback(
        (blog: IBlogData) => dispatch(newestBlog(blog)),
        [dispatch, newestBlog]
    )
    const handleClickOpen = (blog : IBlogData) => {
        setdeletedId(blog);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function deletBloge() {
        deleteBlog(deleteId);
        setOpen(false);
    }
    function publishBloge() {
        publisheBlog(deleteId);
        setOpen(false);
    }

    return (
            <div>
                {blogStore.some((element) => element.published === false) ? (
                <div>
                    <Box component="main" sx={{ y: 1, border: 1, borderColor: 'primary.main'}}>
                        <Button startIcon={<AvTimerIcon />} onClick={() => {sortN(blogStore[0]);}}>
                            Newest
                        </Button>
                    </Box>
                    <Box sx={{pt: 1}}>
                    {blogStore.map((blog: IBlogData) => (
                    <>
                    {blog.published == false &&
                            <div key={blog.id}>
                                <Box sx={{ pb: 1}} key={blog.id}>
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
                                            <Typography variant="body2">
                                                Created by: {blog.creatorMail}
                                            </Typography>
                                            <Typography variant="body2">
                                                Created at: {new Date(blog.date).toString().split('G')[0]}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            {blog.id &&
                                                <>
                                                    <>
                                                    <IconButton key={blog.likedBy + "5"} aria-label="add to favorites">
                                                        <AddCircleOutlineIcon key={blog.likedBy + "6"} href="#" onClick={() => {setPublish(true), handleClickOpen(blog)}}></AddCircleOutlineIcon>
                                                    </IconButton>
                                                    <span>Publish entry </span>
                                                    </>
                                                    <>
                                                        <IconButton key={blog.likedBy + "5"} color="error" aria-label="add to favorites">
                                                            <DeleteForeverRoundedIcon key={blog.likedBy + "6"} href="#" onClick={() => {setPublish(false), handleClickOpen(blog)}}></DeleteForeverRoundedIcon>
                                                        </IconButton>
                                                    </>
                                                </>
                                            }
                                            {!blog.id &&
                                                <p>No possible Actions. Please reload the side!</p>
                                            }
                                        </CardActions>
                                    </Card>
                                </Box>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    {publish === true &&
                                        <>
                                        <DialogTitle id="alert-dialog-title">
                                            {"Publish"}
                                        </DialogTitle>
                                        <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                        You really want to publish this Blogentry?
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={handleClose}>No</Button>
                                        <Button onClick={publishBloge} autoFocus>
                                        Yes
                                        </Button>
                                        </DialogActions>
                                        </>
                                    }
                                    {publish === false &&
                                        <>
                                            <DialogTitle id="alert-dialog-title">
                                                {"Delete"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    You really want to delete this Blogentry?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>No</Button>
                                                <Button onClick={deletBloge} autoFocus>
                                                    Yes
                                                </Button>
                                            </DialogActions>
                                        </>
                                    }
                                </Dialog>
                            </div>
                    }
                    </>
                ))}
                </Box>
                </div>
                ) : (
                    <>
                        <DescriptionAlerts purpose ="info"></DescriptionAlerts>
                    </>
                )}
            </div>
    );
}
export default Admin