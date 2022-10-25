import React, { useState, useEffect } from "react";
import blogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";

const Blog: React.FC = (IBlogData) =>  {
    const [blogs,setBlogs] = useState({});
    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = async () => {
        const data = await blogDataService.getAll();
        const test = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setBlogs(test);
    };

    return (
        <div>Test</div>
    );
}
export default Blog;