import React, { useContext, useEffect } from "react"
import { Avatar, Button, Container, makeStyles, Typography } from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AuthContextType, AuthContext } from "../routes/AuthProvider";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const SignIn = () => {
    const classes = useStyles();
    const context = useContext<AuthContextType>(AuthContext);

    // todo delete
    useEffect(() => {
        const response = axios.get('https://www.boredapi.com/api/activity', {
            headers: {
              "Content-Type": "application/json",
            },
          });
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h3" variant="h3">
                    Sign in
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={async () => {
                        context?.login();
                    }}
                >
                    Sign In
                </Button>
            </div>
        </Container>
    );
}
