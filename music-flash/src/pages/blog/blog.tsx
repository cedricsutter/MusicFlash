import React, {useEffect} from "react";
import IBlogData from "../../interfaces/blogentry";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { auth } from "../../config/firebase";
import Button from "@mui/material/Button";
import {Dispatch} from "redux";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {BlogState} from "../../interfaces/types";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateIcon from '@mui/icons-material/Update';
import HistoryIcon from '@mui/icons-material/History';
import Variants from "../../components/skeleton";
import {likeMinus, likePlus, hottestBlog, newestBlog, oldestBlog} from "../../store/actionCreators";
import Content from "../../components/CardContent";


const Blog: React.FC = () =>  {
    const blogStore: IBlogData[] = useSelector(
        (state: BlogState) => state.blog,
        shallowEqual
    )

    useEffect(() => {
        setTimeout(() => {
            setLoading("notloading");
        }, 1000);
    });

    const [open, setOpen] = React.useState(false);
    const [sortState, setSortState] = React.useState("");
    const [loading, setLoading] = React.useState("loading");
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
    const sortO = React.useCallback(
        (blog: IBlogData) => dispatch(oldestBlog(blog)),
        [dispatch, oldestBlog]
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
                    likeM(blog);
                }else{
                    blog.liked.push(liked);
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
                <Button startIcon={<UpdateIcon/>} onClick={() => {sortN(blogStore[0]); setSortState("newest")}}>
                    Newest
                </Button>
                <Button startIcon={<HistoryIcon/>} onClick={() => {sortO(blogStore[0]); setSortState("oldest")}}>
                    Oldest
                </Button>
           </Box>
           {blogStore.length <= 0  &&
                <Box sx={{y: 3, mt: 1}} key="Skeleton">
                    <Variants purpose="blog"></Variants>
                </Box>
            }
            <Box>
                {blogStore.map((blog : IBlogData) => (
                <>
                    {blog.published &&
                        <>
                        <Box sx={{y: 3, mt: 1}} key={blog.id + "1"}>
                            <Card data-index={blog.id} key={blog.id + "2"}>
                                <Content blog={blog}></Content>
                                <CardActions key={Math.random()}>
                                {auth.currentUser &&
                                    <>
                                        {blog.liked.find(element => element == auth.currentUser?.email) ? (
                                            <>
                                                <IconButton key={blog.id + "31"} color="error" aria-label="add to favorites" onClick={() => {
                                                    handleLike(blog.id, auth.currentUser?.email); likedCount ? setLikedCount(false): setLikedCount(true)}}>
                                                    <FavoriteIcon key={blog.id + "32"}>blog.likedBy</FavoriteIcon>
                                                </IconButton>
                                                <Box key={blog.id + "33"} >{blog.likedBy}</Box>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton key={blog.id + "41"} color="error" aria-label="add to favorites" onClick={() => {
                                                    handleLike(blog.id, auth.currentUser?.email); likedCount ? setLikedCount(false): setLikedCount(true)
                                                }}>
                                                    <FavoriteBorderOutlinedIcon key={blog.id + "42"} >blog.likedBy</FavoriteBorderOutlinedIcon>
                                                </IconButton>
                                                <Box key={blog.id + "43"}>{blog.likedBy}</Box>
                                            </>
                                        )}
                                    </>
                                }
                                {!auth.currentUser &&
                                    <>
                                    <IconButton key={blog.id + "51"} aria-label="add to favorites">
                                        <FavoriteIcon key={blog.id + "52"} onClick={() => {setOpen(true);}}></FavoriteIcon>
                                    </IconButton>
                                        <Box key={blog.id + "53"}>{blog.likedBy}</Box>
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