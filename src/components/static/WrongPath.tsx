import { Button, Grid, Typography } from "@material-ui/core"
import React from "react"

export const WrongPath = () => {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Typography ></Typography>
            <Button href="/dashboard">Go to Dashboard</Button>
        </Grid>
    )
}