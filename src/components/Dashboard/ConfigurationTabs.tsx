import React, { useEffect, useState } from "react"
import { Button, AppBar, Tab, Tabs, Grid, Typography, Box } from "@material-ui/core"
import { ConfigurationData } from "../../models/ConfigurationData";
import { useHistory } from "react-router-dom";
import { HeaderPaper } from "../HeaderPaper";

type ConfigurationBoxProps = {
    configuration: ConfigurationData;
    setConfiguration: (data: ConfigurationData) => void;
}

type TabPanelProps = {
    children?: JSX.Element | JSX.Element[],
    index: number;
    value: number;
}

type ConfigurationTabsProps = {
    configurations: ConfigurationData[];
    setConfiguration: (data: ConfigurationData) => void;
}

const ConfigurationBox = ({ configuration, setConfiguration }: ConfigurationBoxProps) => {
    const history = useHistory();

    return (
        <Grid key={configuration.name} xs={12} sm={4} md={3} lg={2} item={true}>
            <HeaderPaper title={configuration.name} color="secondary">
                <Box mt={2} mb={2}>
                    <Typography>Tags: {configuration.tags.map(tag => { return tag + ", " })}</Typography>
                </Box>
                <Box mt={1}>
                    <Button onClick={() => {
                        setConfiguration(configuration);
                        history.push("/dashboard/create-new-instance");
                    }} color="primary">
                        Build instance
                    </Button>
                </Box>
            </HeaderPaper>
        </Grid>
    )
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
                { ...children }
            )}
        </div>
    );
}

export const ConfigurationTabs = ({ configurations, setConfiguration }: ConfigurationTabsProps) => {
    const [value, setValue] = useState(0);
    const [tags, setTags] = useState<Set<string>>(new Set<string>());
    const history = useHistory();

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

    const generateTabPanels = () => {
        let i = 1;
        return Array.from(tags).map(tag => {
            return (<TabPanel key={i} value={value} index={i++}>
                <Box mt={5} mb={5}>
                    <Grid container spacing={3}>
                        {configurations.filter(conf => {
                            return conf.tags.includes(tag)
                        }).map(conf => {
                            return (<ConfigurationBox key={conf.name + i} configuration={conf} setConfiguration={setConfiguration} />)
                        })}
                    </Grid>
                </Box>
            </TabPanel>)
        })
    }

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
            <Box mt={5} mb={5}>
                <Grid container spacing={3}>
                    {configurations.map(conf => {
                        return (<ConfigurationBox key={conf.name + "0"} configuration={conf} setConfiguration={setConfiguration} />)
                    })}
                </Grid>
            </Box>
        </TabPanel>
        {generateTabPanels()}
    </div>)
}
