import { Container, Button, Stepper, Step, StepLabel, createStyles, makeStyles, Theme, Grid, Box, CircularProgress, Typography } from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import React, { useState } from "react";
import { createInstanceDummy } from "../../api/InstanceApi";
import { NormalTextField } from "../NormalTextField";
import { WrongPath } from "../static/WrongPath";

const steps = ['Upload SSH key', 'Instance info', 'Create', 'Connect']

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttons: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        step: {
            textAlign: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        }
    }),
);



export const NewInstanceWizard = () => {
    const [instanceName, setInstanceName] = useState("");
    const [key, setKey] = useState("");
    const [network, setNetwork] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [instanceId, setInstanceId] = useState(0);

    const classes = useStyles();

    const createInstance = async () => {
        await createInstanceDummy();
        setInstanceId(14);
    }

    const disableNext = () => {
        switch (activeStep) {
            case 0:
                return key === "";
            case 1:
                return network === "" || instanceName === "";
            case 2:
                return instanceId === 0;
            default:
                return true;
        }
    }

    const renderStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Box mb={2} className={classes.step}>
                        <div>
                            <NormalTextField required id="SSH key" label="SSH key" variant="outlined" value={key} onChange={setKey} />
                        </div>
                    </Box>
                )
            case 1:
                return (
                    <Box mb={2} className={classes.step}>
                        <div>
                            <NormalTextField required id="Instance name" label="Instance name" variant="outlined" value={instanceName} onChange={setInstanceName} />
                        </div>
                        <div>
                            <NormalTextField required id="Network" label="Network" variant="outlined" value={network} onChange={setNetwork} />
                        </div>
                    </Box>
                )
            case 2:
                return (
                    <Box mb={2} className={classes.step}>
                        {instanceId === 0 ? <CircularProgress /> :
                            <div>
                                <CheckCircleOutlineIcon color='action' fontSize="large" />
                                <Typography variant='h6' >Instance created</Typography>
                            </div>}
                    </Box>
                )
            default:
                return <WrongPath />
        }
    }

    return (
        <Container maxWidth='xl'>
            <Box mb={2} mt={2}>
                {renderStep()}
                <Grid
                    justify="center"
                    alignItems="center"
                    container
                    className={classes.buttons}>
                    {(activeStep !== 0 && activeStep < steps.length) &&
                        <Button variant="text"
                            color="inherit"
                            size="large"
                            onClick={() => setActiveStep(activeStep - 1)}>
                            Previous
                    </Button>
                    }
                    {activeStep < steps.length &&
                        <Button variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => {
                                if (activeStep === 1) {
                                    createInstance();
                                }
                                setActiveStep(activeStep + 1);
                            }}
                            disabled={disableNext()}>
                            Next
                        </Button>
                    }
                </Grid>
            </Box>
            <Stepper activeStep={activeStep} >
                {steps.map(step => {
                    return (<Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>);
                })}
            </Stepper>
        </Container>
    )
}