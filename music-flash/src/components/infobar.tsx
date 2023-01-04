import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";

export default function DescriptionAlerts(props : any) {
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
                        No entries here. <Link to="/">Back home</Link>
                    </Alert>
                </Stack>
            }
        </>
    );
}
