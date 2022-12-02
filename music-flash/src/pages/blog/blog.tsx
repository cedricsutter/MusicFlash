import React, { useState, useEffect } from "react";
import blogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";
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



const Blog: React.FC = () =>  {
    const [blogs,setBlogs] = useState(Array<IBlogData>);
    const [likeColor,setLikeColor] = useState("black");
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
                    title: data.title
                };
                blogDatas.push(datas);
                setBlogs(blogDatas);
            });
        });
    };

    return (
        <div>
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
                <Box sx={{ y: 3}} key={blog.id}>
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
                        <Typography variant="body2">
                            Createdate: {blog.date}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <FavoriteBorderOutlinedIcon sx={{color: likeColor}} onMouseOver={() => {setLikeColor("red");}} onMouseLeave={() => {setLikeColor("black");}} onClick={() => {handleLike(blog.id);}}></FavoriteBorderOutlinedIcon>
                        <Box sx={{pl: 2}}>{blog.likedBy}</Box>
                    </CardActions>
                    </Card>
                </Box>
                ))}
            </Box>
        </div>
    );
}
export default Blog;