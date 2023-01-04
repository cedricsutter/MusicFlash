import { blog } from '../config/firebase';
import blogEntry from "../interfaces/blogentry";

const db = blog.collection("BlogPosts");
const dbAdmin = blog.collection("Admins");

class BlogDataService {
    getAll() {
        return db.get();
    }

    getAllAdmins() {
        return dbAdmin.get();
    }

    create(blogPost: blogEntry) {
        return db.add(blogPost)
    }

    updateLike(docid: string | any, value: any) {
        return db.doc(docid).update({likedBy: value})
    }

    updateLiked(docid: string | any, value: any) {
        return db.doc(docid).update({liked: value})
    }

    updatePublished(docid: string | any) {
        return db.doc(docid).update({published: true})
    }

    delete(id: string | any) {
        return db.doc(id).delete()
    }
}


export default new BlogDataService();
