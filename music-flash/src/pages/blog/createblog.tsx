import React, { Component, ChangeEvent } from "react";
import BlogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";
import { auth } from "../../config/firebase";
import {Link} from "react-router-dom";

//Todo: Class in Function umschreiben

type Props = {};

type State = IBlogData & {
    submitted: boolean
};

export default class AddBlog extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.saveBlog = this.saveBlog.bind(this);

        this.state = {
            creatorUID: "",
            creatorMail: "",
            date: "",
            likedBy: 0,
            liked: [],
            link: "",
            title: "",
            text: "",
            submitted: false
        };
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeText(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            text: e.target.value,
        });
    }

    onChangeLink(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            link: e.target.value,
        });
    }

    saveBlog() {
        let data = {
            creatorUID: auth.currentUser?.uid,
            creatorMail: auth.currentUser?.email,
            date: new Date(),
            likedBy: 0,
            liked: [],
            link: this.state.title,
            title: this.state.title,
            text: this.state.text,
        };

        BlogDataService.create(data)
            .then(() => {
                console.log("Created new item successfully!");
                this.setState({
                    submitted: true,
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div>
                {auth.currentUser ? (
                    <div>
                        {this.state.submitted ? (
                            <div>
                                <h4>You submitted successfully!</h4>
                                <Link to="/">Back Home</Link>
                            </div>
                        ) : (
                            <div>
                                <h3>Create a new blog Entry!</h3>
                                <form>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        required
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}
                                        name="title"
                                    />
                                </form>

                                <form>
                                    <label>Text</label>
                                    <input
                                        type="text"
                                        id="text"
                                        required
                                        value={this.state.text}
                                        onChange={this.onChangeText}
                                        name="text"
                                    />
                                </form>

                                <form>
                                    <label>Link for Spotify</label>
                                    <input
                                        type="link"
                                        id="link"
                                        required
                                        value={this.state.link}
                                        onChange={this.onChangeLink}
                                        name="link"
                                    />
                                </form>

                                <button onClick={this.saveBlog}>
                                    Submit
                                </button>
                                <Link to="/">Cancel</Link>
                            </div>
                        )}
                    </div>
                    ) : (
                    <div>
                        <h4>Please Log in to create a blog entry</h4>
                        <Link to="/login">Log in</Link>
                    </div>
                    )}
            </div>
        );
    }
}
