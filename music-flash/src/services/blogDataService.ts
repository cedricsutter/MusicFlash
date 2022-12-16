import { blog } from '../config/firebase';
import blogEntry from "../interfaces/blogentry";
import IBlogData from "../interfaces/blogentry";
import { auth } from "../config/firebase";
import IAdmin from "../interfaces/IAdmin";

const db = blog.collection("BlogPosts");
const dbAdmin = blog.collection("Admins");

const ownBlogs : Array<IBlogData> = [];

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

    updateLiked(docid: string, value: any) {
        return db.doc(docid).update({liked: value}).then(() => {
            console.log(value);
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
        });
    }

    getBlogsOwn() {
        db.where("creatorMail", "==", auth.currentUser?.email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
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
                    title: data.title,
                    published: data.published
                };
                ownBlogs.push(datas);
                console.log(ownBlogs);
                return ownBlogs;
            });
        }).catch((error) => {
            console.error("Error fetch document: ", error);
        });
    };

    getBlogsAll() {
        this.getBlogsOwn();
        return ownBlogs;
    }

    getAllAdmins() {
        return dbAdmin.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const admin = (doc.data());
                const admins : IAdmin = {
                    id: doc.id,
                    email: admin.email
                };
                console.log(admins);
                return(admins);
            });
        });
    }
}


export default new BlogDataService();
