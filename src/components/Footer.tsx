import { Box, Container, Grid, Paper } from "@material-ui/core"
import React from "react"

export const Logos = () => {
    const IMAGES = ['https://www.metacentrum.cz/images/logo2017/metacentrum_RGB.svg',
        'https://sablony.muni.cz/media/3093065/uvt-lg-eng-rgb.png'];

    return (<Container maxWidth='md'>
        <Grid container spacing={5}>
            {IMAGES.map(img => {
                return (
                    <Grid xs={12} sm={6}
                        container
                        justify="center"
                        alignItems="center"
                        direction="column">
                        <Box mt={2}>
                            <img src={img} width='200pt' height='auto' alt="metacentrum logo" />
                        </Box>
                    </Grid>);
            })}
        </Grid>
    </Container>);
}

type FooterProps = {
    className: string;
}

export const Footer = ({ className }: FooterProps) => {


    return (<Box mt={4} className={className}>
        <Paper elevation={3}>
            <Logos />
        </Paper>
    </Box>)
}