import React, { useState, useEffect } from "react";
import blogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
            {blogs.map((blog) => (
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
                </CardContent>
                <CardActions>
                    <FavoriteIcon onClick={() => {handleLike(blog.id);}}></FavoriteIcon>
                    <div>{blog.likedBy}</div>
                    <DeleteForeverRoundedIcon onClick={() => {deleteBlog(blog.id);}}></DeleteForeverRoundedIcon>
                </CardActions>
                </Card>
            ))}
        </div>
    );
}
export default Blog;