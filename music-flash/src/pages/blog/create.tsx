import React, { useState } from "react";
import BlogDataService from "../../services/blogDataService";
import IBlogData from "../../interfaces/blogentry";
import { auth } from "../../config/firebase";
import {Link , useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box, { BoxProps } from '@mui/material/Box';
import Typography from "@mui/material/Typography";


const Create: React.FC = () =>  {
    const [data,setData] = useState<IBlogData>({
        creatorUID: "",
        creatorMail: "",
        date: "",
        likedBy: 0,
        liked: [],
        link: "",
        title: "",
        text: ""
    })
    const [submitted, setSubmit] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setData({...data,[event.target.name] : event.target.value});
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        data.creatorUID = auth.currentUser?.uid;
        data.creatorMail = auth.currentUser?.email;
        data.date = Date.now();
        console.log(data);
        BlogDataService.create(data)
           .then(() => {
               console.log("Created new item successfully!");
               setSubmit(true);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    return (
            <div>
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
                                <h4>You submitted successfully!</h4>
                                <Link to="/">Back Home</Link>
                            </div>
                            </Box>
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
                                        pattern = "^https:\/\/open.spotify.com\/embed\/track\/.+"
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
            </div>
        );
}

export default Create;
