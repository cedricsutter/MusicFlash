import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import IBlogData from "../interfaces/blogentry";

type props = {
    purpose: string
}

export default function Variants(props : props) {

    const skeletonArray = [1,2,3,4,5];

    return (
        <>
            {props.purpose === "add" &&
            <Stack spacing={1}>
            <   Skeleton animation="wave" variant="rounded" width='100%' height={152}/>
            </Stack>
            }
            {props.purpose === "blog" &&
        <>
            {skeletonArray.map(() => (
            <>
                <Stack spacing={1}>
                    <Skeleton sx = {{mt: 0.5}} animation="wave" variant="rounded" width='100%' height={152}/>
                </Stack>
                <Stack spacing={1}>
                    <Skeleton sx = {{mt: 0.3}} animation="wave" variant="rounded" width='100%' height={200}/>
                </Stack>
            </>
            ))}
        </>
            }
        </>
    );
}