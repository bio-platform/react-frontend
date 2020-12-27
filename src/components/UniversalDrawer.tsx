import React from "react"
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Link } from "@material-ui/core"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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
                <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
        <List>
            {props.itemList.map((item) => (
                <Link href={`#${item[2].toString()}`} color="textPrimary" underline="none">
                    <ListItem button key={item[0].toString()}>
                        <ListItemIcon>{item[1]}</ListItemIcon>
                        <ListItemText primary={item[0]} />
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider />
    </Drawer >)
}
