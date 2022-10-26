import React, { useState, useEffect } from "react";
import blogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";
import { auth } from "../../config/firebase";

const Blog: React.FC = () =>  {
    const [blogs,setBlogs] = useState(Array<IBlogData>);
    const blogDatas : Array<IBlogData> = [];

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = () => {
        blogDataService.getAll().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
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
                <div data-index={index} key={blogs.id}>
                    <h2>{blogs.title}</h2>
                    <h3>{blogs.text}</h3>
                    <iframe
                            src={blogs.link}
                            width="100%" height="152" frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy">
                    </iframe>
                    {auth.currentUser? (
                    <button>Delete</button> ):(<div></div>)}
                    <button>Like</button>
                    <div>Likes: {blogs.likedBy}</div>
                </div>
            ))}
        </div>
    );
}
export default Blog;