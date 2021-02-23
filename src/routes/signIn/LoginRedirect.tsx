import React, { useEffect } from "react"
import { Avatar, Button, Container, makeStyles, Typography } from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { UserManager } from "oidc-client";
import { useHistory } from 'react-router'

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

export const LoginRedirect = () => {
    const classes = useStyles();
    const history = useHistory();

    new UserManager({}).signinRedirectCallback().then(function () {
        console.log("got logged");
        history.push('/auth');
    }).catch(function (e) {
        console.log(e);
    });

    return <></>
}
