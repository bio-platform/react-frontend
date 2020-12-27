import React, { useState } from "react"
import { AppBar, Button, IconButton, makeStyles, createStyles, Theme, Toolbar, Typography } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { UniversalDrawer } from "../components/UniversalDrawer";
import { DashboardDrawerList } from "../constants/RoutesConstants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
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
                    <Typography variant="h6" className={classes.title}>
                        Dashboard
                    </Typography>
                    <Button color="inherit" href="/signin">Log out</Button>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path='/dashboard'>
                    <UniversalDrawer open={open} handleDrawerClose={handleDrawerClose} itemList={DashboardDrawerList} />
                    <Dashboard />
                </Route>
            </Switch>
        </Router>
    )
}
