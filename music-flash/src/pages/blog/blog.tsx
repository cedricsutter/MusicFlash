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
            {blogs.map((blogs, index) => (
                <Card data-index={index} key={blogs.id}>
                <iframe
                src={blogs.link}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy">
                </iframe>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blogs.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {blogs.text}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small">Like</Button>
                    <FavoriteIcon>{blogs.likedBy}</FavoriteIcon>
                    <div>{blogs.likedBy}</div>
                <Button size="small">Delete</Button>
                    <DeleteForeverRoundedIcon/>
                </CardActions>
                </Card>
            ))}
        </div>
    );
}
export default Blog;