import React, { useState, useEffect } from "react";
import IBlogData from "../../interfaces/blogentry";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { auth } from "../../config/firebase";
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
import {hottestBlog, newestBlog, removeBlog} from "../../store/actionCreators";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from '@mui/material/CardActions';
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import DescriptionAlerts from "../../components/infobar";

const Own: React.FC = () =>  {
    const blogStore: IBlogData[] = useSelector(
        (state: BlogState) => state.blog,
        shallowEqual
    )

    useEffect(() => {
        setTimeout(() => {
            setSortState("loading");
        }, 1000);
    });

    const [open, setOpen] = React.useState(false);
    const [sortState, setSortState] = React.useState("");
    const [deleteId, setdeletedId] = React.useState<IBlogData | any>();
    const dispatch: Dispatch<any> = useDispatch();


    const deleteBlog = React.useCallback(
        (blog: IBlogData) => dispatch(removeBlog(blog)),
        [dispatch, removeBlog]
    )

    const handleClickOpen = (blog : IBlogData) => {
        setdeletedId(blog);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function deleteBloge() {
        deleteBlog(deleteId);
        setOpen(false);
    }
    const sortH = React.useCallback(
        (blog: IBlogData) => dispatch(hottestBlog(blog)),
        [dispatch, hottestBlog]
    )
    const sortN = React.useCallback(
        (blog: IBlogData) => dispatch(newestBlog(blog)),
        [dispatch, newestBlog]
    )

    return (
            <div>
                {blogStore.some((element) => element.creatorMail === auth.currentUser?.email) ? (
                <div>
                <Box component="main" sx={{ y: 1, border: 1, borderColor: 'primary.main'}}>
                    <Button startIcon={<LocalFireDepartmentIcon />} onClick={() => {sortH(blogStore[0]); setSortState("Newest")}}>
                         Hottest
                    </Button>
                    <Button startIcon={<AvTimerIcon />} onClick={() => {sortN(blogStore[0]); setSortState("Hottest")}}>
                         Newest
                    </Button>
                </Box>
                <Box>
                {blogStore.map((blog: IBlogData) => (
                    <>
                    {auth.currentUser?.email == blog.creatorMail &&
                            <>
                                <Box sx={{y: 3, mt: 1}} key={blog.id}>
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
                                                        <FavoriteIcon key={blog.likedBy + "3"}></FavoriteIcon>
                                                        <Box key={blog.likedBy + "4"}>{blog.likedBy}</Box>
                                                    </>
                                                    <>
                                                        <IconButton key={blog.likedBy + "5"} color="error" aria-label="add to favorites">
                                                            <DeleteForeverRoundedIcon key={blog.likedBy + "6"} href="#" onClick={() => {handleClickOpen(blog)}}></DeleteForeverRoundedIcon>
                                                        </IconButton>
                                                    </>
                                                </>
                                            }
                                            {!blog.id &&
                                                <p>No possible Actions. Please reload the side!</p>
                                            }
                                            {!blog.published &&
                                                <p>Not published yet</p>
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
                                        <Button onClick={deleteBloge} autoFocus>
                                            Yes
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
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
export default Own;