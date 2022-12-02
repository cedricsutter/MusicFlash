import React, { useState, useEffect } from "react";
import blogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { auth } from "../../config/firebase";
import Button from "@mui/material/Button";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Box from "@mui/material/Box";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";


const Own: React.FC = () =>  {
    const [ownblogs,setOwnBlogs] = useState(Array<IBlogData>);
    //const blogDatas : Array<IBlogData> = [];


    useEffect(() => {
        getBlogs();
    }, []);

    function getBlogs() : any {
            const datas : any = blogDataService.getBlogsAll();
            setOwnBlogs(datas);
    }

    function deleteBlog(blogid : number | any) {
        setOwnBlogs(ownblogs.filter(a => a.id !== blogid));
        blogDataService.delete(blogid);
    }

    function sortBlogs(value : string) {
        const newList = [...ownblogs];
        newList.sort((a, b) => b.date - a.date);
        setOwnBlogs(newList);
    }

    return (
        <div>
            <Box component="main" sx={{ y: 1 }}>
                <Button startIcon={<LocalFireDepartmentIcon />} onClick={() => {sortBlogs("hottest");}}>
                    Hottest
                </Button>
                <Button startIcon={<AvTimerIcon />} onClick={() => {sortBlogs("newest");}}>
                    Newest
                </Button>
            </Box>
            <div>
                {ownblogs.map((blog) => (
                    <div key={blog.id}>
                    {auth.currentUser?.email && auth.currentUser?.email === blog.creatorMail ? (
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
                                <DeleteForeverRoundedIcon href="#" onClick={() => {deleteBlog(blog.id);}}></DeleteForeverRoundedIcon>
                                <div>Remove forever</div>
                            </CardActions>
                        </Card>
                    </Box>
                    ) : (
                    <div key={blog.id}> </div>
                    )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Own;