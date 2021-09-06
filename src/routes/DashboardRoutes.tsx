import React, { useContext, useState } from "react"
import { AppBar, Button, IconButton, makeStyles, createStyles, Theme, Toolbar, Link } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Dashboard } from "../components/dashboard/Dashboard";
import { UniversalDrawer } from "../components/UniversalDrawer";
import { DashboardDrawerList } from "../constants/RoutesConstants";
import { NewInstanceWizard } from "../components/wizard/NewInstanceWizard";
import { AuthContextType, AuthContext } from "./AuthProvider";
import { ChooseProject } from "../components/dashboard/ChooseProject";
import { ConfigurationData } from "../models/ConfigurationData";
import { Footer } from "../components/Footer";

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
        },
        body: {
            height: "100vh",
            margin: 0,
            display: "flex",
            flexDirection: "column",
        },

        footer: {
            marginTop: "auto",
        }
    }),
);

export const DashboardRoutes = () => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [configuration, setConfiguration] = useState<ConfigurationData | undefined>(undefined);

    const history = useHistory();

    const context = useContext<AuthContextType>(AuthContext);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.body}>
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
                        <Button color="inherit" onClick={() => {
                            context?.logout();
                            history.push("/auth/signin");
                        }}>Log out</Button>
                    </Toolbar>
                </AppBar>
                <Switch >
                    <Route path='/dashboard/overview' >
                        <UniversalDrawer open={open} handleDrawerClose={handleDrawerClose} itemList={DashboardDrawerList} />
                        <Dashboard setConfiguration={setConfiguration} />
                    </Route>
                    <Route exact path="/dashboard/create-new-instance">
                        <NewInstanceWizard configuration={configuration!} />
                    </Route>
                    <Route path='/dashboard/choose-project' >
                        <ChooseProject />
                    </Route>
                    {context?.project ? <Redirect to="/dashboard/overview" from="/dashboard" /> : <Redirect to="/dashboard/choose-project" from="/dashboard" />}
                </Switch>
            </Router>
            <Footer className={classes.footer}/>
        </div>
    )
}
