import { Container, Button, Stepper, Step, StepLabel, createStyles, makeStyles, Theme, Grid, Box, CircularProgress, Typography, Divider, ThemeProvider, InputLabel, FormControl, Select } from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import React, { ChangeEvent, useEffect, useState } from "react";
import { createInstanceDummy } from "../../api/InstanceApi";
import { ConfigurationData } from "../../models/ConfigurationData";
import { FloatingIPData } from "../../models/FloatingIPData";
import { KeyPair } from "../../models/KeyPair";
import { NormalTextField } from "../NormalTextField";
import { WrongPath } from "../static/WrongPath";
import { SSHKeySelector } from "./SSHKeySelector";

const steps = ['Instance information', 'Select options', 'Choose SSH key', 'Build']

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

export type NewInstanceWizardProps = {
    configuration: ConfigurationData;
}

export const NewInstanceWizard = ({ configuration }: NewInstanceWizardProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [instanceData, setInstanceData] = useState(new Map<string, string | number>());

    useEffect(() => {
        // set default values for options and ssh keys
        configuration.options!.forEach(option => {
            instanceData.set(option.name, option.default);
            setInstanceData(new Map(instanceData));
        });
    }, [])

    const classes = useStyles();

    if (!configuration) {
        return <Box mt={2} mb={2}><WrongPath message="Configuration was not selected." /></Box>
    }

    if (!configuration.textValues) {
        configuration.textValues = [];
    }
    if (!configuration.numberValues) {
        configuration.numberValues = [];
    }
    if (!configuration.options) {
        configuration.options = [];
    }



    const setSelectedKey = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        instanceData.set("ssh", event.target.value as string);
        setInstanceData(new Map(instanceData));
    }

    const setDefaultKey = (keyName: string) => {
        instanceData.set("ssh", keyName as string);
        setInstanceData(new Map(instanceData));
    }

    const activateNext = () => {
        switch (activeStep) {
            case 0:
                for (let i = 0; i < configuration.textValues!.length; i++) {
                    if (!instanceData.has(configuration.textValues![i])) {
                        return false;
                    }
                }

                for (let i = 0; i < configuration.numberValues!.length; i++) {
                    if (!instanceData.has(configuration.numberValues![i])) {
                        return false;
                    }
                }
                return true;
            case 1:
                for (let i = 0; i < configuration.options!.length; i++) {
                    if (!instanceData.has(configuration.options![i].name)) {
                        return false;
                    }
                }
                return true;
            case 2:
                return instanceData.has("ssh");

            default:
                return false;
        }
    }

    const renderStep = () => {
        // todo refactor
        switch (activeStep) {
            case 0:
                return (
                    <Box mt={2} mb={3} className={classes.step}>
                        <div>
                            <Box mt={2} mb={3}>
                                {
                                    configuration.textValues!.map(textVal => {
                                        return (<Box mt={2} key={textVal}><NormalTextField required id={textVal} label={textVal} variant="outlined" value={instanceData.get(textVal) || ""} onChange={(text) => {
                                            instanceData.set(textVal, text);
                                            setInstanceData(new Map(instanceData));
                                        }} /></Box>);
                                    })
                                }
                            </Box>
                            {configuration.numberValues?.length === 0 && <Divider />}
                            <Box mt={2} mb={3}>
                                {
                                    configuration.numberValues!.map(numVal => {
                                        return (<Box mt={2} key={numVal}><NormalTextField type="number" required id={numVal} label={numVal} variant="outlined" value={instanceData.get(numVal) || 0} onChange={(val) => {
                                            instanceData.set(numVal, +val);
                                            setInstanceData(new Map(instanceData));
                                        }} /></Box>);
                                    })
                                }
                            </Box>
                        </div>
                    </Box>
                )
            case 1:
                return (
                    <Box mt={2} mb={3} className={classes.step}>

                        <Box mt={2} mb={3}>
                            {
                                configuration.options!.map(option => {
                                    return (<Box mt={2} key={option.name}>
                                        <FormControl>
                                            <InputLabel htmlFor={option.name}>{option.name}</InputLabel>
                                            <Select
                                                value={instanceData.get(option.name) || option.default}
                                                onChange={(event) => {
                                                    instanceData.set(option.name, event.target.value as string);
                                                    setInstanceData(new Map(instanceData));
                                                }}
                                            
                                                inputProps={{
                                                    name: option.name,
                                                    id: option.name,
                                                }}
                                            >
                                                {option.options.map((value) => {
                                                    return <option key={value} value={value}>{value}</option>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>);
                                })
                            }
                        </Box>
                    </Box>
                )
            case 2:
                return (<Box mt={4} mb={5} className={classes.step}>

                    <SSHKeySelector setDefaultKey={setDefaultKey} setSelectedKey={setSelectedKey} selectedKey={instanceData.get("ssh") || undefined} />
                    {/* todo user can upload new one */}

                </Box>)
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
                                setActiveStep(activeStep + 1);
                            }}
                            disabled={!activateNext()}>
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