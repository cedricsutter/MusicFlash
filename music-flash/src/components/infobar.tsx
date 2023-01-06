import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";

type props = {
    purpose?: string,
    info?: string
}

export default function DescriptionAlerts(props : props) {
    return (
        <>
            {props.purpose == "success" &&
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="success">
                        <AlertTitle>Added</AlertTitle>
                        Your entry will now be reviewed and then published. <Link to="/">Back home</Link>
                    </Alert>
                </Stack>
            }
            {props.purpose == "reset" &&
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="success">
                        <AlertTitle>Reseted</AlertTitle>
                        {props.info} <Link to="/login">Login again</Link>
                    </Alert>
                </Stack>
            }
            {props.purpose == "error" &&
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {props.info}
                    </Alert>
                </Stack>
            }
            {props.purpose == "info" &&
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="info">
                        <AlertTitle>Nothing to see</AlertTitle>
                        Nothing to publish or your not an Administrator. <Link to="/">Back home</Link>
                    </Alert>
                </Stack>
            }
            {props.purpose == "info2" &&
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="info">
                        <AlertTitle>Nothing to see</AlertTitle>
                        You have not write a block entry yet. <Link to="/add">Create one?</Link><span>  </span><Link to="/">Back Home!</Link>
                    </Alert>
                </Stack>
            }
        </>
    );
}
