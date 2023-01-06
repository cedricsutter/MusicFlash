import * as React from 'react';
import IBlogData from "../interfaces/blogentry";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

type props = {
    blog: IBlogData
}

export default function Content(props : props) {

    return (
        <>
            <iframe
                src={props.blog.link}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy">
            </iframe>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" key={props.blog.id + "21"}>
                    {props.blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" key={props.blog.id + "22"}>
                    {props.blog.text}
                </Typography>
                <Typography variant="body2" key={props.blog.id + "23"}>
                    Created by: {props.blog.creatorMail}
                </Typography>
                <Typography variant="body2" key={props.blog.id + "24"}>
                    Created at: {new Date(props.blog.date).toString().split('G')[0]}
                </Typography>
            </CardContent>
        </>
    );
}