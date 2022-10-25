import { blog } from '../config/firebase';
import blogEntry from "../interfaces/blogentry";

const db = blog.collection("BlogPosts");

export const blogs: Array<string> = [];

function tester(value: any) {
    blogs.push(value);
}


class BlogDataService {
    getAll() {
        return db.get();
    }

    create(blogPost: blogEntry) {
        return db.add(blogPost);
    }

    updateText(text: string, value: any) {
        return db.doc(text).update(value);
    }

    delete(id: string) {
        return db.doc(id).delete();
    }
}

export default new BlogDataService();