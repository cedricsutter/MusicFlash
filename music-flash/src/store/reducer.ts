import * as actionTypes from "./actionTypes";
import {BlogAction, BlogState} from "../interfaces/types";
import IBlogData from "../interfaces/blogentry";
import blogDataService from "../services/blogDataService";

const blogEntries : IBlogData[] = [];

const getBlogs = () => {
    blogDataService.getAll().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const dataNew = (doc.data());
            const data : IBlogData = {
                id: doc.id,
                creatorMail: dataNew.creatorMail,
                creatorUID: dataNew.creatorUID,
                date: dataNew.date,
                liked: dataNew.liked,
                likedBy: dataNew.likedBy,
                link: dataNew.link,
                text: dataNew.text,
                title: dataNew.title,
                published: dataNew.published
            };
            blogEntries.push(data);
        });
    });
};

getBlogs();

console.log(blogEntries);

export const initialState: BlogState = {
    blog: blogEntries
}

console.log(initialState);

export const reducer = (
    state: BlogState = initialState,
    action: BlogAction
        ): BlogState => {
        switch (action.type) {
            case actionTypes.GET_BLOG:
                return {
                    ...state,
                    blog: state.blog,
                }
            case actionTypes.ADD_BLOG:
                const newBlog: IBlogData = action.blog;
                return {
                    ...state,
                    blog: state.blog.concat(newBlog),
                }
            case actionTypes.REMOVE_BLOG:
                const updatedDelBlog: IBlogData[] = state.blog.filter(
                    blog => blog.id !== action.blog.id,
                )
                return {
                    ...state,
                    blog: updatedDelBlog,
                }
            case actionTypes.PUBLISH_BLOG:
                let id = state.blog.findIndex((blog => blog.id == action.blog.id))
                state.blog[id].published=true;
                const updatedPubBlog: IBlogData[] = state.blog;
                return {
                    ...state,
                    blog: updatedPubBlog,
                }
            case actionTypes.LIKE_BLOGM:
                let idm = state.blog.findIndex((blog => blog.id == action.blog.id))
                let countm = state.blog[idm].likedBy;
                state.blog[idm].likedBy = countm - 1;
                state.blog[idm].liked = action.blog.liked;
                const updatedmBlog: IBlogData[] = state.blog;
                return {
                    ...state,
                    blog: updatedmBlog,
                }
            case actionTypes.LIKE_BLOGP:
                let idp = state.blog.findIndex((blog => blog.id == action.blog.id))
                let countp = state.blog[idp].likedBy;
                state.blog[idp].likedBy = countp + 1;
                state.blog[idp].liked = action.blog.liked;
                const updatedpBlog: IBlogData[] = state.blog;
                return {
                    ...state,
                    blog: updatedpBlog,
                }
            case actionTypes.SORT_NEWEST:
                return {
                    ...state,
                    blog: state.blog.sort((a, b) => b.date - a.date),
                }
            case actionTypes.SORT_HOTTEST:
                return {
                    ...state,
                    blog: state.blog.sort((a, b) => b.likedBy - a.likedBy),
                }
        }
    return state
}



