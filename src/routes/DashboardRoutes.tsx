import React, { useState } from "react"
import { AppBar, IconButton, Toolbar, Typography, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { Menu, ChevronLeft } from "@material-ui/icons"
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
        <>
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
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeft />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {DashboardDrawerList.map((item, index) => (
                        <ListItem button key={item[0].toString()}>
                            <ListItemIcon>{item[1]}</ListItemIcon>
                            <ListItemText primary={item[0]} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </>
    )
}