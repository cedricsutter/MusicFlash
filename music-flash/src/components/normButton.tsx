import * as React from 'react';
import Button from '@mui/material/Button';
import IComponents from "../interfaces/IComponents";

export default function BasicButton(props: IComponents) {
    return (
            <Button variant="outlined" type={"submit"}>{props.id}</Button>
    );
}