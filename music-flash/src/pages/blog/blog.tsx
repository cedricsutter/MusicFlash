import React, { useState, useEffect } from "react";
import blogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { auth } from "../../config/firebase";
import Button from "@mui/material/Button";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import PersonIcon from '@mui/icons-material/Person';
import Box from "@mui/material/Box";


const Blog: React.FC = () =>  {
    const [blogs,setBlogs] = useState(Array<IBlogData>);
    const blogDatas : Array<IBlogData> = [];

    useEffect(() => {
        getBlogs();
    }, []);

    function deleteBlog(blogid : number | any) {
        setBlogs(blogs.filter(a => a.id !== blogid));
        blogDataService.delete(blogid);
    }

    function handleLike(blogid : number | any) {
        setBlogs(blogs.map(blog => {
            if (blog.id === blogid) {
                blogDataService.updateLike(blogid, blog.likedBy + 1);
                return {
                    ...blog,
                    likedBy: blog.likedBy + 1
                };
            } else {
                return blog;
            }
        }))
    }

    function sortBlogs(value : string) {
        const newList = [...blogs];
        if (value == "newest") {
            newList.sort((a, b) => b.date - a.date);
            console.log(newList);
            setBlogs(newList);
        } if (value == "hottest") {
            newList.sort((a, b) => b.likedBy - a.likedBy);
            setBlogs(newList);
        } if (value == "own"){
            newList.sort((a, b) => a.likedBy - b.likedBy);
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
                    title: data.title
                };
                console.log(datas);
                blogDatas.push(datas);
                setBlogs(blogDatas);
            });
        });
    };

    return (
        <div>
            <div>
            <Box component="main" sx={{ p: 2 }}>
            <Button startIcon={<LocalFireDepartmentIcon />} onClick={() => {sortBlogs("hottest");}}>
                Hottest
            </Button>
            <Button startIcon={<AvTimerIcon />} onClick={() => {sortBlogs("newest");}}>
                Newest
            </Button>
            <Button startIcon={<PersonIcon />} onClick={() => {sortBlogs("own");}}>
                Own
            </Button>
            </Box>
            </div>
            <div>
                {blogs.map((blog) => (
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
                            Createdate: {blog.date}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <FavoriteIcon onClick={() => {handleLike(blog.id);}}></FavoriteIcon>
                        <div>{blog.likedBy}</div>
                        {auth.currentUser?.email && auth.currentUser?.email === blog.creatorMail ?
                        <DeleteForeverRoundedIcon onClick={() => {deleteBlog(blog.id);}}></DeleteForeverRoundedIcon>
                            :
                            <div></div>
                        }
                    </CardActions>
                    </Card>
                </Box>
                ))}
            </div>
        </div>
    );
}
export default Blog;