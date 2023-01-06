import React, { useState, useEffect } from "react";
import IBlogData from "../../interfaces/blogentry";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Card from '@mui/material/Card';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
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
import DescriptionAlerts from "../../components/infobar";
import IAdmin from "../../interfaces/IAdmin";
import blogDataService from "../../services/blogDataService";
import {auth} from "../../config/firebase";
import Content from "../../components/CardContent";

const Admin: React.FC = () =>  {
    const [open, setOpen] = React.useState(false);
    const [deleteId, setdeletedId] = React.useState<IBlogData | any>();
    const [publish, setPublish] = React.useState<boolean>();
    const [loading, setLoading] = React.useState(true);
    const dispatch: Dispatch<any> = useDispatch();
    const [admins, setAdmins] = React.useState<IAdmin>({id: "", admins: []});

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            getAdmin();
        }, 1000);
    });

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
                {admins.admins.find((element: string | null | undefined) => element == auth.currentUser?.email) ? (
                <div>
                    <Box sx={{pt: 1}}>
                    {blogStore.map((blog: IBlogData) => (
                    <>
                    {blog.published == false &&
                            <div key={blog.id + "1"}>
                                <Box sx={{y: 3, mt: 1}} key={blog.id + "11"}>
                                    <Card data-index={blog.id} key={blog.id + "2"}>
                                        <Content blog={blog}></Content>
                                        <CardActions>
                                            {blog.id &&
                                                <>
                                                    <>
                                                    <IconButton key={blog.id + "21"} aria-label="add to favorites">
                                                        <AddCircleOutlineIcon key={blog.id + "22"} href="#" onClick={() => {setPublish(true), handleClickOpen(blog)}}></AddCircleOutlineIcon>
                                                    </IconButton>
                                                    <span>Publish entry </span>
                                                    </>
                                                    <>
                                                        <IconButton key={blog.id + "31"}  color="error" aria-label="add to favorites">
                                                            <DeleteForeverRoundedIcon key={blog.id + "32"}  href="#" onClick={() => {setPublish(false), handleClickOpen(blog)}}></DeleteForeverRoundedIcon>
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
                    <>
                        {!blogStore.some((element) => element.published === false) &&
                            <Box sx={{mt: 2}}>
                                <DescriptionAlerts purpose="info"></DescriptionAlerts>
                            </Box>
                        }
                    </>
                </div>
                ):(
                    <Box sx={{mt: 2}}>
                        <DescriptionAlerts purpose="info"></DescriptionAlerts>
                    </Box>
                )}
            </div>
    );
}
export default Admin