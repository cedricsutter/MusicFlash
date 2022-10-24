import { Component } from "react";
import blogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";

type Props = {};

type State = {
    blogs: Array<IBlogData>,
    currentBlog: IBlogData | null,
    currentIndex: number
};

export default class BlogEntries extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.onDataChange = this.onDataChange.bind(this);
        const blog = blogDataService.getAll().orderBy("title", "asc");
        console.log(blog);

        this.state = {
            blogs: [],
            currentBlog: null,
            currentIndex: -1,
        };

    }

    onDataChange(items: any) {
        let blogs = new Array<IBlogData>();

        items.forEach((item: any) => {
            let id = item.creatorUID;
            let data = item.data();
            blogs.push({
                creatorUID: id,
                creatorMail: data.creatorMail,
                date: data.date,
                liked: data.liked,
                likedBy: data.likedBy,
                link: data.link,
                title: data.title,
                text: data.text
            });
        });

        this.setState({
            blogs: blogs,
        });
    }
        render() {
            const { blogs, currentBlog, currentIndex } = this.state;

            return (
                <div>
                    <div>
                        <h4>Blog Entries</h4>
                    </div>
                </div>
            );
        }
    }
