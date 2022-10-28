import { blog } from '../config/firebase';
import blogEntry from "../interfaces/blogentry";

const db = blog.collection("BlogPosts");

class BlogDataService {
    getAll() {
        return db.get();
    }

    create(blogPost: blogEntry) {
        return db.add(blogPost);
    }

    updateLike(docid: string, value: any) {
        return db.doc(docid).update({likedBy: value}).then(() => {
            console.log("Document successfully updated!");
        })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    delete(id: string) {
        return db.doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });;
    }
}

export default new BlogDataService();