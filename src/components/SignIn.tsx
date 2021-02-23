import React, { useState } from "react"
import { Avatar, Button, Container, makeStyles, Typography } from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login } from "../routes/signIn/login";

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
    const [token, setToken] = useState('');

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h3" variant="h3">
                    Sign in
                </Typography>
                {token != '' && <Typography>{token}</Typography>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={async () => {
                        const user = await login()
                        if (user) {
                            setToken(user.id_token)
                        } else {
                            setToken('si neco posral');
                        }
                    }}
                >
                    Sign In
                </Button>
            </div>
        </Container>
    );
}
