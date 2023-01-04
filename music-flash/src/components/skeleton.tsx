import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
    return (
        <Stack spacing={1}>
            <Skeleton animation="wave" variant="rounded" width='100%' height={152}/>
        </Stack>
    );
}