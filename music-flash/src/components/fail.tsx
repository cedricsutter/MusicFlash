import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";

export default function Fail() {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
                <AlertTitle>Added</AlertTitle>
                Something went wrong. Try again later.  <Link to="/">Back home</Link>
            </Alert>
        </Stack>
    );
}