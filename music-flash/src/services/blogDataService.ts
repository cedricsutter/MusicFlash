import { blog } from '../config/firebase';
import blogEntry from "../interfaces/blogentry";

const db = blog.collection("BlogPosts");
const dbAdmin = blog.collection("Admins");
import logging from "../config/logging";

class BlogDataService {
    getAll() {
        return db.get();
    }

    getAllAdmins() {
        return dbAdmin.get();
    }

    create(blogPost: blogEntry) {
        return db.add(blogPost);
    }

    updateLike(docid: string | any, value: any) {
        return db.doc(docid).update({likedBy: value}).then(() => {
            logging.info("Document successfully updated!");
        })
            .catch((error) => {
                logging.error("Error updating document: ", error);
            });
    }

    updateLiked(docid: string | any, value: any) {
        return db.doc(docid).update({liked: value}).then(() => {
            logging.info("Document successfully updated!");
        })
            .catch((error) => {
                logging.error("Error updating document: ", error);
            });
    }

    updatePublished(docid: string | any) {
        return db.doc(docid).update({published: true}).then(() => {
            logging.info("Document successfully updated!");
        })
            .catch((error) => {
                logging.error("Error updating document: ", error);
            });
    }

    delete(id: string | any) {
        return db.doc(id).delete().then(() => {
            logging.info("Document successfully deleted!");
        }).catch((error) => {
            logging.error("Error removing document: ", error);
        });
    }
}


export default new BlogDataService();
