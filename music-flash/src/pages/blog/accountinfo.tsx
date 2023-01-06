import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import blogDataService from "../../services/blogDataService";
import IAdmin from "../../interfaces/IAdmin";

const AccountInfo: React.FC = () => {
    const [admins, setAdmins] = React.useState<IAdmin>({id: "", admins: []});

    const navigate = useNavigate();

    useEffect(() => {
        getAdmin();
    }, []);

    const getAdmin = () => {
        blogDataService.getAllAdmins().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const admin = (doc.data());
                const admine: IAdmin = {
                    id: "admins",
                    admins: admin.admins
                };
                setAdmins(admine);
            });
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
                {auth.currentUser &&
                    <div>
                        <Box sx={{width: '100%', maxWidth: 500}}>
                            <Typography variant="h6" gutterBottom>
                                User Email
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                The email you logged in is:
                            </Typography>

                            {admins.admins.find((element: string | null | undefined) => element == auth.currentUser?.email) ? (
                            <>
                                <Typography variant="body1" color="blue" gutterBottom>
                                    {auth.currentUser.email}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    You are an administrator.
                                </Typography>
                            </>
                            ):(
                            <>
                                <Typography variant="body1" gutterBottom>
                                    {auth.currentUser.email}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Your not an administrator.
                                </Typography>
                            </>
                            )}
                        </Box>
                        <>
                            <Typography sx={{mt:3}} variant="h6" gutterBottom>
                                Actions
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <p><Link to="/forget">Change password?</Link></p>
                            </Typography>
                        </>
                    </div>
                }
            </Box>
        </div>
    );
}

export default AccountInfo;