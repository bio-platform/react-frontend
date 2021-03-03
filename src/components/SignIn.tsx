import React, { useContext, useState } from "react"
import { Avatar, Button, Container, makeStyles, Typography } from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login } from "../routes/signIn/login";
import { AuthContextType, AuthContext } from "../routes/AuthProvider";

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
    const [email, setEmail] = useState('');
    const context = useContext<AuthContextType>(AuthContext);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h3" variant="h3">
                    Sign in
                </Typography>
                {email !== '' && <Typography>{email}</Typography>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={async () => {
                        const user = await login()
                        if (user) {
                            context?.setUser(user);
                            // setEmail(user.email);
                        } else {
                            setEmail('redirecting...');
                        }
                    }}
                >
                    Sign In
                </Button>
            </div>
        </Container>
    );
}
