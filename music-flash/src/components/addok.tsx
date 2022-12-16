import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";

export default function DescriptionAlerts() {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">
                <AlertTitle>Added</AlertTitle>
                Your entry will now be reviewed and then published.   <Link to="/">Back home</Link>
            </Alert>
        </Stack>
    );
}
