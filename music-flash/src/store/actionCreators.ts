import * as actionTypes from "./actionTypes"
import IBlogData from "../interfaces/blogentry";
import {BlogAction, DispatchType} from "../interfaces/types";
import BlogDataService from "../services/blogDataService";
import logging from "../config/logging";

export function addBlog(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.ADD_BLOG,
        blog,
    }
    BlogDataService.create(blog).then(() => {
        logging.info("Successfully added!");
    })
        .catch((error) => {
            logging.error("Error updating document: ", error);
            alert(error + " Reload side and try again");
        });;
    return (dispatch : DispatchType) => dispatch(action);
}

export function removeBlog(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.REMOVE_BLOG,
        blog,
    }
    BlogDataService.delete(blog.id).then(() => {
        logging.info("Document successfully deleted!");
    }).catch((error) => {
        logging.error("Error removing document: ", error);
        alert(error + " Reload side and try again");
    });;
    return (dispatch : DispatchType) => dispatch(action);
}

export function likePlus(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.LIKE_BLOGP,
        blog,
    }
    BlogDataService.updateLike(blog.id, blog.likedBy + 1).then(() => {
        logging.info("Document successfully updated!");
    })
        .catch((error) => {
            logging.error("Error updating document: ", error);
            alert(error + " Reload side and try again");
        });
    BlogDataService.updateLiked(blog.id, blog.liked).then(() => {
        logging.info("Document successfully updated!");
    })
        .catch((error) => {
            logging.error("Error updating document: ", error);
            alert(error + " Reload side and try again");
        });
    return (dispatch : DispatchType) => dispatch(action);
}

export function likeMinus(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.LIKE_BLOGM,
        blog,
    }
    BlogDataService.updateLike(blog.id, blog.likedBy - 1).then(() => {
        logging.info("Document successfully updated!");
    })
        .catch((error) => {
            logging.error("Error updating document: ", error);
            alert(error + " Reload side and try again");
        });
    BlogDataService.updateLiked(blog.id, blog.liked).then(() => {
        logging.info("Document successfully updated!");
    })
        .catch((error) => {
            logging.error("Error updating document: ", error);
            alert(error + " Reload side and try again");
        });
    return (dispatch : DispatchType) => dispatch(action);
}

export function publishBlog(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.PUBLISH_BLOG,
        blog,
    }
    BlogDataService.updatePublished(blog.id).then(() => {
        logging.info("Document successfully updated!");
    })
        .catch((error) => {
            logging.error("Error updating document: ", error);
            alert(error + " Reload side and try again");
        });;
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

export function oldestBlog(blog: IBlogData) {
    const action: BlogAction = {
        type: actionTypes.SORT_OLDEST,
        blog,
    }
    return (dispatch : DispatchType) => dispatch(action);
}
