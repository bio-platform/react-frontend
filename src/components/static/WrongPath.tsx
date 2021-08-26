import { Button, Grid, Typography } from "@material-ui/core"
import React from "react"

export type WrongPathProps = {
    message?: string;
}

export const WrongPath = ({ message }: WrongPathProps) => {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Typography>{message}</Typography>
            <Button href="/dashboard">Go to Dashboard</Button>
        </Grid>
    )
}