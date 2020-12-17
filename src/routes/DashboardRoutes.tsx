import React, { useState } from "react"
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { UniversalDrawer } from "../components/UniversalDrawer";
import { DashboardDrawerList } from "../constants/RoutesConstants";

export const DashboardRoutes = () => {
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
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen} >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        Dashboard
                    </Typography>
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
