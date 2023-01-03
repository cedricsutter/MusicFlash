import * as actionTypes from "./actionTypes"
import IBlogData from "../interfaces/blogentry";
import {BlogAction, DispatchType, BlogState} from "../interfaces/types";
import BlogDataService from "../services/blogDataService";

export function addBlog(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.ADD_BLOG,
        blog,
    }
    BlogDataService.create(blog);
    return (dispatch : DispatchType) => dispatch(action);
}

export function removeBlog(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.REMOVE_BLOG,
        blog,
    }
    BlogDataService.delete(blog.id);
    return (dispatch : DispatchType) => dispatch(action);
}

export function likePlus(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.LIKE_BLOGP,
        blog,
    }
    BlogDataService.updateLike(blog.id, blog.likedBy + 1);
    BlogDataService.updateLiked(blog.id, blog.liked);
    return (dispatch : DispatchType) => dispatch(action);
}

export function likeMinus(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.LIKE_BLOGM,
        blog,
    }
    BlogDataService.updateLike(blog.id, blog.likedBy - 1);
    BlogDataService.updateLiked(blog.id, blog.liked);
    return (dispatch : DispatchType) => dispatch(action);
}

export function publishBlog(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.PUBLISH_BLOG,
        blog,
    }
    BlogDataService.updatePublished(blog.id);
    return (dispatch : DispatchType) => dispatch(action);
}

export function hottestBlog(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.SORT_HOTTEST,
        blog,
    }
    return (dispatch : DispatchType) => dispatch(action);
}

export function newestBlog(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.SORT_NEWEST,
        blog,
    }
    return (dispatch : DispatchType) => dispatch(action);
}
