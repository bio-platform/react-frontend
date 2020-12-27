import React from "react"
import { Grid, useTheme } from "@material-ui/core"
import { VictoryPie } from "victory"
import { HeaderPaper } from "../HeaderPaper"

export const Limits = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={3}>
            <Grid sm={6} md={4} lg={3} item={true}>
                <HeaderPaper title="Floating IPs x/y">
                    <VictoryPie
                        colorScale={[theme.palette.error.main, theme.palette.success.main]}
                        data={[{ x: "Used", y: 60 }, { x: "Available", y: 40 }]}
                        style={{ labels: { fontSize: 20, fill: "white" } }}
                        labelRadius={50} />
                </HeaderPaper>
            </Grid>
            <Grid sm={6} md={4} lg={3} item={true}>
                <HeaderPaper title="Instances x/y">
                    <VictoryPie
                        colorScale={[theme.palette.error.main, theme.palette.success.main]}
                        data={[{ x: "Used", y: 60 }, { x: "Available", y: 40 }]}
                        style={{ labels: { fontSize: 20, fill: "white" } }}
                        labelRadius={50} />
                </HeaderPaper>
            </Grid>
            <Grid sm={6} md={4} lg={3} item={true}>
                <HeaderPaper title="Cores x/y">
                    <VictoryPie
                        colorScale={[theme.palette.error.main, theme.palette.success.main]}
                        data={[{ x: "Used", y: 60 }, { x: "Available", y: 40 }]}
                        style={{ labels: { fontSize: 20, fill: "white" } }}
                        labelRadius={50} />
                </HeaderPaper>
            </Grid>
            <Grid sm={6} md={4} lg={3} item={true}>
                <HeaderPaper title="RAM x/y GB">
                    <VictoryPie
                        colorScale={[theme.palette.error.main, theme.palette.success.main]}
                        data={[{ x: "Used", y: 60 }, { x: "Available", y: 40 }]}
                        style={{ labels: { fontSize: 20, fill: "white" } }}
                        labelRadius={50} />
                </HeaderPaper>
            </Grid>
        </Grid>
    )
}