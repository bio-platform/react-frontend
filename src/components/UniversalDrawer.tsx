import React from "react"
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { ChevronLeft } from "@material-ui/icons"

type UniversalDrawerProps = {
    handleDrawerClose: () => void,
    open: boolean,
    itemList: (string | JSX.Element)[][]
}

export const UniversalDrawer = (props: UniversalDrawerProps) => {
    return (<Drawer
        variant="persistent"
        anchor="left"
        open={props.open}
    >
        <div>
            <IconButton onClick={props.handleDrawerClose}>
                <ChevronLeft />
            </IconButton>
        </div>
        <Divider />
        <List>
            {props.itemList.map((item) => (
                <ListItem button key={item[0].toString()}>
                    <ListItemIcon>{item[1]}</ListItemIcon>
                    <ListItemText primary={item[0]} />
                </ListItem>
            ))}
        </List>
        <Divider />
    </Drawer>)
}
