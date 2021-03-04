import React from "react"
import { Box, CircularProgress, Container, Grid } from "@material-ui/core"
import { CenterStack } from "./Positioning"

export const LoadingPage = () => {
    return (
        <Box mt={3} mb={3}>
            <CenterStack>
                <CircularProgress size={100} />
            </CenterStack>
        </Box>
    )
}