import React, { useState } from "react";
import BlogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";
import { auth } from "../../config/firebase";
import {Link , useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from '@mui/material/Card';
import Variants from '../../components/skeleton';
import DescriptionAlerts from "../../components/infobar";
import {Dispatch} from "redux";
import {addBlog} from "../../store/actionCreators";
import {useDispatch} from "react-redux";

const Create: React.FC = () =>  {
    const [data,setData] = useState<IBlogData>({
        id: "",
        creatorUID: "",
        creatorMail: "",
        date: Date(),
        likedBy: 0,
        liked: [],
        link: "",
        title: "",
        text: "",
        published: false
    })
    const [submitted, setSubmit] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch()

    const saveBlog = React.useCallback(
        (blog: IBlogData) => dispatch(addBlog(blog)),
        [dispatch]
    )

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setData({...data,[event.target.name] : event.target.value});
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        data.creatorUID = auth.currentUser?.uid;
        data.creatorMail = auth.currentUser?.email;
        data.date = Date.now();
        saveBlog(data);
        setSubmit(true);
    }

    return (
            <>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }} >
                {auth.currentUser ? (
                    <div>
                        {submitted ? (
                            <DescriptionAlerts purpose ="success"></DescriptionAlerts>
                        ) : (
                            <div>
                                <Typography gutterBottom variant="h5" component="div">
                                    Create a new blog Entry!
                                </Typography>
                                <form onSubmit={(e) => handleSubmit(e)} >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            p: 1,
                                            m: 5,
                                            bgcolor: 'background.paper',
                                        }}
                                    >
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        placeholder = "Add a title!"
                                        multiline
                                        name="title"
                                        type="title"
                                        maxRows={1}
                                        required
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        multiline
                                        name="text"
                                        type="text"
                                        placeholder = "Write something about this Song!"
                                        maxRows={4}
                                        required
                                        onChange={handleChange}
                                    />
                                    <input
                                        name="link"
                                        type="link"
                                        placeholder = "Add a Spotify Link!"
                                        onChange={handleChange}
                                        pattern = "^https:\/\/open.spotify.com\/embed\/.+"
                                        required={true}
                                        id="outlined-multiline-flexible"
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                       The Link has to be copied from Spotify: he has to be in the Format:
                                       https://open.spotify.com/embed/track/ + TrackId + utm_source=generator
                                    </Typography>
                                    <div>
                                    <Button variant="contained" type={"submit"} color="success">Add</Button>
                                    <Button variant="contained" onClick={() => navigate("/")} color="error">Cancel</Button>
                                    </div>
                                    </Box>
                                </form>
                            </div>
                        )}
                    </div>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 1,
                            m: 5,
                            bgcolor: 'background.paper',
                        }}
                    >
                        <div>
                            <h4>Please Log in to create a blog entry</h4>
                            <Link to="/login">Log in</Link>
                        </div>
                    </Box>
                )}
                </Box>
                <>
                    <Card data-index={data.id} key={data.id}>
                        {!data.link ? (
                            <Variants></Variants>
                            ) : (
                    <iframe
                        src={data.link}
                        width="100%"
                        height="152"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy">
                    </iframe>
                            )}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.text}
                        </Typography>
                        <Typography variant="body2" sx={{pt: 2}}>
                            Created by: {auth.currentUser?.email}
                        </Typography>
                        <Typography variant="body2">
                            Createdate: {Date().toString().split('G')[0]}
                        </Typography>
                    </CardContent>
                    </Card>
                </>
            </>
        );
}

export default Create;
