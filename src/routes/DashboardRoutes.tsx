import React, { useState } from "react"
import { AppBar, Button, IconButton, makeStyles, createStyles, Theme, Toolbar, Link } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "../components/dashboard/Dashboard";
import { UniversalDrawer } from "../components/UniversalDrawer";
import { DashboardDrawerList } from "../constants/RoutesConstants";
import { NewInstanceWizard } from "../components/wizard/NewInstanceWizard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        link: {
            color: theme.palette.primary.contrastText,
        }
    }),
);

export const DashboardRoutes = () => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen} >
                        <Menu />
                    </IconButton>
                    <div className={classes.title}>
                        <Link variant="h6" className={classes.link} href="/dashboard" underline="none">
                            Dashboard
                        </Link>
                    </div>
                    <Button color="inherit" href="/signin">Log out</Button>
                </Toolbar>
            </AppBar>
            <Switch >
                <Route path='/dashboard/overview' >
                    <UniversalDrawer open={open} handleDrawerClose={handleDrawerClose} itemList={DashboardDrawerList} />
                    <Dashboard />
                </Route>
                <Route path='/dashboard/create-new-instance'>
                    <NewInstanceWizard />
                </Route>
                <Redirect to="/dashboard/overview" from="/dashboard" />
            </Switch>
        </Router>
    )
}
