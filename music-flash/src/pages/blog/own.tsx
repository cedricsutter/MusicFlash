import React, { useState, useEffect } from "react";
import IBlogData from "../../interfaces/blogentry";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Card from '@mui/material/Card';
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
import {hottestBlog, newestBlog, removeBlog, oldestBlog} from "../../store/actionCreators";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from '@mui/material/CardActions';
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import DescriptionAlerts from "../../components/infobar";
import UpdateIcon from "@mui/icons-material/Update";
import HistoryIcon from "@mui/icons-material/History";
import Content from "../../components/CardContent";

const Own: React.FC = () =>  {
    const blogStore: IBlogData[] = useSelector(
        (state: BlogState) => state.blog,
        shallowEqual
    )

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    });

    const [open, setOpen] = React.useState(false);
    const [sortState, setSortState] = React.useState("");
    const [loading, setLoading] = React.useState(true);
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
    const sortO = React.useCallback(
        (blog: IBlogData) => dispatch(oldestBlog(blog)),
        [dispatch, oldestBlog]
    )

    return (
            <div>
                <div>
                    <Box component="main" sx={{y: 1, border: 1, borderColor: 'primary.main'}}>
                        <Button startIcon={<LocalFireDepartmentIcon/>} onClick={() => {sortH(blogStore[0]); setSortState("hottest")}}>
                            Hottest
                        </Button>
                        <Button startIcon={<UpdateIcon/>} onClick={() => {sortN(blogStore[0]); setSortState("newest")}}>
                            Newest
                        </Button>
                        <Button startIcon={<HistoryIcon/>} onClick={() => {sortO(blogStore[0]); setSortState("oldest")}}>
                            Oldest
                        </Button>
                    </Box>
                <Box>
                {blogStore.map((blog: IBlogData) => (
                    <>
                    {auth.currentUser?.email == blog.creatorMail &&
                            <>
                                <Box sx={{y: 3, mt: 1}} key={blog.id + "1"}>
                                    <Card data-index={blog.id} key={blog.id + "2"}>
                                        <Content blog={blog}></Content>
                                        <CardActions>
                                            {blog.id &&
                                                <>
                                                    <>
                                                        <FavoriteIcon key={blog.id + "21"}></FavoriteIcon>
                                                        <Box key={blog.id + "22"}>{blog.likedBy}</Box>
                                                    </>
                                                    <>
                                                        <IconButton key={blog.id + "23"} color="error" aria-label="add to favorites">
                                                            <DeleteForeverRoundedIcon key={blog.id + "24"} href="#" onClick={() => {handleClickOpen(blog)}}></DeleteForeverRoundedIcon>
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
                {!blogStore.some((element) => element.creatorMail === auth.currentUser?.email) &&
                    <Box sx = {{mt: 2}}>
                        <DescriptionAlerts purpose="info2"></DescriptionAlerts>
                    </Box>
                    }
            </div>
    );
}
export default Own;