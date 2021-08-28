import React, { useEffect, useState } from "react"
import { makeStyles, createStyles, Button, Theme, Box, AppBar, Tab, Tabs, Typography } from "@material-ui/core"

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ConfigurationData } from "../../models/ConfigurationData";

type TabPanelProps = {
    children?: JSX.Element|JSX.Element[],
    index: number;
    value: number;
}

type ConfigurationTabsProps = {
    configurations: ConfigurationData[];
}

const TabPanel = ({ children, index, value }: TabPanelProps) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
        >
            {value === index && (
                { ...children } // todo does not work

            )}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.paper,
    },
}));


export const ConfigurationTabs = ({ configurations }: ConfigurationTabsProps) => {
    const [value, setValue] = useState(0);
    const [tags, setTags] = useState<Set<string>>(new Set<string>());
    const classes = useStyles();

    useEffect(() => {
        let parsedTags = new Set<string>();
        for (let i = 0; i < configurations.length; i++) {
            for (let j = 0; j < configurations[i].tags.length; j++) {
                parsedTags.add(configurations[i].tags[j]);
            }
        }
        setTags(parsedTags);
    }, [configurations])

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    return (<div >
        <AppBar position="static">
            <Tabs value={value} 
            onChange={handleChange} 
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Tabs with configurations">
                <Tab label="all" />
                {Array.from(tags).map(tag => { return <Tab key={tag} label={tag} /> })}
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <>{configurations.map(conf => {return <Typography>{conf.name}</Typography>})}</>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Typography>Item 2</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Typography>Item 3</Typography>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <Typography>Item 4</Typography>
        </TabPanel>

        <TabPanel value={value} index={4}>
            <Typography>Item 5</Typography>
        </TabPanel>
        <TabPanel value={value} index={5}>
            <Typography>Item 6</Typography>
        </TabPanel>
    </div>)
}
